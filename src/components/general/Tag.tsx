import { ReactNode } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MdClose } from "react-icons/md";

type TagProps = {
  children: ReactNode;
  onClick: () => void;
};

export default function Tag({ children, onClick }: TagProps) {
  return (
    <Badge variant="secondary">
      #{children}
      <Button type="button" variant="ghost" onClick={onClick}>
        <MdClose />
      </Button>
    </Badge>
  );
}
