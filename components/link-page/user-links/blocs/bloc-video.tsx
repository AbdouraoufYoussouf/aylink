'use client'

import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {ArrowRight } from 'lucide-react'
import { VideoSubBlocType } from '@/src/types/bloc-type'
import { Button } from '@/components/ui/button'
import { GetUserInfosIptv } from '@/components/forms/iptv-get-contact-infos'
import { BlocUrlOption } from './bloc-url-option'

type Props = {
    subBloc: VideoSubBlocType
    isAdmin?: boolean
}

export const BlocVideo = ({ subBloc, isAdmin }: Props) => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <Card className="overflow-hidden hover:bg-muted border bg-background text-primary-foreground">
            <CardContent className="p-0">
                {/* <Suspense fallback={<p>Loading video...</p>}> */}
                {
                    subBloc.videoUrl &&
                    <video className='rounded-md border-sky-400'
                        poster={subBloc.thumbnailUrl} width={1000} height={250} controls controlsList='nodownload' >
                        <source src={subBloc.videoUrl} type='video/mp4' />
                    </video>
                }
                {/* </Suspense> */}
                <div className="p-2">
                    <h3 className="leading-4 font-semibold mb-2 text-left">{subBloc.title}</h3>
                    <p className="text-sm leading-4 text-accent-foreground text-left">{subBloc.description}</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} className='h-8 w-full relative group rounded-none'>En savoir plus
                    <ArrowRight
                        className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                    />
                </Button>

                <div className='w-8'>
                    {isAdmin &&
                        <BlocUrlOption subBloc={subBloc} />
                    }
                </div>
            </CardContent>
            <GetUserInfosIptv isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </Card>
    )
}

