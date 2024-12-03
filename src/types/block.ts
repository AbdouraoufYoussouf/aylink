export interface SubBlock {
  id: string;
  image: string;
  description: string;
  url: string;
  blocId?: string;
}

export interface Block {
  id: string;
  title: string;
  subBlocks: SubBlock[];
}

export interface AddBlockData {
  title: string;
  subBlocks: Omit<SubBlock, "id" | "blocId">[];
}

export interface UpdateBlockTitle {
  blocId: string;
  title: string;
}

export interface UpdateSubBlock {
  blocId: string;
  subBlockId: string;
  description: string;
  url: string;
  image: string;
}