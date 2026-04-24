import { useEffect, useRef, useState } from "react";
import AIChatbotView from "./AIChatbot.view";
import {
  GeminiChatResponse,
  Conversation,
  Chat,
  GetConversationsResponse,
  GetChatsByConversationResponse,
  GeminiContentType,
  NewConvoResponse,
} from "./AIChatbot.type";
import { toast } from "sonner";

export default function AIChatbot() {
  const [selectedModel, setSelectedModel] = useState("Llama 3.1");
  const viewportRef = useRef<HTMLDivElement>(null);
  const isSettingUpNewChat = useRef(false);

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | number | null>(
    null
  );
  const [messages, setMessages] = useState<Chat[]>([]);

  const [inputValue, setInputValue] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  useEffect(() => {
    fetchConvos();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      viewportRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 0);
  }, [messages]);

  useEffect(() => {
    if (conversations.length > 0 && activeChatId === null) {
      setActiveChatId(conversations[0].id);
    }
  }, [conversations, activeChatId]);

  useEffect(() => {
    if (isSettingUpNewChat.current) {
      setTimeout(() => {
        isSettingUpNewChat.current = false;
      }, 0);
      setInputValue("");
      return;
    }

    if (activeChatId && typeof activeChatId === "number") {
      fetchChatByConvo(activeChatId);
    }

    setInputValue("");
  }, [activeChatId]);

  const fetchConvos = async () => {
    setConversations([]);
  };

  const fetchChatByConvo = async (id: string | number) => {
    setMessages([]);
  };

  const handleSendMessage = async () => {
    const trimmedInput = inputValue.trim();

    if (!trimmedInput || typeof activeChatId !== "number") {
      if (!trimmedInput) return;

      toast.error(
        "Cannot send message: Conversation is invalid or not selected."
      );
      console.error(
        "handleSendMessage called with invalid activeChatId:",
        activeChatId
      );
      return;
    }

    const currentChatId = activeChatId;

    const newUserMessage: Chat = {
      id: Date.now(),
      body: trimmedInput,
      role: "USER",
      created_at: new Date(),
      ai_conversation_id: currentChatId,
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInputValue("");
    setIsBotTyping(true);

    // Mock AI response
    setTimeout(() => {
      const aiResponseBody = "I'm sorry, but I'm currently offline. Please try again later.";

      const botResponse: Chat = {
        id: Date.now() + 1,
        body: aiResponseBody,
        role: "AI",
        created_at: new Date(),
        ai_conversation_id: currentChatId,
      };

      setMessages((prevMessages) => [...prevMessages, botResponse]);
      setIsBotTyping(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleSelectChat = (id: string | number) => {
    if (id !== activeChatId) {
      if (isSettingUpNewChat.current) {
        isSettingUpNewChat.current = false;
      }
      setActiveChatId(id);
      setIsBotTyping(false);
    }
  };

  const handleNewChat = async () => {
    isSettingUpNewChat.current = true;

    const newConversation: Conversation = {
      id: Date.now(),
      title: "New Discussion",
      created_at: new Date(),
      updated_at: new Date(),
    };

    setConversations((prev) => [newConversation, ...prev]);

    setMessages([
      {
        id: Date.now(),
        body: "Hello! I'm here to help. What's on your mind today?",
        role: "AI",
        created_at: new Date(),
        ai_conversation_id: newConversation.id,
      },
    ]);

    setActiveChatId(newConversation.id);

    isSettingUpNewChat.current = false;
  };

  return (
    <AIChatbotView
      setSelectedModel={setSelectedModel}
      handleSendMessage={handleSendMessage}
      handleSuggestionClick={handleSuggestionClick}
      selectedModel={selectedModel}
      isBotTyping={isBotTyping}
      inputValue={inputValue}
      setInputValue={setInputValue}
      messages={messages}
      conversations={conversations}
      activeChatId={activeChatId}
      handleSelectChat={handleSelectChat}
      handleNewChat={handleNewChat}
      viewportRef={viewportRef}
    />
  );
}
