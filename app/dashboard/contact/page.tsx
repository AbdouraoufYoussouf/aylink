import { columns } from '@/components/contact/contact-table/columns'
import { ContactDataTable } from '@/components/contact/contact-table/contact-data-table'
import React from 'react'

const page = () => {
  return (
    <ContactDataTable columns={columns}/>
  )
}

export default page