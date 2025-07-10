import { createFileRoute } from '@tanstack/react-router'
import NewTestCase from '../../components/NewTestCase'
import React from 'react'

export const Route = createFileRoute('/testCases/addTestCase')({
  component: RouteComponent,
})

function RouteComponent() {
  return <NewTestCase />
}
