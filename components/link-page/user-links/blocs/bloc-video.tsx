'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, ArrowRight } from 'lucide-react';
import { VideoSubBlocType } from '@/src/types/block-type';
import { Button } from '@/components/ui/button';
import { GetUserInfosIptv } from '@/components/forms/iptv-get-contact-infos';
import { LoadingSpinner } from '@/components/loading-spinner';

type Props = {
    subBloc: VideoSubBlocType
}

export const BlocVideo = ({ subBloc }: Props) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isControlsVisible, setIsControlsVisible] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isBuffering, setIsBuffering] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Preload metadata only initially
        video.preload = "metadata";
        
        const handleLoadedMetadata = () => {
            setIsLoading(false);
        };

        const handleWaiting = () => {
            setIsBuffering(true);
        };

        const handlePlaying = () => {
            setIsBuffering(false);
        };

        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('waiting', handleWaiting);
        video.addEventListener('playing', handlePlaying);

        return () => {
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('waiting', handleWaiting);
            video.removeEventListener('playing', handlePlaying);
        };
    }, []);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const togglePlay = async () => {
        if (videoRef.current) {
            try {
                if (isPlaying) {
                    await videoRef.current.pause();
                } else {
                    // Switch to full quality when playing
                    videoRef.current.preload = "auto";
                    await videoRef.current.play();
                }
                setIsPlaying(!isPlaying);
            } catch (error) {
                console.error('Error toggling play state:', error);
            }
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleProgress = () => {
        if (videoRef.current) {
            const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(progress);
        }
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        if (videoRef.current) {
            const rect = e.currentTarget.getBoundingClientRect();
            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            const x = clientX - rect.left;
            const seekTime = (x / rect.width) * videoRef.current.duration;
            videoRef.current.currentTime = seekTime;
        }
    };

    const toggleFullScreen = () => {
        if (containerRef.current) {
            if (!document.fullscreenElement) {
                containerRef.current.requestFullscreen?.();
            } else {
                document.exitFullscreen?.();
            }
        }
    };

    const handleTouchStart = () => {
        setIsControlsVisible(true);
    };

    const handleTouchEnd = () => {
        setTimeout(() => setIsControlsVisible(false), 3000);
    };

    return (
        <Card className="overflow-hidden hover:bg-muted border bg-background text-primary-foreground">
            <CardContent className="p-0">
                <div
                    ref={containerRef}
                    className="relative"
                    onMouseEnter={() => setIsControlsVisible(true)}
                    onMouseLeave={() => setIsControlsVisible(false)}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {(isLoading || isBuffering) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                            <LoadingSpinner />
                        </div>
                    )}
                    <video
                        ref={videoRef}
                        className="w-full cursor-pointer"
                        onTimeUpdate={handleProgress}
                        poster={subBloc.thumbnailUrl}
                        onClick={togglePlay}
                        playsInline // Enables inline playback on iOS
                    >
                        {subBloc.videoUrl && (
                            <source 
                                src={subBloc.videoUrl} 
                                type="video/mp4"
                            />
                        )}
                        Your browser does not support the video tag.
                    </video>
                    {!isPlaying && !isLoading && (
                        <button
                            onClick={togglePlay}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-4 text-white focus:outline-none"
                        >
                            <Play size={30} />
                        </button>
                    )}
                    <div 
                        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 transition-opacity duration-300 ${
                            isControlsVisible || !isPlaying ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <div className="flex items-center justify-between text-white">
                            <button onClick={togglePlay} className="focus:outline-none">
                                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                            </button>
                            <div className="flex-grow mx-4">
                                <div
                                    className="h-1 bg-gray-600 rounded-full cursor-pointer"
                                    onClick={handleSeek}
                                    onTouchStart={handleSeek}
                                >
                                    <div
                                        className="h-full bg-primary rounded-full"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={toggleMute} className="focus:outline-none">
                                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                                </button>
                                <button onClick={toggleFullScreen} className="focus:outline-none">
                                    {isFullscreen ? <Minimize size={17} /> : <Maximize size={17} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-2">
                    <h3 className="leading-4 font-semibold mb-2 text-left">{subBloc.title}</h3>
                    <p className="text-sm leading-4 text-accent-foreground text-left">{subBloc.description}</p>
                </div>
                <Button 
                    onClick={() => setIsModalOpen(true)} 
                    className="h-8 w-full relative group rounded-none"
                >
                    En savoir plus
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
            </CardContent>
            <GetUserInfosIptv isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </Card>
    );
};