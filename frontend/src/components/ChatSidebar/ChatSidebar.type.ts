import { Conversation } from "@/pages/AIChatbot/AIChatbot.type";

export interface ChatSidebarProps {
  conversations: Conversation[];
  activeChatId: string | number | null;
  onSelectChat: (id: string | number) => void;
  onNewChat: () => void;
  isOpen: boolean;
  onClose?: () => void;
}
