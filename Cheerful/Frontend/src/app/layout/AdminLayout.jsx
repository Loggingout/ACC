// AdminLayout.jsx — sidebar + header shell for /admin/* routes
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../features/admin/components/AdminSidebar";
import AdminHeader from "../../features/admin/components/AdminHeader";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-orange-500 via-purple-500 to-purple-700">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 px-4 sm:px-6 md:px-8 py-6 sm:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
