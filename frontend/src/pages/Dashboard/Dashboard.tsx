import { useState, useEffect, useRef } from "react";
import {
  GetTodosResponse,
  PostTodoResponse,
  Todo,
  MindfulnessSession,
} from "./Dashboard.type";
import DashboardView from "./Dashboard.view";
import { CheckUserResponse, User } from "@/components/Header/Header.type";
import { AxiosError } from "axios";
import { client } from "@/config/axiosClient";
import { toast } from "sonner";

import { mindfulnessSessions } from "./Dashboard.data";
import MindfulnessTimerToast from "@/components/MindfulnessTimerToast";

export default function Dashboard() {
  const [greeting, setGreeting] = useState("Selamat Datang");
  const [user, setUser] = useState<User | null>(null);
  const [greetingIcon, setGreetingIcon] = useState<
    "sunrise" | "sun" | "sunset"
  >("sun");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState(0);
  const [newTodosText, setNewTodosText] = useState("");
  const [showAddTodosDialog, setShowAddTodosDialog] = useState(false);

  const [isSessionActive, setIsSessionActive] = useState(false);
  const [activeToastId, setActiveToastId] = useState<string | number | null>(
    null
  );
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const activeToastIdRef = useRef<string | number | null>(null);
  const todosProgress =
    todos.length > 0 ? Math.round((completedTodos / todos.length) * 100) : 0;

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Selamat Pagi");
      setGreetingIcon("sunrise");
    } else if (hour < 18) {
      setGreeting("Selamat Siang");
      setGreetingIcon("sun");
    } else {
      setGreeting("Selamat Malam");
      setGreetingIcon("sunset");
    }

    fetchUser();
    fetchTodos();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      if (activeToastId) {
        toast.dismiss(activeToastId);
      }

      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [activeToastId]);

  useEffect(() => {
    if (todos) {
      setCompletedTodos(todos.filter((todo) => todo.is_completed).length);
    }
  }, [todos]);

  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    const confirmationMessage =
      "This page is asking you to confirm that you want to love";
    e.preventDefault();
    e.returnValue = confirmationMessage;
    return confirmationMessage;
  };

  useEffect(() => {
    if (isSessionActive) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    } else {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isSessionActive]);

  const parseDurationToMs = (durationString: string): number => {
    const minutes = parseInt(durationString.split(" ")[0], 10);
    if (isNaN(minutes)) {
      console.error("Invalid duration format:", durationString);
      return 0;
    }
    return minutes * 60 * 1000;
  };

  const cancelSession = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    const idToDismiss = activeToastIdRef.current;
    console.log("Attempting to dismiss toast ID (from ref):", idToDismiss);

    if (idToDismiss) {
      toast.dismiss(idToDismiss);
      activeToastIdRef.current = null;
    }

    setActiveToastId(null);
    setIsSessionActive(false);
    toast.info("Sesi mindfulness dibatalkan.");
  };

  const startMindfulnessSession = (session: MindfulnessSession) => {
    if (isSessionActive) return;

    const durationMs = parseDurationToMs(session.duration);
    if (durationMs <= 0) return;

    setIsSessionActive(true);

    const toastId = toast.custom(
      (t) => (
        <MindfulnessTimerToast
          toastId={t}
          title={session.title}
          initialDurationMs={durationMs}
          onCancel={cancelSession}
        />
      ),
      {
        duration: durationMs + 1000,
        id: `mindfulness-${session.id}-${Date.now()}`,
      }
    );

    console.log("Started toast with ID:", toastId);

    setActiveToastId(toastId);
    activeToastIdRef.current = toastId;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      alert(`Mindfulness session "${session.title}" complete!`);
      setIsSessionActive(false);
      setActiveToastId(null);
      activeToastIdRef.current = null;
      timerRef.current = null;
    }, durationMs);
  };

  const handleMoodSelect = (mood: string) => {
    console.log("Mood selected:", mood);
    toast(`Mood recorded: ${mood}`);
  };

  const handleTodosToggle = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, is_completed: !todo.is_completed } : todo
    );

    setTodos(updatedTodos);

    setCompletedTodos(updatedTodos.filter((g) => g.is_completed).length);

    const toggledTodo = updatedTodos.find((todo) => todo.id === id);
    if (toggledTodo) {
      updateTodo(id, { is_completed: toggledTodo.is_completed });
    }
  };

  const handleAddTodos = async () => {
    if (!newTodosText.trim()) return;
    const newTodo = await addTodo(newTodosText);
    if (!newTodo) {
      toast.error("Failed to add To-Do.");
      return;
    }
    setTodos((prev) => [...prev, newTodo]);
    setNewTodosText("");
    setShowAddTodosDialog(false);
    toast.success(`To-Do "${newTodo.title}" added!`);
  };

  const addTodo = async (title: string): Promise<Todo | false> => {
    try {
      const res: PostTodoResponse = (
        await client().post("/todos", {
          title: title,
          is_completed: false,
        })
      ).data;

      return res.payload;
    } catch (error) {
      console.error("Add Todo Error:", error);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          toast.error("Authentication failed. Please log in again.");
          setUser(null);
        } else {
          toast.error(
            error.response?.data?.msg || error.message || "Failed to add todo"
          );
        }
      } else {
        toast.error("An unexpected error occurred while adding todo.");
      }
      return false;
    }
  };

  const deleteTodo = async (id: string | number) => {
    try {
      await client().delete(`/todos/${id}`);
      toast.success("To-Do deleted successfully.");
      return true;
    } catch (error) {
      console.error("Delete Todo Error:", error);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          toast.error("Authentication failed. Please log in again.");
          setUser(null);
        } else {
          toast.error(
            error.response?.data?.msg ||
              error.message ||
              "Failed to delete todo"
          );
        }
      } else {
        toast.error("An unexpected error occurred while deleting todo.");
      }
      return false;
    }
  };

  const updateTodo = async (id: string | number, data: Partial<Todo>) => {
    try {
      await client().put(`/todos/${id}`, data);
    } catch (error) {
      console.error("Update Todo Error:", error);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          toast.error("Authentication failed. Please log in again.");
          setUser(null);
        } else {
          toast.error(
            error.response?.data?.msg ||
              error.message ||
              "Failed to update todo"
          );
        }
      } else {
        toast.error("An unexpected error occurred while updating todo.");
      }
    }
  };

  const fetchTodos = async () => {
    try {
      const res: GetTodosResponse = (await client().get("/todos")).data;

      if (res?.payload?.todos && Array.isArray(res.payload.todos)) {
        setTodos(res.payload.todos);
      } else {
        console.warn("Received unexpected data format for todos:", res);
        setTodos([]);
      }
    } catch (error) {
      console.error("Fetch Todos Error:", error);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          setUser(null);
        } else {
          console.error("Failed to fetch todos:", error.message);
        }
      } else {
        console.error("An unexpected error occurred while fetching todos.");
      }
      setTodos([]);
    }
  };

  const fetchUser = async () => {
    try {
      const data: CheckUserResponse = (await client().get("/auth/check")).data;
      setUser(data.payload);
    } catch (error) {
      console.error("Fetch User Error:", error);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          setUser(null);
          toast.info("Please log in to continue.");
        } else {
          console.error("Failed to check user status:", error.message);
        }
      } else {
        console.error(
          "An unexpected error occurred while checking user status."
        );
      }
      setUser(null);
    }
  };

  const handleDeleteTodos = async (id: number) => {
    const success = await deleteTodo(id);
    if (success) {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);

      setCompletedTodos(updatedTodos.filter((g) => g.is_completed).length);
    }
  };

  document.title = "Dashboard - Mental Health App";

  return (
    <DashboardView
      greeting={greeting}
      greetingIcon={greetingIcon}
      showAddTodosDialog={showAddTodosDialog}
      todosProgress={todosProgress}
      handleMoodSelect={handleMoodSelect}
      handleTodosToggle={handleTodosToggle}
      handleAddTodos={handleAddTodos}
      handleDeleteTodos={handleDeleteTodos}
      setShowAddTodosDialog={setShowAddTodosDialog}
      newTodosText={newTodosText}
      setNewTodosText={setNewTodosText}
      completedTodos={completedTodos}
      todos={todos}
      user={user}
      mindfulnessSessions={mindfulnessSessions}
      isSessionActive={isSessionActive}
      startMindfulnessSession={startMindfulnessSession}
    />
  );
}
