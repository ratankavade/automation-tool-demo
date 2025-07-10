import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <h1 className='text-2xl mb-2'>Dashboard</h1>
  </div>
}
