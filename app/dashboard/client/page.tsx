import React from 'react'
import { columns } from '@/components/client/client-table/columns'
import { ClientDataTable } from '@/components/client/client-table/client-data-table'
import PageContainer from '@/components/layout/page-container'

const page = () => {
  return (
    <PageContainer>
      <ClientDataTable columns={columns} />
    </PageContainer>
  )
}

export default page