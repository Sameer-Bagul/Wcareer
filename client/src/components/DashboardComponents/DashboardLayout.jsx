import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isSidebarCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out 
          ${isSidebarCollapsed ? "ml-16" : "ml-16 md:ml-56"}`}
      >
        <Header />
        <div className="flex-1 overflow-y-auto p-4 bg-purple-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
