// EmptyLayout.jsx — bare shell with no navbar/footer chrome (e.g. 404, standalone screens)
import { Outlet } from "react-router-dom";

export default function EmptyLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-500 via-purple-500 to-purple-700">
      <Outlet />
    </div>
  );
}
