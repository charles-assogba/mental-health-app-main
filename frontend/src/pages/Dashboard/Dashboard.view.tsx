import { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Smile,
  Frown,
  Meh,
  Angry,
  Annoyed,
  ClipboardCheck,
  Sparkles,
  PlusCircle,
  Trash2,
  Sun,
  Sunrise,
  Sunset,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  pageVariants,
  itemFadeUp,
  containerStagger,
  moodButtonVariant,
  todosItemVariant,
  sessionCardVariant,
  progressVariant,
} from "./Dashboard.data";
import { DashboardProps } from "./Dashboard.type";
import { Progress } from "@radix-ui/react-progress";

const DashboardView: FC<DashboardProps> = ({
  greeting,
  greetingIcon,
  showAddTodosDialog,
  todosProgress,
  handleMoodSelect,
  handleTodosToggle,
  handleAddTodos,
  handleDeleteTodos,
  setShowAddTodosDialog,
  newTodosText,
  setNewTodosText,
  completedTodos,
  todos,
  user,
  mindfulnessSessions,
  isSessionActive,
  startMindfulnessSession,
}) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col px-4 sm:px-6 py-12 lg:px-16 md:py-16 gap-8 min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] bg-gradient-to-br from-cyan-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-teal-950 overflow-y-auto"
    >
      <motion.div variants={itemFadeUp}>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <motion.div
            initial={{ rotate: -15, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", delay: 0.3 }}
          >
            <>
              {greetingIcon === "sun" ? (
                <Sun className="w-7 h-7 text-amber-500" />
              ) : greetingIcon === "sunrise" ? (
                <Sunrise className="w-7 h-7 text-amber-500" />
              ) : greetingIcon === "sunset" ? (
                <Sunset className="w-7 h-7 text-amber-500" />
              ) : (
                <Sun className="w-7 h-7 text-amber-500" />
              )}
            </>
          </motion.div>
          {greeting}, {user?.name || "Guest"}!{" "}
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 mt-1">
          Wishing you a day filled with calm and happiness.
        </p>
      </motion.div>

      <motion.div
        variants={containerStagger}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start"
      >
        <motion.div
          variants={itemFadeUp}
          className="md:col-span-2 lg:col-span-1"
        >
          <Card className="h-full shadow-lg rounded-xl border border-gray-200/50 dark:border-gray-700/40 bg-white/70 dark:bg-gray-800/60 backdrop-blur-sm overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Smile className="w-5 h-5 text-amber-500" /> Daily Mood Journal
              </CardTitle>
              <CardDescription>How are you feeling right now?</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-around items-center py-6 px-4 gap-2">
              {[
                {
                  mood: "Happy",
                  icon: Smile,
                  color: "text-green-500",
                  hover: "hover:bg-green-100/50 dark:hover:bg-green-800/30",
                },
                {
                  mood: "Okay",
                  icon: Meh,
                  color: "text-blue-500",
                  hover: "hover:bg-blue-100/50 dark:hover:bg-blue-800/30",
                },
                {
                  mood: "Sad",
                  icon: Frown,
                  color: "text-indigo-500",
                  hover: "hover:bg-indigo-100/50 dark:hover:bg-indigo-800/30",
                },
                {
                  mood: "Anxious",
                  icon: Annoyed,
                  color: "text-orange-500",
                  hover: "hover:bg-orange-100/50 dark:hover:bg-orange-800/30",
                },
                {
                  mood: "Angry",
                  icon: Angry,
                  color: "text-red-500",
                  hover: "hover:bg-red-100/50 dark:hover:bg-red-800/30",
                }
              ].map(({ mood, icon: Icon, color, hover }, index) => (
                <TooltipProvider key={mood} delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.button
                        variants={moodButtonVariant}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        whileTap="tap"
                        transition={{ delay: 0.4 + index * 0.08 }}
                        onClick={() => handleMoodSelect(mood)}
                        className={cn(
                          "p-3 rounded-full transition-colors",
                          hover
                        )}
                        aria-label={mood}
                      >
                        <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${color}`} />
                      </motion.button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{mood}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </CardContent>

            <CardFooter>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Log your mood to track trends.
              </p>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          variants={itemFadeUp}
          className="md:col-span-1 lg:col-span-1"
        >
          <Card className="h-full shadow-lg rounded-xl border border-gray-200/50 dark:border-gray-700/40 bg-white/70 dark:bg-gray-800/60 backdrop-blur-sm flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-semibold flex items-center gap-2"/>
                  <ClipboardCheck className="w-5 h-5 text-teal-600 dark:text-teal-400" />{" "}
                  Daily Goals
                <Dialog
                  open={showAddTodosDialog}
                  onOpenChange={setShowAddTodosDialog}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full text-teal-600 hover:bg-teal-100/50 dark:text-teal-400 dark:hover:bg-teal-900/30"
                      aria-label="Add New Goal"
                    >
                      <PlusCircle className="w-5 h-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Goal</DialogTitle>
                      <DialogDescription>
                        Write a small goal you want to achieve today.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="todos-text" className="text-right">
                          Goal
                        </Label>
                        <Input
                          id="todos-text"
                          value={newTodosText}
                          onChange={(e) => setNewTodosText(e.target.value)}
                          className="col-span-3"
                          placeholder="e.g., Walk for 10 minutes"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleAddTodos();
                            }
                          }}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button
                        type="button"
                        onClick={handleAddTodos}
                        className="bg-teal-600 hover:bg-teal-700 text-white"
                      >
                        Save
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="mt-3 space-y-1">
                <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
                  <span>Progress</span>
                  <span>
                    {completedTodos}/{todos.length} Completed
                  </span>
                </div>

                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  {" "}
                  <motion.div
                    className="bg-gradient-to-r from-teal-400 to-cyan-400 h-2 rounded-full"
                    variants={progressVariant(todosProgress)}
                    initial="hidden"
                    animate="visible"
                  />
                </div>
                <Progress
                  value={todosProgress}
                  aria-label={`${todosProgress}% goals completed`}
                  className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-teal-400 [&>div]:to-cyan-400"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1 pt-0 pb-4 px-4 overflow-hidden">
              <ScrollArea className="h-[200px] px-2 -mx-2">
                <motion.ul className="space-y-2" layout>
                  <AnimatePresence initial={false}>
                    {todos.map((todoItem) => (
                      <motion.li
                        key={todoItem.id}
                        variants={todosItemVariant}
                        layout
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        whileHover="hover"
                        className="flex items-center justify-between p-2 rounded-md cursor-default group"
                        style={{ backgroundColor: "transparent" }}
                      >
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          {" "}
                          <Checkbox
                            id={`todo-${todoItem.id}`}
                            checked={todoItem.is_completed}
                            onCheckedChange={() =>
                              handleTodosToggle(todoItem?.id ?? 0)
                            }
                            aria-label={todoItem.title}
                            className="border-gray-400 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600 shrink-0"
                          />
                          <label
                            htmlFor={`todo-${todoItem.id}`}
                            className={cn(
                              "text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 truncate",
                              todoItem.is_completed
                                ? "line-through text-gray-400 dark:text-gray-500"
                                : "text-gray-800 dark:text-gray-100"
                            )}
                            title={todoItem.title}
                          >
                            {todoItem.title}
                          </label>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteTodos(todoItem?.id ?? 0)}
                          className="h-7 w-7 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-100/50 dark:hover:bg-red-800/30 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2"
                          aria-label={`Delete goal ${todoItem.title}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                  {todos.length === 0 && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-center text-gray-500 dark:text-gray-400 py-6 italic"
                    >
                      No daily goals yet. Add one!
                    </motion.p>
                  )}
                </motion.ul>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={itemFadeUp}
          className="md:col-span-2 lg:col-span-1"
        >
          <Card className="h-full shadow-lg rounded-xl border border-gray-200/50 dark:border-gray-700/40 bg-white/70 dark:bg-gray-800/60 backdrop-blur-sm flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" /> Temukan
                Ketenangan
              </CardTitle>
              <CardDescription>
                Choose a short mindfulness session for today.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                {mindfulnessSessions.map((session) => (
                  <motion.div
                    key={session.id}
                    variants={sessionCardVariant}
                    initial="hidden"
                    animate="visible"
                    whileHover={!isSessionActive ? "hover" : undefined}
                    transition={{ delay: 0.3 + session.id * 0.08 }}
                    className={cn(
                      "rounded-lg p-4 flex flex-col items-start justify-between space-y-3 relative overflow-hidden min-h-[130px]",
                      "bg-gradient-to-br dark:bg-gradient-to-br",
                      session.color,
                      isSessionActive
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    )}
                  >
                    <div>
                      <session.icon className="w-6 h-6 text-gray-700 dark:text-gray-200 opacity-80 mb-1" />
                      <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-100">
                        {session.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        {session.duration}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      className={cn(
                        "h-7 px-2.5 text-xs bg-white/60 dark:bg-black/30 hover:bg-white/90 dark:hover:bg-black/50 text-gray-700 dark:text-gray-200",
                        isSessionActive && "pointer-events-none"
                      )}
                      onClick={() => startMindfulnessSession(session)}
                      disabled={isSessionActive}
                      aria-label={`Start session ${session.title} (${session.duration})`}
                    >
                      Start
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardView;
