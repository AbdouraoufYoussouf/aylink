"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Plus } from "lucide-react";
import { SubBlockItem } from "./sub-block-item";
import { AddSubBlockForm } from "./add-sub-block-form";
import { Block, SousBlock } from "@/src/types/block-type";

interface BlockCardProps {
  block: Block;
  onUpdateTitle: (blockId: string, newTitle: string) => void;
  onDeleteBlock: (blockId: string) => void;
  onUpdateSubBlock: (subBlock: SousBlock) => void;
  onDeleteSubBlock: (blockId: string, subBlockId: string) => void;
  onAddSubBlock: (blockId: string, data: Omit<SousBlock, "id" | "blocId">) => void;
}

export function BlockCard({
  block,
  onUpdateTitle,
  onDeleteBlock,
  onUpdateSubBlock,
  onDeleteSubBlock,
  onAddSubBlock,
}: BlockCardProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(block.title);
  const [isAddingSubBlock, setIsAddingSubBlock] = useState(false);

  const handleTitleUpdate = () => {
    if (editedTitle.trim() !== block.title) {
      onUpdateTitle(block.id, editedTitle);
    }
    setIsEditingTitle(false);
  };

  return (
    <Card className="w-full">
      <CardHeader className="relative pb-2">
        <div className="flex items-center justify-between">
          {isEditingTitle ? (
            <div className="flex items-center gap-2 flex-1">
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="max-w-sm"
              />
              <Button onClick={handleTitleUpdate} size="sm">
                Save
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditedTitle(block.title);
                  setIsEditingTitle(false);
                }}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <h3 className="text-lg font-semibold">{block.title}</h3>
          )}
          <div className="flex items-center gap-2">
            {!isEditingTitle && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditingTitle(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDeleteBlock(block.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {block.subBlocks.map((subBlock) => (
            <SubBlockItem
              key={subBlock.id}
              subBlock={subBlock}
              onUpdate={onUpdateSubBlock}
              onDelete={() => onDeleteSubBlock(block.id, subBlock.id)}
            />
          ))}
          {isAddingSubBlock ? (
            <AddSubBlockForm
              onSubmit={(data) => {
                onAddSubBlock(block.id, data);
                setIsAddingSubBlock(false);
              }}
              onCancel={() => setIsAddingSubBlock(false)}
            />
          ) : (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsAddingSubBlock(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Sub-block
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}