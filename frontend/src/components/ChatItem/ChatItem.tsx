import { FC } from "react";
import { ChatItemProps } from "./ChatItem.type";
import ChatItemView from "./ChatItem.view";

const ChatItem: FC<ChatItemProps> = ({ convo, isActive, onSelect }) => (
  <ChatItemView convo={convo} isActive={isActive} onSelect={onSelect} />
);

export default ChatItem;
