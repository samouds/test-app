import { ChangeEventHandler, useEffect, useRef } from 'react';
import { ElementTypes } from '../config/Constants';
import { ConnectDragPreview, ConnectDragSource, useDrag } from 'react-dnd';
import useOnClickOutsideCanvas from '../hooks/useOnClickOutsideCanvas';
import useStore from '../store';

type Props = {
  fontSize?: number;
  color?: string;
  text?: string;
  id?: number | null;
  position?: 'absolute' | 'static';
  left?: number | string;
  top?: number | string;
  type?: string;
};


const Text = (props: Props) => {

  const { selectedItem } = useStore()
  console.log("selectedItem ", selectedItem)

  useEffect(()=>{

  },[selectedItem])



  const {
    fontSize = 16,
    id = null,
    position = 'static',
    color = 'blue',
    text = 'The Quick Brown Fox',
    left = 'auto',
    top = 'auto',
  } = props;
  const [{ isDragging }, drag]: [{ isDragging: boolean }, ConnectDragSource, ConnectDragPreview] =
    useDrag(() => ({
      type: ElementTypes.TEXT,
      item: { id },
    }));

  const wrapRef = useRef(null);
  const { updateItem, selectItem } = useStore()
  const isSelected = !!selectedItem?.id && selectedItem?.id === id;

  const onOutsideClick = () => {
    if (isSelected) {
      selectItem(null);
    }
  };

  const onClick = () => {
    if (id !== null) {
      selectItem(null);
      id && selectItem(id)

    }
  };

  useOnClickOutsideCanvas(wrapRef, 'canvas', onOutsideClick);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    if (isSelected && e.target !== null) {
      updateItem({
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
        outline: selectedItem?.id && selectedItem?.id === id ? '1px solid red' : 'none',
        opacity: isDragging ? 0.5 : 1,
        position: position,
        left: left,
        top: top,
      }}
    >
      <div ref={wrapRef}>
        {isSelected ? (
          <input
            style={{
              fontSize,
              display: 'block',
              color,
            }}
            onChange={handleChange}
            type="text"
            value={text}
          />
        ) : (
          <span
            style={{
              fontSize,
              display: 'block',
              color,
            }}
          >
            {text}
          </span>
        )}
      </div>
    </div>
  );
};

export default Text;
