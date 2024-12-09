'use client'
import React from 'react'
import UserLink from '../link-page/user-links/user-link'

interface LinkInBioPreviewProps {

}

export const LinkInBioPreview: React.FC<LinkInBioPreviewProps> = ({ }) => {
  return (
    <div>
      <UserLink isPreview pseudo='rafien' />
    </div>
  )
}


