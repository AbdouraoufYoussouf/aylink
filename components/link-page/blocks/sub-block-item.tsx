"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2 } from "lucide-react";
import { ImageUpload } from "./image-upload";
import { SousBlock } from "@/src/types/block-type";

interface SubBlockItemProps {
  subBlock: SousBlock;
  onUpdate: (subBlock: SousBlock) => void;
  onDelete: () => void;
}

export function SubBlockItem({ subBlock, onUpdate, onDelete }: SubBlockItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    description: subBlock.description,
    url: subBlock.url,
    image: subBlock.image,
  });

  const handleUpdate = () => {
    onUpdate({
      ...subBlock,
      ...editedData,
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-4 p-4 border rounded-lg">
        <Input
          placeholder="URL"
          value={editedData.url}
          onChange={(e) =>
            setEditedData({ ...editedData, url: e.target.value })
          }
        />
        <div className="flex gap-4">
          <div className="w-1/3">
            <ImageUpload
              value={editedData.image}
              onChange={(url) => setEditedData({ ...editedData, image: url })}
            />
          </div>
          <Textarea
            placeholder="Description"
            value={editedData.description}
            onChange={(e) =>
              setEditedData({ ...editedData, description: e.target.value })
            }
            className="flex-1"
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button onClick={handleUpdate}>Save</Button>
          <Button
            variant="ghost"
            onClick={() => {
              setEditedData({
                description: subBlock.description,
                url: subBlock.url,
                image: subBlock.image,
              });
              setIsEditing(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      <div className="relative w-12 h-12 rounded-full overflow-hidden">
        <Image
          src={subBlock.image}
          alt={subBlock.description}
          fill
          className="object-cover"
        />
      </div>
      <p className="flex-1 text-sm text-gray-600">{subBlock.description}</p>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsEditing(true)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}