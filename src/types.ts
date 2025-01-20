export interface TextBlock {
  id: number;
  type: "text";
  text: string;
  order: number;
}

export interface ImageBlock {
  id: number;
  type: "image";
  image: string;
  order: number;
}

export type Block = TextBlock | ImageBlock;
