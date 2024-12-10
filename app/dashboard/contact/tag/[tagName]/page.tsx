import { columns } from '@/components/contact/contact-table/columns';
import { ContactDataTable } from '@/components/contact/contact-table/contact-data-table';
import PageContainer from '@/components/layout/page-container';
import React from 'react'

export default async function TagPage({ params }: { params: { tagName: string } }) {
  const tag = params.tagName;

  return (
     <PageContainer>
      <ContactDataTable tag={tag} columns={columns} />
    </PageContainer>
  )
}

