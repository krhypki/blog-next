import { InputHTMLAttributes, forwardRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type InputWLabelProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  className?: string;
  error?: string;
  children?: React.ReactNode;
};

const InputWLabel = forwardRef<HTMLInputElement, InputWLabelProps>(
  ({ label, error, children, className, ...props }, ref) => {
    return (
      <Label className={className}>
        {label}
        <Input ref={ref} {...props} className="mt-2 pr-8" invalid={!!error} />
        {children}
        {error && <p className="text-red-700 mt-1 ml-2">{error}</p>}
      </Label>
    );
  }
);

InputWLabel.displayName = "InputWLabel";
export default InputWLabel;
