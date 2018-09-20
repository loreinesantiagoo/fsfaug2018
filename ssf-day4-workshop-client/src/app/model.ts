export interface Item {
  name: string;
  item: string;
}

export interface Cart {
  name: string;
  content: string[];
  saved?: string;
}
