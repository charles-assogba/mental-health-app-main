import { cn } from '@/lib/utils'
import { listItemFade, sidebarTextColor, sidebarHoverBg, sidebarActiveBg, sidebarActiveTextColor } from '@/pages/AIChatbot/AIChatbot.data'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@radix-ui/react-dropdown-menu'
import { motion } from 'framer-motion'
import { MessageSquare, MoreHorizontal } from 'lucide-react'
import { Button } from '../ui/button'
import { ChatItemProps } from './ChatItem.type'
import { FC } from 'react'

const ChatItemView: FC<ChatItemProps> = ({ convo, isActive, onSelect }) => {
  return (
    <motion.li variants={listItemFade} whileHover="hover" whileTap="tap">
    <button
      onClick={() => onSelect(convo.id)}
      className={cn(
        "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors duration-150 ease-in-out",
        sidebarTextColor,
        sidebarHoverBg,
        isActive
          ? `${sidebarActiveBg} ${sidebarActiveTextColor} font-medium`
          : ""
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <MessageSquare
        className={cn(
          "w-4 h-4 flex-shrink-0",
          isActive ? sidebarActiveTextColor : "text-gray-500 dark:text-gray-400"
        )}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{convo.title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
          {convo.title || "No message yet"}
        </p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-7 w-7 ml-auto flex-shrink-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity",
              isActive ? sidebarActiveTextColor : sidebarTextColor
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent> ... Actions ... </DropdownMenuContent>
      </DropdownMenu>
    </button>
  </motion.li>
  )
}

export default ChatItemView
