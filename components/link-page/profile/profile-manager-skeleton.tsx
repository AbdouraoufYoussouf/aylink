"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import { Trash2, Plus, Camera, Edit2 } from 'lucide-react'
import { Avatar } from "@/components/ui/avatar"
import { MyTooltipProvider } from "@/components/tooltip-provider"

export default function ProfileManagerSkeleton() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="w-full max-w-3xl py-4 relative flex items-center justify-center overflow-hidden">
      <header className="absolute top-5 right-0 z-10 m-2">
        <MyTooltipProvider content="Modifier le profil">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(!isEditing)}
            className="hover:bg-white/20"
          >
            <Edit2 className="h-5 w-5" />
          </Button>
        </MyTooltipProvider>
      </header>
      <Card className="w-full mt-2 relative backdrop-blur-lg shadow-2xl overflow-hidden">
        <CardContent className="p-2 sm:p-8 md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full shadow-xl overflow-hidden"
          >
            <div className="relative h-40">
              <Skeleton className="w-full bg-muted h-full rounded-lg" />
              {isEditing && (
                <label htmlFor="banner-upload" className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer rounded-lg">
                  <Camera className="w-8 h-8 text-white" />
                  <input
                    id="banner-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              )}
              <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2">
                <Avatar className="w-28 h-28 border-4 border-white shadow-lg">
                  <Skeleton className="w-full bg-muted h-full rounded-full" />
                </Avatar>
                {isEditing && (
                  <label htmlFor="image-upload" className="absolute inset-0 flex items-center justify-center group-hover:opacity-100 transition-opacity duration-300 rounded-full cursor-pointer">
                    <Camera className="w-8 h-8 text-white" />
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
            <div className="md:p-4 p-2 text-center mt-16">
              <div className="space-y-4">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Skeleton className="h-8 bg-muted w-48 mx-auto" />
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Skeleton className="h-20 bg-muted w-full" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Réseaux sociaux</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="flex items-center rounded-lg bg-accent px-2 py-1"
                >
                  <Skeleton className="w-6 bg-muted h-6 rounded-full" />
                  <div className="flex-1 m-1">
                    <Skeleton className="h-8 bg-muted w-full" />
                  </div>
                  {isEditing && (
                    <div className="space-x-1">
                      <Switch />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:text-red-300 hover:bg-red-400/10"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            {isEditing && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  className="w-full bg-white/20 hover:bg-white/30"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un réseau social
                </Button>
              </motion.div>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}

