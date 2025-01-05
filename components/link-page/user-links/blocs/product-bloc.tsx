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
        <div className="relative flex items-center justify-center flex-col space-y-3 overflow-hidden">
            <h1 className='text-lg font-bold'>Nos offres</h1>
            <Carousel
                setApi={setApi}
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full max-w-sm"
            >
                <CarouselContent className="-ml-1 flex items-center justify-center">
                    {products.map((product, index) => (
                        <CarouselItem
                            key={index}
                            onClick={() => handleLinkClick(product.actionUrl)}
                            className="pl-1 basis-1/3 cursor-pointer "
                        >
                            <Card className={cn(
                                "relative border rounded-md border-accent-foreground inset-0 transform transition duration-500 hover:bg-muted overflow-hidden",
                                product.popular? "border-blue-500":"",
                            )}>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    {product.imageUrl && (
                                        <Image
                                            src={product.imageUrl}
                                            alt={product.name}
                                            layout="fill"
                                            objectFit="cover"
                                            className="  opacity-50 hover:opacity-100"
                                        />
                                    )}
                                    {product.popular && (
                                        <div className="absolute hidden right-0 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-bold">
                                            Populaire
                                        </div>
                                    )}
                                    <div className="absolute -bottom-1 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                                        {/* <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{product.name}</h2> */}
                                        <p className="text-sm md:text-base leading-4 mb-2 text-white">{product.description}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm md:text-base text-white text-center font-bold">
                                                {product.price}€
                                            </span>
                                        <p className="text-[11px] text-white lowercase">{product.duration}</p>
                                            {/* <Badge className="text-sm md:text-base text-white">{product.duration}</Badge> */}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* <div className="mt-4 flex items-center justify-center gap-2">
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
                <CarouselNext className="hidden md:flex absolute top-1/2 right-2 -translate-y-1/2 bg-amber-500 text-white hover:bg-amber-600" /> */}
            </Carousel>
        </div>
    )
}

