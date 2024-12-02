'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ThemeToggle } from '@/components/theme/theme-toggle'

export default function UserLinkSkeleton() {
  return (
    <div className="min-h-screen relative md:m-4 flex flex-col items-center">
      <header className="absolute top-0 right-0 z-10 m-2">
        <ThemeToggle />
      </header>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg border border-purple-950 sm:rounded-lg shadow-xl overflow-hidden"
      >
        <div className="relative h-40">
          <Skeleton className="bg-muted h-full w-full" />
          <Skeleton className="bg-muted w-28 h-28 rounded-full absolute -bottom-14 left-1/2 transform -translate-x-1/2" />
        </div>
        <div className="p-4 text-center mt-16">
          <div className="">
            <Skeleton className="bg-muted h-6 w-40 mx-auto mb-2" />
            <Skeleton className="bg-muted h-4 w-full mb-4" />

            <div className="flex justify-center space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Skeleton key={index} className="w-8 h-8 rounded-full" />
              ))}
            </div>

            <div className="space-y-4">
              {[1, 2].map((categoryIndex) => (
                <div key={categoryIndex}>
                  <Skeleton className="bg-muted h-6 w-40 mb-2" />
                  <div className="space-y-2">
                    {[1, 2, 3].map((blockIndex) => (
                      <Card key={blockIndex} className="overflow-hidden">
                        <CardContent className="p-2 flex items-center">
                          <Skeleton className="bg-muted w-12 h-12 rounded mr-3" />
                          <div className="flex-grow">
                            <Skeleton className="bg-muted h-4 w-3/4 mb-2" />
                            <Skeleton className="bg-muted h-3 w-full" />
                          </div>
                          <Skeleton className="bg-muted w-4 h-4 ml-auto" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

