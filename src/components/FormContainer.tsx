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
        return null;
    }
  } else {
    return null;
  }
};

export default FormContainer;
