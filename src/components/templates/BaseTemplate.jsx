import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";

import Footer from "../organisms/Footer";

export default function BaseTemplate({ children }) {
  return (
    <div className="font-inter container relative bg-light dark:bg-dark w-screen h-[85vh]">
      <div className="h-full relative bg-slate-200 z-10 backdrop-blur backdrop-blur-lg opacity-80">
        <Outlet />
      </div>
    </div>
  );
}
