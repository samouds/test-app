import { ElementTypes } from '../config/Constants';
import { Item } from '../store';
import TextProperties from './TextProperties';
import useStore from '../store';
import {useEffect} from 'react'

type Props = {
  // selectedItem?: {
  //   fontSize: number;
  //   color: string;
  //   type: string;
  //   id: number;
  // } | null;
  onChange?: (item: Item) => void;
};
const FormContainer = () => {
  const { selectedItem }= useStore()

  useEffect(()=>{

  },[selectedItem])
  if (selectedItem !== undefined && selectedItem !== null) {
    switch (selectedItem.type) {
      case ElementTypes.TEXT:
        return <TextProperties />;
      default:
        return null;
    }
  } else {
    return null;
  }
};

export default FormContainer;
