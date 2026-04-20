import { FC } from "react";
import { ChatSidebarProps } from "./ChatSidebar.type";
import { cn } from "@/lib/utils";
import {
  mobileOverlayVariant,
  sidebarVariant,
  sidebarBg,
  newChatButtonColor,
  listStagger,
  listItemFade,
} from "@/pages/AIChatbot/AIChatbot.data";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { AnimatePresence, motion } from "framer-motion";
import { X, Plus } from "lucide-react";
import ChatItem from "../ChatItem";
import { Button } from "../ui/button";

const ChatSidebarView: FC<ChatSidebarProps> = ({
  conversations,
  activeChatId,
  onSelectChat,
  onNewChat,
  isOpen,
  onClose,
}) => {
  return (
    <>
      <AnimatePresence>
        {isOpen && onClose && (
          <motion.div
            key="sidebar-overlay"
            variants={mobileOverlayVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        key="sidebar"
        variants={sidebarVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={cn(
          "fixed inset-y-0 left-0 z-20 md:relative md:translate-x-0",
          "w-72 border-r border-gray-200 dark:border-gray-700/50 flex flex-col shadow-lg md:shadow-none",
          sidebarBg,
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Conversation List"
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700/50 flex items-center justify-between flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Conversations
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-8 w-8 rounded-full"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-3 flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onNewChat}
            className={cn(
              "w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors",
              newChatButtonColor
            )}
          >
            <Plus className="w-4 h-4" /> New Conversation
          </motion.button>
        </div>

        <ScrollArea className="flex-1 overflow-y-auto px-3 py-2">
          <motion.ul
            className="space-y-1"
            variants={listStagger}
            initial="hidden"
            animate="visible"
          >
            {conversations.map((convo) => (
              <ChatItem
                key={convo.id}
                convo={convo}
                isActive={activeChatId === convo.id}
                onSelect={onSelectChat}
              />
            ))}
            {conversations.length === 0 && (
              <motion.p
                variants={listItemFade}
                className="text-center text-sm text-gray-500 py-4 italic"
              >
                Start a new conversation!
              </motion.p>
            )}
          </motion.ul>
        </ScrollArea>
      </motion.aside>
    </>
  );
};

export default ChatSidebarView;
