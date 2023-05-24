import { Item, BaseItem } from "./item.interface";
import { Items } from "./items.interface";

/**
IN-MEMORY STORE
*/

const items: Items = {
  1: {
    id: 1,
    name: "Item 1",
    description: "Item 1 description",
    price: 100,
    image: "https://via.placeholder.com/150",
  },
  2: {
    id: 2,
    name: "Item 2",
    description: "Item 2 description",
    price: 200,
    image: "https://via.placeholder.com/150",
  },
  3: {
    id: 3,
    name: "Item 3",
    description: "Item 3 description",
    price: 300,
    image: "https://via.placeholder.com/150",
  },
};

/**
    Service Model
*/

export const findAll = async (): Promise<Item[]> => {
  return Object.values(items);
};

export const findById = async (id: number): Promise<Item> => {
  return items[id];
};

export const create = async (item: BaseItem): Promise<void> => {
  const id = new Date().valueOf();
  items[id] = { id, ...item };
};

export const update = async (
  id: number,
  item: BaseItem
): Promise<void | null> => {
  const itemCo = await findById(id);
  if (!itemCo) {
    return null;
  }
  items[id] = { ...items[id], ...item };
};

export const remove = async (id: number): Promise<void | null> => {
  const itemCo = await findById(id);
  if (!itemCo) {
    return null;
  }

  delete items[id];
};
