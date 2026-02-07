import HomepagePage from './pages/HomepagePage'
import MenuPage from './pages/MenuPage'
import ReviewsPage from './pages/ReviewsPage'
import Universal404Page from './components/404-pages/universal404Page'
import CaterRequestInformation from './components/pageInformation/caterRequestInformation'
import { Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Routes>
      {/**New routes */}
      <Route path="/" element={<HomepagePage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/catering-request" element={<CaterRequestInformation />} />
      <Route path="/review-page" element={<ReviewsPage />} />
      <Route path="*" element={<Universal404Page />} />
    </Routes>
  )
}

export default App
