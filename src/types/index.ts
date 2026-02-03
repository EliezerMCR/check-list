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

// Serialized versions for JSON export (dates as ISO strings)
export interface SerializedItem {
  message: string;
  done: boolean;
  created_at: string;
}

export interface SerializedCheckList {
  slug: string;
  title: string;
  items: Array<SerializedItem>;
  created_at: string;
}

export interface ExportedData {
  version: string;
  exportedAt: string;
  app: string;
  data: {
    lists: SerializedCheckList[];
  };
}
