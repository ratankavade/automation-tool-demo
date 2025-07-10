import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import Configurations from '../../components/Configurations'

export const Route = createFileRoute('/configuration/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Configurations />
}
