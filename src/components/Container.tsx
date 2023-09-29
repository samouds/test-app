import Image from './Image';
import Text from './Text';
import { ElementTypes } from '../config/Constants';
type Props = {
  fontSize?: number;
  color?: string;
  text?: string;
  src?: string;
  alt?: string;
  id?: number | null;
  position?: 'absolute' | 'static';
  left?: number | string;
  top?: number | string;
  type?: string;
  selectedId?: number | null;
};

const Container = (props: Props) => {
  const { type } = props;
  switch (type) {
    case ElementTypes.TEXT:
      return <Text {...props} />;
    case ElementTypes.IMAGE:
      return <Image {...props} />;
    default:
      return null;
  }
};

export default Container;
