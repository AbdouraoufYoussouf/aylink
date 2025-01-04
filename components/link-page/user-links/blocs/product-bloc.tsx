"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ProductSubBlocType } from '@/src/types/bloc-type'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface ProductBlocProps {
    products: ProductSubBlocType[]
}

export const ProductBloc: React.FC<ProductBlocProps> = ({ products }) => {
    const [api, setApi] = React.useState<any>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    useEffect(() => {
        if (!api) return;

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    const handleLinkClick = (url?: string) => {
        if (url) {
            window.open(url, '_blank')
        }
    }

    return (
        <div className="relative w-full max-w-6xl mx-auto rounded-[20px] overflow-hidden">
            <Carousel
                setApi={setApi}
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-2 md:-ml-4 ">
                    {products.map((product, index) => (
                        <CarouselItem
                            key={index}
                            onClick={() => handleLinkClick(product.actionUrl)}
                            className={cn(
                                "pl-2 md:pl-4 ",
                                index === current ? "w-full" : "w-2/3 md:w-1/2 lg:w-1/3",
                                "transition-all duration-300 ease-in-out"
                            )}
                        >
                            <div className="relative w-full h-[200px]">
                                <Card className="absolute shadow-2xl border-accent-foreground border-2 inset-0 transform transition duration-500 hover:bg-muted overflow-hidden">
                                    <CardContent className="p-0 relative w-full h-full">
                                        {product.imageUrl && (
                                            <Image
                                                src={product.imageUrl}
                                                alt={product.name}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-t-lg opacity-50"
                                            />
                                        )}
                                        {product.popular && (
                                            <div className="absolute right-0 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-bold">
                                                Populaire
                                            </div>
                                        )}
                                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                                            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{product.name}</h2>
                                            <p className="text-sm md:text-base text-white mb-2">{product.description}</p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm md:text-base text-white font-bold">
                                                    {product.price} {product.currency}
                                                </span>
                                                <Badge className="text-sm md:text-base text-white">{product.duration}</Badge>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2">
                    {Array.from({ length: count }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => api?.scrollTo(index)}
                            className={cn(
                                "h-1.5 rounded-full transition-all",
                                index === current ? "w-6 bg-red-500" : "w-2 bg-muted-foreground"
                            )}
                        />
                    ))}
                </div>
                <CarouselPrevious className="hidden md:flex left-2 top-1/2 absolute -translate-y-1/2 bg-amber-500 text-white hover:bg-amber-600" />
                <CarouselNext className="hidden md:flex absolute top-1/2 right-2 -translate-y-1/2 bg-amber-500 text-white hover:bg-amber-600" />
            </Carousel>
        </div>
    )
}

