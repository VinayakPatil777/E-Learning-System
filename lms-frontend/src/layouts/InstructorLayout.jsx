import React from "react";
import { Outlet } from "react-router-dom";
import InstructorNavbar from "../components/common/InstructorNavbar";
import "./InstructorLayout.css";

const InstructorLayout = () => {
  return (
    <div className="instructor-layout bg-light min-vh-100 d-flex flex-column">
      <InstructorNavbar />

      {/* MAIN CONTENT */}
      <main className="content flex-grow-1">
        <Outlet />
      </main>
    </div>
  );
};

export default InstructorLayout;
