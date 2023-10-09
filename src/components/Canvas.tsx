import { FormEventHandler, useEffect, useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';
import { useDrop } from 'react-dnd';
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { ElementTypes } from '../config/Constants';
import useStore, { Item } from '../store';
import Container from './Container';
import FormContainer from './FormContainer';
import { Button } from './ui/button';
import { Form, FormField, FormItem } from './ui/form';
import { Input } from './ui/input';


const Canvas = () => {
  const FormSchema = z.object({
  })

  const dropbox = useRef(null);
  const incrementor = useRef(1);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  const [selectedId, onSelected] = useState(null);
  const { items, addItem, updateItem, selectItem } = useStore();

  useEffect(() => {
  }, [items]);

  const [, drop] = useDrop(() => ({
    accept: [ElementTypes.TEXT, ElementTypes.IMAGE],
    drop: (item: { id: number }, monitor) => {
      const initial = monitor.getInitialSourceClientOffset();
      const final = monitor.getSourceClientOffset();
      const boundRect = (dropbox.current as HTMLDivElement | null)?.getBoundingClientRect();
      console.log("item is ", item)
      if (final === null || initial === null || boundRect == null) {
        updateItems({
          id: item.id,
          top: 'auto',
          left: 'auto',
          position: 'absolute',
          type: monitor.getItemType() as string,
        });

        return;
      }
      const yPos =
        final.y > initial.y
          ? initial.y + (final.y - initial.y) - boundRect?.y
          : initial.y - (initial.y - final.y) - boundRect?.y;
      const xPos =
        final.x > initial.x
          ? initial.x + (final.x - initial.x) - boundRect.x
          : initial.x - (initial.x - final.x) - boundRect.x;
      if (item.id === null) {
        const newitem = {
          top: Math.round(yPos),
          left: Math.round(xPos),
          color: "red",
          position: 'absolute',
          type: monitor.getItemType() as string,
          id: incrementor.current++,

        }
        console.log("new iteem is ", newitem)
        addItem(newitem)
      }
      updateItems({
        id: item.id,
        top: Math.round(yPos),
        left: Math.round(xPos),
        position: 'absolute',
        type: monitor.getItemType() as string,
      });
    },
  }));
  console.log(selectedId, "items to select ", items)

  const updateItems: (item: Item) => void = (item) => {
    updateItem(item)
    return item;
  };
  const configJSON = JSON.stringify(items);
  const handleFileUpload: FormEventHandler = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = (e.target as HTMLFormElement).configJson.files[0];
    reader.readAsText(file);
    reader.onload = () => {
      const items = JSON.parse(reader.result as string);
      items.files.forEach((item: Item) => {
        addItem(item);
      });
    };

    reader.onerror = () => {
      console.log(reader.error);
    };
  };

  const handleDownload = () => {
    // Convert the JSON object to a string
    const jsonString = JSON.stringify(configJSON, null, 2); // Ensure proper JSON formatting with indentation

    // Create a data URL with utf-8 encoding
    const dataURL = `data:text/json;charset=utf-8,${encodeURIComponent(configJSON)}`;

    // Create a temporary link element for download
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = dataURL;
    a.download = 'config-json.json';

    // Append the link to the document and trigger the click event
    document.body.appendChild(a);
    a.click();

    // Clean up by removing the link
    document.body.removeChild(a);
  };

  return (
    <div ref={dropbox} className="relative flex flex-row">
      <div
        id="canvas"
        ref={drop}
        className="w-8/12 flex flex-row content-start p-3 gap-3 flex-wrap min-h-screen border-[2px]"
      >
        <Button
          className="block h-10 px-4 py-2 text-gray-200 bg-blue-500"
          onClick={handleDownload}
        >
          Download JSON
        </Button>

        <Form {...form}>
          <form
            className="border-[1px] border-blue-300 block h-10"
            method="post"
            onSubmit={handleFileUpload}
          >
            <FormField
              control={form.control}
              name={"color" as never}
              render={({ field }) => (
                <FormItem>

                  <div className='flex w-full max-w-sm items-center space-x-0'>
                    <Input type="file" name="configJson" accept=".json" />
                    <Button className="px-4 py-2 text-gray-200 bg-blue-600" type="submit">
                      Save
                    </Button>
                  </div>
                </FormItem>

              )}
            ></FormField>
          </form>
        </Form>
        {items.map((item) => (
          <Container
            key={(item as { id: number }).id}
            {...(item as object)}
          />
        ))}
      </div>
      <aside id="form-editor" className="flex flex-col w-4/12 gap-2 p-2">
        <FormContainer />
      </aside>
    </div>
  );
};

export default Canvas;
