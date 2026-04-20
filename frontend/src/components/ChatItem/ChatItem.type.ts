import { Conversation } from "@/pages/AIChatbot/AIChatbot.type";

export interface ChatItemProps {
    convo: Conversation;
    isActive: boolean;
    onSelect: (id: string | number) => void;
  }
  