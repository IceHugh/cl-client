import { Routes, Route } from 'react-router'
import Index from '@/pages'

export function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Index />} />
    </Routes>
  )
}
