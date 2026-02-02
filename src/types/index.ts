export interface Item {
  message: string;
  done: boolean;
  created_at: Date;
}

export interface CheckList {
  slug: string;
  title: string;
  items: Array<Item>;
  created_at: Date;
}

export interface Data {
  lists: Array<CheckList>;
}
