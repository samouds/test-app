import { create } from 'zustand'
import { ItemType } from '@/lib/types';
import { DefaultItemProps } from '@/config/Constants';

interface DnDState {
  items: ItemType[]
  setItems: (item: ItemType[]) => void
  selectedId: number | null
  selectedItem?: ItemType | null,
  updateItems: (item: ItemType) => void
  handleSelect: (id: null | number) => void
}

const dndStore = create<DnDState>((set) => ({
  items: [],
  setItems: (items) => set({ items: items }),
  selectedId: null,
  updateItems: (item) => set((state) => {
    const list = [...state.items];
    if (item.id === null) {
      const newItem = {
        ...item,
        id: Date.now(),
        ...DefaultItemProps[item.type as string],
      };
      list.push(newItem as never);
    } else {
      const index: number = list.findIndex(({ id }) => id === item.id);
      const newItem = {
        ...(list[index] as object),
        ...item,
      };
      list[index] = newItem as never;
    }
    return { items: list };
  }),
  get selectedItem()  {
    return this.selectedId ? this.items.find(({ id }) => id === this.selectedId): null
  },
  handleSelect: (id) => set({ selectedId: id }),
}));

export const useDndStore = () => dndStore();
