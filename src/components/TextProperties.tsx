
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ChangeEventHandler, useState } from 'react';

import { Button } from "../components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { Input } from "./ui/input"
import useStore from "../store"
// import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  // color: z
  //   .string({
  //     required_error: "Please select an email to display.",
  //   })
})

 const TextProperties=()=> {

  

  const { selectedItem, updateItem, selectItem }= useStore()
  console.log("selectedItem<<,", selectedItem)
  const { fontSize, color, id } = selectedItem;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const handleChange: ChangeEventHandler<HTMLSelectElement | HTMLInputElement> = (e) => {
    
    updateItem({
      id,
      [e.target.name]: e.target.name === 'fontSize' ? +e.target.value : e.target.value,
    });

    selectItem(id)
  };

  const [selectedColor, setSelectedColor] = useState(color);

  const handleColorChange = (newColor: string) => {
    setSelectedColor(newColor)
    updateItem({
      id,
      color: newColor,
    });
  };
  return (
    <Form {...form}>
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>

<Input
        className="border-[2px] border-blue-500 p-2 my-2"
        name="fontSize"
        type="number"
        value={fontSize}
        onChange={handleChange}
      />

              <Select onValueChange={(value)=>{
                field.onChange(value)
                handleColorChange(value)
              }}  defaultValue={selectedColor}>
                <FormControl  className="border-[2px] border-blue-500 p-2 my-2">
                  <SelectTrigger>
                    <SelectValue placeholder={selectedColor} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem  value="blue">Blue</SelectItem>
                  <SelectItem  value="black">black</SelectItem>
                  <SelectItem  value="red">Red</SelectItem>
                  <SelectItem  value="green">Green</SelectItem>

                </SelectContent>
              </Select>
            
              <FormMessage />
            </FormItem>
          )}
        />
    </Form>
  )
}

export default TextProperties;