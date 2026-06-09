import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { SiteLayout } from './layouts/SiteLayout'
import { HomePage } from './pages/HomePage'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="vision" element={<Navigate to="/#synect" replace />} />
          <Route path="orion" element={<Navigate to="/#orion-catalog" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
