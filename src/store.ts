import create, { StateCreator } from 'zustand';

export interface Item {
  fontSize?: number;
  color?: string;
  type?: string;
  id: number | null;
  text?: string;
  top?: number | string | undefined;
  left?: number | string | undefined;
  position?: string | undefined;
}

interface StoreState {
  count: number;
  items: Item[];
  selectedItem: Item
}

interface StoreActions {
  addItem: (item: Item) => void;
  updateItem:(item: Item) => void;
  selectItem:(selectedItemId : number|null) => void;
  
}

type Store = StoreState & StoreActions;

const initialState: StoreState = {
  count: 0,
  items: [],
  selectedItem: {
    fontSize : 16,
    id : null,
    position : 'static',
    color : 'blue',
    left : 'auto',
    top : 'auto'
  }
};

const createStore: StateCreator<Store> = (set) => ({
  ...initialState,
  addItem: (item) => {
    console.log(" i am callled")
    if (Array.isArray(item)) {
      set((state) => ({ items: [...state.items, ...item] }));
    } else {
      set((state) => ({ items: [...state.items, item] }));
    }
  },
  updateItem: (selectedItem) => {
    set((state) => {
      if(selectedItem.id==null)
      {
        return { items : state.items}
      }
      const existingItemIndex = state.items.findIndex((item) => item.id === selectedItem.id);
      if (existingItemIndex === -1) {
       return  {items: [...state.items, selectedItem]};
      } else {
        const updatedItems = state.items;
        console.log(existingItemIndex, "updatedItems ",updatedItems)
        updatedItems[existingItemIndex] = {  ...updatedItems[existingItemIndex], ...selectedItem };
        console.log("updatedItems2 ",updatedItems)

        return { items: updatedItems };
      }
    });
  },
  selectItem: (selectedItemId) => {
    set((state) => {  
      if(!selectedItemId){
        return {selectedItem : undefined}
      }
        const selectedItem =  state.items.find(({ id }) => id === selectedItemId);
        return {selectedItem : selectedItem}
      
    });
  },
});

const useStore = create(createStore);

export default useStore;