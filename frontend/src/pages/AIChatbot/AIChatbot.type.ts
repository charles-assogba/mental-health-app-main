import { Dispatch, RefObject, SetStateAction } from "react";

export interface GeminiChatResponse {
  msg: string;
  payload: Payload;
}
export interface Payload {
  response: string;
}

export interface GeminiContentType {
  role: string;
  parts: Part[];
}

export interface Part {
  text: string;
}

export interface AIChatbotProps {
  setSelectedModel: Dispatch<SetStateAction<string>>;
  handleSendMessage: () => void;
  handleSuggestionClick: (suggestion: string) => void;
  selectedModel: string;
  isBotTyping: boolean;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  messages: Chat[];
  conversations: Conversation[];
  activeChatId: string | number | null;
  handleSelectChat: (id: string | number) => void;
  handleNewChat: () => void;
  viewportRef: RefObject<HTMLDivElement | null>;
}

export interface GetChatsByConversationResponse {
  msg: string;
  payload: Payload;
}

export interface Payload {
  chats: Chat[];
}

export interface Chat {
  id: number;
  role: string;
  body: string;
  created_at: Date;
  ai_conversation_id: number;
}

export interface GetConversationsResponse {
  msg: string;
  payload: Payload;
}

export interface Payload {
  conversations: Conversation[];
  pagination: Pagination;
}

export interface Conversation {
  id: number;
  title: string;
  owner_id: number;
  created_at: Date;
  _count: Count;
}

export interface Count {
  ai_chat: number;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalConversations: number;
  limit: number;
}

export interface NewConvoResponse {
  msg: string;
  payload: Payload;
}

export interface Payload {
  id: number;
  title: string;
  owner_id: number;
  created_at: Date;
  ai_chat: Conversation[];
  _count: Count;
}
