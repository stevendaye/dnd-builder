export interface TextBlockType {
  id: number;
  type: "text";
  text: string;
  order: number;
}

export interface ImageBlockType {
  id: number;
  type: "image";
  image: string;
  order: number;
}

export type Block = TextBlockType | ImageBlockType;
