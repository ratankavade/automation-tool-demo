import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import TestCasesList from '../../components/TestCasesList'

export const Route = createFileRoute('/testCases/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <TestCasesList />
}
