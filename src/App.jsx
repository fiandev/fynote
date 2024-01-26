import Router from "./Router";
import { GlobalThemeProvider } from "./hooks/useTheme";
import "./assets/css/base.css";

export default function App() {
  return (
    <div className=" bg-slate-300 flex flex-col items-center w-full">
      <div className="container w-full md:w-w-3/4 lg:w-3/4 md:mx-auto h-screen">
        <GlobalThemeProvider>
          <Router />
        </GlobalThemeProvider>

      </div>
    </div>
  );
}
