import { X } from "lucide-react";
import { Button } from "../ui/button";
import { FC } from "react";
import { MindfulnessTimerToastViewProps } from "./MindfulnessTimerToast.type";

const MindfulnessTimerToastView: FC<MindfulnessTimerToastViewProps> = ({
  title,
  onCancel,
  formatTime,
  timeLeftMs,
}) => {
  return (
    <div className="flex items-center justify-between w-full p-4 bg-background border rounded-lg shadow-lg dark:bg-gray-800">
      <div className="flex-1 mr-4">
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-lg font-mono font-bold text-primary">
          {formatTime(timeLeftMs)}
        </p>
        <p className="text-xs text-muted-foreground">
          Mindfulness session in progress...
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        onClick={onCancel}
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default MindfulnessTimerToastView;
