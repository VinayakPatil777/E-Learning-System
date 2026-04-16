import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/common/AdminNavbar";

const AdminLayout = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <AdminNavbar />

      <main className="flex-grow-1">
        <Outlet />
      </main>

      {/* Optional Admin Footer could go here */}
    </div>
  );
};

export default AdminLayout;
