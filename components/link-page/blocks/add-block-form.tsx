"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AddBlockData, SubBlock } from "@/types/block";
import { AddSubBlockForm } from "./add-sub-block-form";

interface AddBlockFormProps {
  onSubmit: (data: AddBlockData) => void;
  onCancel: () => void;
}

export function AddBlockForm({ onSubmit, onCancel }: AddBlockFormProps) {
  const [title, setTitle] = useState("");
  const [subBlocks, setSubBlocks] = useState<Omit<SubBlock, "id" | "blocId">[]>([]);

  const handleSubmit = () => {
    if (!title.trim() || subBlocks.length === 0) return;
    onSubmit({ title, subBlocks });
  };

  return (
    <Card>
      <CardHeader>
        <Input
          placeholder="Block Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </CardHeader>
      <CardContent className="space-y-4">
        {subBlocks.map((subBlock, index) => (
          <div key={index} className="relative p-4 border rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() =>
                setSubBlocks(subBlocks.filter((_, i) => i !== index))
              }
            >
              Remove
            </Button>
            <div className="pt-6">
              <p className="text-sm text-gray-600">{subBlock.description}</p>
            </div>
          </div>
        ))}
        <AddSubBlockForm
          onSubmit={(data) => setSubBlocks([...subBlocks, data])}
        />
        <div className="flex justify-end gap-2 pt-4">
          <Button onClick={handleSubmit} disabled={!title || subBlocks.length === 0}>
            Save Block
          </Button>
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}