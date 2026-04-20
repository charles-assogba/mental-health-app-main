import { Dispatch, SetStateAction } from "react";

export interface MobileMenuTriggerProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}
