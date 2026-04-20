import { FC, useEffect, useState } from "react";
import { MindfulnessTimerToastProps } from "./MindfulnessTimerToast.type";
import MindfulnessTimerToastView from "./MindfulnessTimerToast.view";

const MindfulnessTimerToast: FC<MindfulnessTimerToastProps> = ({
  toastId,
  title,
  initialDurationMs,
  onCancel,
}) => {
  const [timeLeftMs, setTimeLeftMs] = useState(initialDurationMs);

  useEffect(() => {
    if (timeLeftMs <= 0) return;

    const interval = setInterval(() => {
      setTimeLeftMs((prevTime) => Math.max(0, prevTime - 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeftMs]);

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <MindfulnessTimerToastView
      title={title}
      onCancel={onCancel}
      formatTime={formatTime}
      timeLeftMs={timeLeftMs}
      initialDurationMs={initialDurationMs}
      toastId={toastId}
    />
  );
};

export default MindfulnessTimerToast;
