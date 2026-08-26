import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import AdminLayout from './layout/AdminLayout'
import CheckoutLayout from './layout/CheckoutLayout'
import EmptyLayout from './layout/EmptyLayout'
import RequireAdmin from './guards/RequireAdmin'
import PageLoader from '../components/feedback/PageLoader'
import MaintenancePage from '../components/feedback/MaintenancePage'
import { useBanners } from '../hooks/useBanners'
import '../App.css'

// Every page is code-split so only the page being visited is downloaded
const HomepagePage = lazy(() => import('../pages/HomepagePage'))
const MenuPage = lazy(() => import('../pages/MenuPage'))
const ReviewsPage = lazy(() => import('../pages/ReviewsPage'))
const CaterPage = lazy(() => import('../pages/CaterPage'))
const SignInPage = lazy(() => import('../pages/SignInPage'))
const CartPage = lazy(() => import('../pages/CartPage'))
const CheckoutPage = lazy(() => import('../pages/CheckoutPage'))
const Universal404Page = lazy(() => import('../components/feedback/universal404Page'))
const CaterRequestInformation = lazy(() => import('../features/home/components/caterRequestInformation'))
const CoffeeMenuPage = lazy(() => import('../pages/CoffeeMenuPage'))
const LunchMenuPage = lazy(() => import('../pages/LunchMenuPage'))
const FridgeMenuPage = lazy(() => import('../pages/FridgeMenuPage'))
const AdminDashboardPage = lazy(() => import('../features/admin/pages/AdminDashboardPage'))
const AdminMenuPage = lazy(() => import('../features/admin/pages/AdminMenuPage'))
const AdminOrdersPage = lazy(() => import('../features/admin/pages/AdminOrdersPage'))
const AdminReviewsPage = lazy(() => import('../features/admin/pages/AdminReviewsPage'))
const AdminCateringPage = lazy(() => import('../features/admin/pages/AdminCateringPage'))
const AdminBannersPage = lazy(() => import('../features/admin/pages/AdminBannersPage'))
const AdminSettingsPage = lazy(() => import('../features/admin/pages/AdminSettingsPage'))

function App() {
  const { maintenanceBanner, loading } = useBanners()
  const location = useLocation()
  const isExemptFromMaintenance = location.pathname.startsWith('/admin') || location.pathname === '/sign-in'

  if (!loading && maintenanceBanner && !isExemptFromMaintenance) {
    return <MaintenancePage message={maintenanceBanner.message} />
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomepagePage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="menu/coffee" element={<CoffeeMenuPage />} />
          <Route path="menu/lunch" element={<LunchMenuPage />} />
          <Route path="menu/fridge" element={<FridgeMenuPage />} />
          <Route path="catering-request" element={<CaterRequestInformation />} />
          <Route path="catering-page" element={<CaterPage />} />
          <Route path="review-page" element={<ReviewsPage />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="cart" element={<CartPage />} />
        </Route>

        <Route path="/checkout" element={<CheckoutLayout />}>
          <Route index element={<CheckoutPage />} />
        </Route>

        <Route path="/admin" element={<RequireAdmin />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="menu" element={<AdminMenuPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="reviews" element={<AdminReviewsPage />} />
            <Route path="catering" element={<AdminCateringPage />} />
            <Route path="banners" element={<AdminBannersPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>
        </Route>

        <Route element={<EmptyLayout />}>
          <Route path="*" element={<Universal404Page />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App