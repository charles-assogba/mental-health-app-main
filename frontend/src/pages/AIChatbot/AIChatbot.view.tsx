import { FC, Fragment, useState, useRef } from "react";
import { AIChatbotProps } from "./AIChatbot.type";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  User,
  Bot,
  Brain,
  Smile,
  //Bed,
  Menu,
  Upload,
  X,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  pageLoadVariant,
  suggestionsContainerVariant,
  suggestionChipVariant,
  botMessageSpecific,
  userMessageSpecific,
  typingIndicatorVariant,
  sendButtonHoverTap,
  userBubbleColor,
  botBubbleColor,
  suggestionChipColor,
  //sendButtonGradient,
} from "./AIChatbot.data";
import ChatSidebar from "@/components/ChatSidebar";

const AIChatbotView: FC<AIChatbotProps> = ({
  handleSendMessage,
  handleSuggestionClick,
  isBotTyping,
  inputValue,
  setInputValue,
  messages,
  conversations,
  activeChatId,
  handleSelectChat,
  handleNewChat,
  viewportRef,
}) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ALLOWED_TYPES = ["image/png", "image/jpeg", "application/dicom"];
  const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert("Only PNG, JPG, and DICOM files are allowed");
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      alert("File size must be less than 20MB");
      return;
    }

    setUploadedFile(file);
  };

  const clearUploadedFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] overflow-hidden">
      <ChatSidebar
        conversations={conversations}
        activeChatId={activeChatId}
        onSelectChat={(id) => {
          handleSelectChat(id);
          setIsMobileSidebarOpen(false);
        }}
        onNewChat={() => {
          handleNewChat();
          setIsMobileSidebarOpen(false);
        }}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-teal-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-black dark:to-purple-950/60 overflow-hidden">
        <motion.header
          variants={pageLoadVariant}
          initial="hidden"
          animate="visible"
          className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm z-10 flex-shrink-0"
        >
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-2 h-9 w-9 rounded-lg"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
            <span className="sr-only">Open Conversation List</span>
          </Button>
          <div className="flex-1"></div>
          <div className="md:hidden w-9"></div>{" "}
        </motion.header>

        <ScrollArea className="flex-1 h-[1px]">
          <div
            ref={viewportRef}
            className="flex flex-col py-24 px-4 md:px-6 lg:px-8 space-y-4 max-w-4xl mx-auto min-h-full"
          >
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  layout
                  variants={
                    message.role === "USER"
                      ? userMessageSpecific
                      : botMessageSpecific
                  }
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={cn(
                    "flex items-end gap-2",
                    message.role === "USER" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === "AI" && (
                    <Avatar className="h-8 w-8 border-2 border-purple-200 dark:border-purple-700 shadow-sm flex-shrink-0">
                      <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400">
                        <Bot className="w-4 h-4 text-white" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "max-w-[75%] rounded-xl px-4 py-2.5 shadow-md",
                      message.role === "USER"
                        ? `${userBubbleColor} rounded-br-none`
                        : `${botBubbleColor} rounded-bl-none`
                    )}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {typeof message.body === "string"
                        ? message.body
                            .split(/(\*\*.*?\*\*)/g)
                            .map((part, index) =>
                              part.startsWith("**") && part.endsWith("**") ? (
                                <strong key={index}>{part.slice(2, -2)}</strong>
                              ) : (
                                <Fragment key={index}>{part}</Fragment>
                              )
                            )
                        : message.body}{" "}
                    </p>
                    <span
                      className={cn(
                        "text-xs opacity-70 mt-1 block",
                        message.role === "USER"
                          ? "text-right text-teal-100 dark:text-teal-300"
                          : "text-left text-gray-500 dark:text-gray-400"
                      )}
                    >
                      {message.created_at.toLocaleString()}
                    </span>
                  </div>
                  {message.role === "USER" && (
                    <Avatar className="h-8 w-8 border-2 border-teal-200 dark:border-teal-700 shadow-sm flex-shrink-0">
                      <AvatarFallback className="bg-gradient-to-br from-teal-400 to-blue-400">
                        <User className="w-4 h-4 text-white" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </motion.div>
              ))}
              {isBotTyping && (
                <motion.div
                  key="typing-indicator"
                  layout
                  variants={typingIndicatorVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex items-end gap-2 justify-start"
                >
                  <Avatar className="h-8 w-8 border-2 border-purple-200 dark:border-purple-700 shadow-sm">
                    <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400">
                      <Bot className="w-4 h-4 text-white" />
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`${botBubbleColor} rounded-xl rounded-bl-none px-4 py-3 shadow-md flex items-center space-x-1.5`}
                  >
                    <span
                      className="h-1.5 w-1.5 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></span>
                    <span
                      className="h-1.5 w-1.5 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></span>
                    <span
                      className="h-1.5 w-1.5 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>

        <motion.section
          variants={pageLoadVariant}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="sticky bottom-0 p-4 md:px-6 md:pb-4 border-t border-gray-200 dark:border-gray-700/50 bg-white/60 dark:bg-gray-800/40 backdrop-blur-md flex-shrink-0"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={suggestionsContainerVariant}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-2 mb-3"
            >
              {[
                { text: "How to analyse this X-Ray image?", icon: Send },
                { text: "Give me the treatment for this fracture", icon: Brain },
                { text: "Radiology reasoning", icon: Smile },
              ].map((suggestion) => (
                <motion.div
                  key={suggestion.text}
                  variants={suggestionChipVariant}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className={`h-auto py-1 px-3 rounded-full text-xs font-medium border-transparent transition-colors duration-200 ${suggestionChipColor}`}
                    onClick={() => handleSuggestionClick(suggestion.text)}
                  >
                    <suggestion.icon className="w-3.5 h-3.5 mr-1.5 opacity-80" />{" "}
                    {suggestion.text}
                  </Button>
                </motion.div>
              ))}
            </motion.div>

            {uploadedFile && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-3 flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center flex-shrink-0">
                    <Upload className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400 truncate">
                      {uploadedFile.name}
                    </p>
                    <p className="text-xs text-blue-500 dark:text-blue-500">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • {uploadedFile.type.split('/')[1].toUpperCase()}
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-gray-200 dark:hover:bg-gray-600 flex-shrink-0"
                  onClick={clearUploadedFile}
                  title="Remove uploaded file"
                >
                  <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </Button>
              </motion.div>
            )}

            <form
              className="flex items-center gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
                clearUploadedFile();
              }}
            >
              <Input
                placeholder="Type your message here..."
                className="flex-1 h-12 px-4 rounded-lg bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-400 dark:focus:ring-teal-500 dark:placeholder-gray-400 transition-colors"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <input
                ref={fileInputRef}
                type="file"
                accept=".png,.jpg,.jpeg,.dcm"
                onChange={handleFileSelect}
                className="hidden"
                aria-label="Upload file"
              />
              <motion.div
                whileHover="hover"
                whileTap="tap"
                variants={sendButtonHoverTap}
              >
                <Button
                  type="button"
                  size="icon"
                  className={`size-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out`}
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload image (PNG, JPG, DICOM)"
                >
                  <Upload className="w-5 h-5" />
                </Button>
              </motion.div>
              <motion.div
                whileHover="hover"
                whileTap="tap"
                variants={sendButtonHoverTap}
              >
                <Button
                  type="submit"
                  size="icon"
                  className={`size-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed`}
                  disabled={!inputValue.trim() || isBotTyping}
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </motion.div>
            </form>
          </div>
        </motion.section>
      </div>{" "}
    </div>
  );
};

export default AIChatbotView;
