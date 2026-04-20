export interface MindfulnessTimerToastProps {
  toastId: string | number;
  title: string;
  initialDurationMs: number;
  onCancel: () => void;
}

export interface MindfulnessTimerToastViewProps
  extends MindfulnessTimerToastProps {
  formatTime: (ms: number) => string;
  timeLeftMs: number;
}


