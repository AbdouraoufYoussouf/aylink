"use client";

import { useState } from "react";
import { SubBlock } from "@/types/block";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "./image-upload";

interface AddSubBlockFormProps {
  onSubmit: (data: Omit<SubBlock, "id" | "blocId">) => void;
  onCancel?: () => void;
}

export function AddSubBlockForm({ onSubmit, onCancel }: AddSubBlockFormProps) {
  const [data, setData] = useState<Omit<SubBlock, "id" | "blocId">>({
    description: "",
    url: "",
    image: "",
  });

  const handleSubmit = () => {
    if (!data.description || !data.url || !data.image) return;
    onSubmit(data);
    setData({ description: "", url: "", image: "" });
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <Input
        placeholder="URL"
        value={data.url}
        onChange={(e) => setData({ ...data, url: e.target.value })}
      />
      <div className="flex gap-4">
        <div className="w-1/3">
          <ImageUpload
            value={data.image}
            onChange={(url) => setData({ ...data, image: url })}
          />
        </div>
        <Textarea
          placeholder="Description"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          className="flex-1"
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button onClick={handleSubmit}>Add Sub-block</Button>
        {onCancel && (
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}