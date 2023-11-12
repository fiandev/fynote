import { Suspense, lazy } from "react";
import {
  BrowserRouter as ReactRouter,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import BaseTemplate from "./components/templates/BaseTemplate";

const Home = lazy(() => import("./components/pages/Home"));
const CreateNote = lazy(() => import("./components/pages/CreateNote"));
const ShowNote = lazy(() => import("./components/pages/ShowNote"));
const ImportNote = lazy(() => import("./components/pages/ImportNote"));

const SuspenseLayout = () => (
  <Suspense>
    <Outlet />
  </Suspense>
);

export default function Router() {
  return (
    <ReactRouter>
      <Routes>
        <Route element={<SuspenseLayout />}>
          <Route element={<BaseTemplate />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/create" element={<CreateNote />} />
            <Route path="/import" element={<ImportNote />} />
            <Route path="/note/:noteID" element={<ShowNote />} />
          </Route>
        </Route>
      </Routes>
    </ReactRouter>
  );
}
