import { FC } from "react";
import { ChatSidebarProps } from "./ChatSidebar.type";
import ChatSidebarView from "./ChatSidebar.view";

const ChatSidebar: FC<ChatSidebarProps> = ({
  conversations,
  activeChatId,
  onSelectChat,
  onNewChat,
  isOpen,
  onClose,
}) => {
  return (
    <ChatSidebarView
      conversations={conversations}
      activeChatId={activeChatId}
      onSelectChat={onSelectChat}
      onNewChat={onNewChat}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};

export default ChatSidebar;
