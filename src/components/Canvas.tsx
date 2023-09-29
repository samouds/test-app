import { FormEventHandler, useRef } from 'react';

import { ElementTypes } from '../config/Constants';
import { useDrop } from 'react-dnd';
import Container from '@/components/Container';
import FormContainer from './FormContainer';
import { Button } from '@/components/ui/button';
import { Input } from './ui/input';
import { useDndStore } from '@/store/dnd';
import { Label } from './ui/label';

const Canvas = () => {
  const dropbox = useRef(null);
  // const incrementor = useRef(1);
  // const [selectedId, onSelected] = useState(null);
  // const [items, setItems] = useState([]);
  const {
    items,
    setItems,
    updateItems,
  } = useDndStore()
  const [, drop] = useDrop(() => ({
    accept: [ElementTypes.TEXT, ElementTypes.IMAGE],
    drop: (item: { id: number }, monitor) => {
      const initial = monitor.getInitialSourceClientOffset();
      const final = monitor.getSourceClientOffset();
      const boundRect = (dropbox.current as HTMLDivElement | null)?.getBoundingClientRect();
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
      updateItems({
        id: item.id,
        top: Math.round(yPos),
        left: Math.round(xPos),
        position: 'absolute',
        type: monitor.getItemType() as string,
      });
    },
  }));

  const configJSON = JSON.stringify(items);
  const handleFileUpload: FormEventHandler = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = (e.target as HTMLFormElement).configJson.files[0];
    reader.readAsText(file);
    reader.onload = () => {
      const items = JSON.parse(reader.result as string);
      setItems([...items] as never[]);
    };

    reader.onerror = () => {
      console.log(reader.error);
    };
  };

  return (
    <div ref={dropbox} className="relative flex flex-row">
      <div
        id="canvas"
        ref={drop}
        className="w-8/12 flex flex-row content-start items-center p-3 gap-3 flex-wrap min-h-screen border-[2px]"
      >
        <Button
          className="bg-blue-500 hover:bg-blue-700"
          disabled={!items.length}
        >
          <a
            href={`data:text/json;charset=utf-8,${encodeURIComponent(configJSON)}`}
            download="config-json.json"
          >
            Download JSON
          </a>
        </Button>
        <form
          className="border-[1px] border-blue-300 block h-12 p-[3px] rounded-lg"
          method="post"
          onSubmit={handleFileUpload}
        >
          <Input type="file" className="inline-block w-auto border-0 cursor-pointer" name="configJson" accept=".json" />
          <Button
            className="inline-block my-auto bg-blue-600 hover:bg-blue-700"
            type="submit"
          >
            Import
          </Button>
        </form>
        {items.map((item) => (
          <Container
            key={(item as { id: number }).id}
            {...(item as object)}
          />
        ))}
      </div>
      {
        !items.length ?
        <div className="absolute left-[25%] top-[40%]">Drop item on the left menu here</div>
        : ''
      }
      <aside id="form-editor" className="flex flex-col w-4/12 gap-2 p-2">
        <Label className="m-4 text-xl">Editor</Label>
        <FormContainer/>
      </aside>
    </div>
  );
};

export default Canvas;
