import { ChangeEventHandler, useRef } from 'react';
import { ElementTypes } from '../config/Constants';
import { ConnectDragPreview, ConnectDragSource, useDrag } from 'react-dnd';
import useOnClickOutsideCanvas from '../hooks/useOnClickOutsideCanvas';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useDndStore } from '@/store/dnd';

type Props = {
  fontSize?: number;
  color?: string;
  text?: string;
  id?: number | null;
  position?: 'absolute' | 'static';
  left?: number | string;
  top?: number | string;
  type?: string;
  selectedId?: number | null;
  onSelected?: (selectedId: number | null) => void;
  onChange?: (item: {
    id: number;
    text?: string;
    type?: string;
    top?: number | string;
    left?: number | string;
    position?: string;
  }) => void;
};

const Text = (props: Props) => {
  const {
    fontSize = 16,
    id = null,
    position = 'static',
    color = 'blue',
    text = 'The Quick Brown Fox',
    left = 'auto',
    top = 'auto',
  } = props;
  const {
    updateItems: onChange,
    selectedId,
    handleSelect: onSelected
  } = useDndStore()

  const [{ isDragging }, drag]: [{ isDragging: boolean }, ConnectDragSource, ConnectDragPreview] =
    useDrag(() => ({
      type: ElementTypes.TEXT,
      item: { id },
    }));

  const wrapRef = useRef(null);

  const isSelected = !!selectedId && selectedId === id;

  const onOutsideClick = () => {
    console.log('outside clicked');
    if (isSelected && typeof onSelected !== 'undefined') {
      onSelected(null);
    }
  };

  const onClick = () => {
    if (typeof onSelected !== 'undefined' && id !== null) {
      onSelected(null);
      onSelected(id);
    }
  };

  useOnClickOutsideCanvas(wrapRef, 'canvas', onOutsideClick);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    if (isSelected && typeof onChange !== 'undefined' && e.target !== null) {
      onChange({
        id: id,
        text: e.target.value,
      });
    }
  };
  return (
    <div
      onClick={onClick}
      ref={drag}
      style={{
        outline: selectedId && selectedId === id ? '1px solid red' : 'none',
        opacity: isDragging ? 0.5 : 1,
        position: position,
        left: left,
        top: top,
        borderRadius: '8px'
      }}
    >
      <div ref={wrapRef}>
        {isSelected ? (
          <Input
            style={{
              fontSize,
              display: 'block',
              color,
            }}
            className="focus-visible:ring-0"
            onChange={handleChange}
            type="text"
            value={text}
          />
        ) : (
          <Label
            style={{
              fontSize,
              display: 'block',
              color,
            }}
          >
            {text}
          </Label>
        )}
      </div>
    </div>
  );
};

export default Text;
