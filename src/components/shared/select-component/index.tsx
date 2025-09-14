import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectItemType = {
  value: string;
  label: string;
};

interface SelectComponentProps {
  value: string;
  onValueChange: (value: string) => void;
  defaultValue: string;
  placeholder?: string;
  triggerClassName?: string;
  items: SelectItemType[];
}

export function SelectComponent({
  value,
  onValueChange,
  defaultValue,
  placeholder,
  triggerClassName,
  items,
}: SelectComponentProps) {
  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      defaultValue={defaultValue}
    >
      <SelectTrigger className={triggerClassName}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
