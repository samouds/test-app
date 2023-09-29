import { ChangeEventHandler } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ItemType } from '@/lib/types';
import { useDndStore } from '@/store/dnd';

type Props = {
  selectedItem: ItemType;
};

const TextProperties = ({ selectedItem }: Props) => {
  const {
    updateItems: onChange,
  } = useDndStore()

  const { fontSize, color, id } = selectedItem;

  const handleChange = (key: string, value: string) => {
    onChange &&
      onChange({
        id,
        [key]: key === 'fontSize' ? +value : value,
      });
  };

  return (
    <form className="flex flex-col">
      <Input
        className="border-[2px] border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500 p-2 my-2"
        name="fontSize"
        type="number"
        value={fontSize}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />

      <Select
        value={color}
        onValueChange={(val) => handleChange('color', val)}
      >
        <SelectTrigger
          name="color"
          className="border-[2px] border-blue-500 focus:ring-1 focus:ring-blue-500 p-2 my-2 "
        >
          <SelectValue placeholder="Select a verified email to display"/>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="blue">Blue</SelectItem>
          <SelectItem value="black">Black</SelectItem>
          <SelectItem value="red">Red</SelectItem>
          <SelectItem value="green">Green</SelectItem>
        </SelectContent>
      </Select>
    </form>
  );
};

export default TextProperties;
