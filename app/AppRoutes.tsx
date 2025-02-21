import { Routes, Route } from 'react-router'
import CreatePage from '@/pages/create'
import ManagePage from '@/pages/manager'
import PortfolioPage from '@/pages/portfolio'

export function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<CreatePage />} />
      <Route path='/manage' element={<ManagePage />} />
      <Route path='/portfolio' element={<PortfolioPage />} />
    </Routes>
  )
}
