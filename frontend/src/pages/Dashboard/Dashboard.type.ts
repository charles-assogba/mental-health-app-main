import { User } from "@/components/Header/Header.type";
import { Dispatch, SetStateAction } from "react";
import { LucideIcon } from "lucide-react";

export interface DashboardProps {
  greeting: string;
  greetingIcon: "sunrise" | "sun" | "sunset";
  showAddTodosDialog: boolean;
  todosProgress: number;
  handleMoodSelect: (mood: string) => void;
  handleTodosToggle: (id: number) => void;
  handleAddTodos: () => void;
  handleDeleteTodos: (id: number) => void;
  setShowAddTodosDialog: Dispatch<SetStateAction<boolean>>;
  newTodosText: string;
  setNewTodosText: Dispatch<SetStateAction<string>>;
  completedTodos: number;
  todos: Todo[];
  user: User | null;
  mindfulnessSessions: MindfulnessSession[];
  isSessionActive: boolean;
  startMindfulnessSession: (session: MindfulnessSession) => void;
}

export interface GetTodosResponse {
  msg: string;
  payload: Payload;
}

export interface PostTodoResponse {
  msg: string;
  payload: Todo;
}

export interface Payload {
  todos: Todo[];
}

export interface Todo {
  id?: number;
  owner_id?: number;
  title: string;
  is_completed: boolean;
  created_at?: Date;
}

export interface MindfulnessSession {
  id: number;
  title: string;
  duration: string;
  icon: LucideIcon;
  image?: string;
  color: string;
}
