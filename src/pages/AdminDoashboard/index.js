import React, { useState, useEffect, useCallback } from "react";
import SidebarAdmin from "./sidebar";
import AdminDoashboard from "./doashboard";
import AlgorithmNeighBase from "./algorithm/neighbor-hood-base";
import AlgorithmContentBase from "./algorithm/content-base";

const AdminDoashBoardManager = () => {
  const [useroption, setUserOption] = useState("admindoashboard");
  const [dropdownDashboardOpen, setDropdownDashboardOpen] = useState(false);

  return (
    <div className="w-full h-auto bg-white">
      <div className="flex">
        <side className="max-w-screen-md ">
          <SidebarAdmin
            useroption={setUserOption}
            setDropdownDashboardOpen={setDropdownDashboardOpen}
          />
        </side>
        <div className="w-full h-auto">
          {useroption === "admindoashboard" && <AdminDoashboard />}
          {useroption === "algorithm-neighbor" && <AlgorithmNeighBase />}
          {useroption === "algorithm-content" && <AlgorithmContentBase />}
        </div>
      </div>
    </div>
  );
};
export default AdminDoashBoardManager;
