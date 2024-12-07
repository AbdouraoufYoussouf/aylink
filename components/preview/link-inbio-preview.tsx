'use client'
import React from 'react'
import UserLinkPreviw from './link-inbio/user-link-previw'

interface LinkInBioPreviewProps {

}

export const LinkInBioPreview: React.FC<LinkInBioPreviewProps> = ({ }) => {
  return (
    <div>
      <UserLinkPreviw pseudo='rafien' />
    </div>
  )
}


