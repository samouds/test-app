import { DndProvider } from 'react-dnd';
import './App.css';
import Canvas from './components/Canvas';
import Image from './components/Image';
import Text from './components/Text';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AssetsCard from './components/AssetsCard';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-row gap-8">
        <aside className="relative flex flex-col w-2/12 p-2">
          <AssetsCard>
            <Text text="Quick brown fox" fontSize={20} color="red" />
          </AssetsCard>
          <AssetsCard>
            <Image />
          </AssetsCard>
        </aside>
        <div className="w-10/12 px-2">
          <Canvas />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
