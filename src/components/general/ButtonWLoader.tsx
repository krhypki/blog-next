import { VariantProps } from "class-variance-authority";
import Spinner from "../ui/Spinner";
import { Button, buttonVariants } from "../ui/button";

type ButtonWLoaderProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    loading: boolean;
  };

export default function ButtonWLoader({
  loading,
  ...props
}: ButtonWLoaderProps) {
  return (
    <Button {...props} disabled={props.disabled || loading}>
      {props.children}
      {loading && <Spinner className="border-white h-5 w-5 ml-4" />}
    </Button>
  );
}
