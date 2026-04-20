import { FC } from "react";
import { MobileMenuTriggerProps } from "./MobileMenuTrigger.type";

const MobileMenuTriggerView: FC<MobileMenuTriggerProps> = ({
  open,
  setOpen,
}) => {
  return (
    <div className="flex lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="cursor-pointer text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
        aria-label="toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`relative top-3 w-6 h-6 transition-all ${
            open ? "opacity-0" : "opacity-100"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 8h16M4 16h16"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`relative bottom-3 w-6 h-6 transition-all ${
            open ? "opacity-100" : "opacity-0"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default MobileMenuTriggerView;
