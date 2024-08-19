import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/lib/types/database";

type SelectValue = {
  name: string;
  id: number;
};

type CategorySelectProps = {
  categories: Category[];
  defaultValue?: string;
  value: string;
  onChange: (value: SelectValue) => void;
};

export default function CategorySelect({
  categories,
  onChange,
  value,
  defaultValue,
}: CategorySelectProps) {
  const handleChange = (value: string) => {
    const category = categories.find((category) => category.name === value);

    if (!category) {
      return;
    }

    onChange({
      name: value,
      id: category.id,
    });
  };

  return (
    <Select
      onValueChange={handleChange}
      value={value}
      defaultValue={defaultValue}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.name}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
