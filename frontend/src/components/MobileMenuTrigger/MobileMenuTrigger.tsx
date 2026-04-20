import { Dispatch, SetStateAction } from "react";
import MobileMenuTriggerView from "./MobileMenuTrigger.view";

export default function MobileMenuTrigger({
  setOpen,
  open,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}) {
  return <MobileMenuTriggerView open={open} setOpen={setOpen} />;
}
