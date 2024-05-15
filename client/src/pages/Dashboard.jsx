import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../Components/DashSidebar";
import DashProfile from "../Components/DashProfile";
import DashPosts from "../Components/DashPosts";
import DashUsers from "../Components/DashUsers";
import DashComment from "../Components/DashComment";
import DashboardComp from "./DashboardComp";
const Dashboard = () => {
  const location = useLocation();
  console.log(location, "LOCATION");
  const [tab, settab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    console.log(tabFromUrl, "TAB");
    if (tabFromUrl) {
      settab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* sidebar */}
        <DashSidebar />
      </div>

      {/* profile */}
      {tab === "profile" && <DashProfile />}
      {tab === "posts" && <DashPosts />}
      {tab === "users" && <DashUsers />}
      {tab === "comments" && <DashComment />}
      {tab === "dash" && <DashboardComp />}
    </div>
  );
};

export default Dashboard;
