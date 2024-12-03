"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Block } from "@prisma/client";
import { AddBlockData, SubBlock } from "@/src/types/block";
import { AddBlockForm } from "./add-block-form";
import { BlockCard } from "./block-card";

export  function BlockManager() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isAddingBlock, setIsAddingBlock] = useState(false);

  const handleAddBlock = (data: AddBlockData) => {
    const newBlock: Block = {
      id: uuidv4(),
      title: data.title,
      subBlocks: data.subBlocks.map((sb) => ({
        ...sb,
        id: uuidv4(),
      })),
    };
    setBlocks([...blocks, newBlock]);
    setIsAddingBlock(false);
  };

  const handleUpdateBlockTitle = (blockId: string, newTitle: string) => {
    setBlocks(
      blocks.map((block) =>
        block.id === blockId ? { ...block, title: newTitle } : block
      )
    );
  };

  const handleDeleteBlock = (blockId: string) => {
    setBlocks(blocks.filter((block) => block.id !== blockId));
  };

  const handleUpdateSubBlock = (updatedSubBlock: SubBlock) => {
    setBlocks(
      blocks.map((block) => ({
        ...block,
        subBlocks: block.subBlocks.map((sb) =>
          sb.id === updatedSubBlock.id ? updatedSubBlock : sb
        ),
      }))
    );
  };

  const handleDeleteSubBlock = (blockId: string, subBlockId: string) => {
    setBlocks(
      blocks.map((block) =>
        block.id === blockId
          ? {
              ...block,
              subBlocks: block.subBlocks.filter((sb) => sb.id !== subBlockId),
            }
          : block
      )
    );
  };

  const handleAddSubBlock = (
    blockId: string,
    data: Omit<SubBlock, "id" | "blocId">
  ) => {
    setBlocks(
      blocks.map((block) =>
        block.id === blockId
          ? {
              ...block,
              subBlocks: [
                ...block.subBlocks,
                { ...data, id: uuidv4(), blocId: blockId },
              ],
            }
          : block
      )
    );
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Blocks Management</h1>
        {!isAddingBlock && (
          <Button onClick={() => setIsAddingBlock(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Block
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {isAddingBlock && (
          <AddBlockForm
            onSubmit={handleAddBlock}
            onCancel={() => setIsAddingBlock(false)}
          />
        )}

        {blocks.map((block) => (
          <BlockCard
            key={block.id}
            block={block}
            onUpdateTitle={handleUpdateBlockTitle}
            onDeleteBlock={handleDeleteBlock}
            onUpdateSubBlock={handleUpdateSubBlock}
            onDeleteSubBlock={handleDeleteSubBlock}
            onAddSubBlock={handleAddSubBlock}
          />
        ))}
      </div>
    </div>
  );
}