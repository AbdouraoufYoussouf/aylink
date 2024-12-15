"use client"

import GetUserInfos from '@/components/forms/get-contact-infos'
import { Card, CardContent } from '@/components/ui/card'
import { UrlSubBlocType } from '@/src/types/bloc-type'
import { ExternalLink, Lock } from 'lucide-react'
import Image from 'next/image'

import React, { useEffect, useState } from 'react'
import { BlocUrlOption } from './bloc-url-option'
import { Button } from '@/components/ui/button'

type Props = {
    subBloc: UrlSubBlocType,
    isAdmin?: boolean
}

type Contact = {
    name: string,
    email: string,
    pseudo: string,
}
export const BlocUrl = ({ subBloc, isAdmin }: Props) => {
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
        <Card className={`overflow-hidden border ${!isAdmin ? "hover:bg-muted" : ""} bg-background text-primary-foreground `}>
            <CardContent className="p-0">
                <div className='flex items-center mr-1.5'>
                    <div
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
                    </div>
                    <div className='w-8'>
                        {
                            isAdmin ?
                                <BlocUrlOption subBloc={subBloc} />
                                :
                                <div className='flex flex-col gap-3  items-end justify-end'>
                                    {subBloc.isPrivate && !userInfo?.email && <Lock className="w-3 h-3 mr-0.5 text-red-500" />}
                                    <ExternalLink className="w-4 h-4 " />
                                </div>
                        }
                    </div>
                </div>
            </CardContent>
            <GetUserInfos
                onUserInfoUpdate={handleUserInfoUpdate}
                currentLink={currentLink} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
            />
        </Card>)
}
