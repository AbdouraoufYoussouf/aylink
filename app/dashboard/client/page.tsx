import React from 'react'
import { columns } from '@/components/client/client-table/columns'
import { ClientDataTable } from '@/components/client/client-table/client-data-table'

const page = () => {
  return (
    <ClientDataTable columns={columns}/>
  )
}

export default page