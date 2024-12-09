"use client"

import GetUserInfos from '@/components/forms/get-contact-infos'
import { Card, CardContent } from '@/components/ui/card'
import { UrlSubBlocType } from '@/src/types/block-type'
import { ExternalLink, Lock } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type Props = {
    subBloc: UrlSubBlocType,
}

type Contact = {
    name: string,
    email: string,
    pseudo: string
}
export const BlocUrl = ({ subBloc }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentLink, setCurrentLink] = useState('')


    const [userInfo, setUserInfo] = useState<Contact>()

    useEffect(() => {
        const storedInfo = localStorage.getItem('userInfo')
        if (storedInfo) {
            setUserInfo(JSON.parse(storedInfo))
        }
    }, [])

    const handleLinkClick = (bloc: UrlSubBlocType) => {
        if (bloc.isPrivate) {

            if (userInfo?.email) {
                window.open(bloc.url, '_blank')
            } else {
                setCurrentLink(bloc.url)
                setIsModalOpen(true)
            }
        } else {
            window.open(bloc.url, '_blank')
        }
    }


    const handleUserInfoUpdate = (newUserInfo: Contact) => {
        setUserInfo(newUserInfo)
        localStorage.setItem('userInfo', JSON.stringify(newUserInfo))
    }

    return (
        <Card className="overflow-hidden hover:bg-muted border bg-background text-primary-foreground ">
            <CardContent className="p-0">
                <button
                    onClick={() => handleLinkClick(subBloc)}
                    className="w-full p-2 text-left relative transition-colors duration-200 flex items-center justify-between"
                >
                    <div className="flex items-center relative space-x-2">
                        {
                            subBloc.imageUrl &&
                            <Image
                                width={48}
                                height={48}
                                src={subBloc.imageUrl}
                                alt={subBloc.title}
                                className="w-12 h-12 rounded mr-1 object-cover"
                            />
                        }
                        <div className='space-y-1'>
                            <h3 className="font-semibold gap-1 leading-4 flex ">
                                {subBloc.title}
                            </h3>
                            <p className="text-sm leading-4 text-accent-foreground">{subBloc.description}</p>
                        </div>

                    </div>
                    <div className='w-8 flex flex-col gap-3  items-end justify-end'>
                        {subBloc.isPrivate && !userInfo?.email && <Lock className="w-3 h-3 mr-0.5 text-red-500" />}
                        <ExternalLink className="w-4 h-4 " />
                    </div>
                </button>
            </CardContent>
            <GetUserInfos
                onUserInfoUpdate={handleUserInfoUpdate}
                currentLink={currentLink} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
            />
        </Card>)
}
