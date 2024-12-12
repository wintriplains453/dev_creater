interface IStoreItem {
  id: number;
  title: string;
  count: number;
  duration: number;
  level: number;
  style: IStyleStoreItem;
}

interface IStyleStoreItem {
  background: string;
  borderRadius: number;
  border: string;
}

export type { IStoreItem, IStyleStoreItem };