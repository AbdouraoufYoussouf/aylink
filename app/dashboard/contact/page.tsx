import { columns } from '@/components/contact/contact-table/columns'
import { ContactDataTable } from '@/components/contact/contact-table/contact-data-table'
import PageContainer from '@/components/layout/page-container'
import React from 'react'

const page = () => {
  return (
    <PageContainer>
      <ContactDataTable columns={columns} />
    </PageContainer>
  )
}

export default page