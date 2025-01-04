'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from 'lucide-react'
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

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = false; // Assurez-vous que la vidéo est silencieuse
            videoRef.current.play().catch((err: any) => {
                console.error('Autoplay failed:', err);
            });
        }
    }, []);
    
    const handleLinkClick = () => {
        if(subBloc.actionType==="URL"){
            window.open(subBloc.actionUrl, '_blank')
        }else{
            setIsModalOpen(true)
        }
    }

        // Handle video click for play/pause toggle
        const togglePlayPause = () => {
            if (videoRef.current) {
                if (videoRef.current.paused) {
                    videoRef.current.play();
                } else {
                    videoRef.current.pause();
                }
            }
        };

    return (
        <Card className="overflow-hidden hover:bg-muted border bg-background text-primary-foreground">
            <CardContent className="p-0">
                {/* <Suspense fallback={<p>Loading video...</p>}> */}
                {
                    subBloc.videoUrl &&
                    <video className='rounded-md border-sky-400'
                    ref={videoRef}
                        poster={subBloc.thumbnailUrl} width={1000} height={250} 
                        autoPlay
                        loop
                        controls
                        playsInline
                        onClick={togglePlayPause}
                        controlsList='nodownload' >
                        <source src={subBloc.videoUrl} type='video/mp4' />
                    </video>
                }
                {/* </Suspense> */}
                <div className="p-2">
                    <h3 className="leading-4 font-semibold mb-2 text-left">{subBloc.title}</h3>
                    <p className="text-sm leading-4 text-accent-foreground text-left">{subBloc.description}</p>
                </div>
                <Button onClick={handleLinkClick} className='h-8 w-full relative group rounded-none'>En savoir plus
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

