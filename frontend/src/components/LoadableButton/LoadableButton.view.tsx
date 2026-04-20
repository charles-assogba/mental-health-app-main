import { FC } from "react";
import { LoadableButtonProps } from "./LoadableButton.type";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

const LoadableButtonView: FC<LoadableButtonProps> = ({
  isLoading,
  children,
  variant,
  ...props
}) => {
  return (
    <>
      {isLoading ? (
        <Button variant={variant || "default"} disabled {...props}>
          <Loader className="animate-spin" />
        </Button>
      ) : (
        <Button variant={variant || "default"} {...props}>
          {children}
        </Button>
      )}
    </>
  );
};

export default LoadableButtonView;
