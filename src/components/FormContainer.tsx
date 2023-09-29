import { ElementTypes } from '../config/Constants';
import TextProperties from './TextProperties';
import { useDndStore } from '@/store/dnd';

const FormContainer = () => {
  const {
    items,
    selectedId
  } = useDndStore()

  const selectedItem = selectedId ? items.find(({ id }) => id === selectedId): null
 
  if (selectedItem !== undefined && selectedItem !== null) {
    switch (selectedItem.type) {
      case ElementTypes.TEXT:
        return <TextProperties selectedItem={selectedItem} />;
      default:
        return <div>Image selected</div>;
    }
  } else {
    return <div className="ml-4">No text selected</div>;
  }
};

export default FormContainer;
