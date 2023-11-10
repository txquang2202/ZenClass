import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "./routes";
import Default from "./components/Default";
import ProtectedRoute from "./routes/ProtectedRoute";
//import AdminRoutes from "./routes/AdminRoutes";
//import UserRoutes from "./routes/UserRoutes";

function App() {
  return (
    <Router>
      {/* <Sidebar /> */}
      <div className="Container">
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? Default : Fragment;
            const Protect = route.isProtected ? ProtectedRoute : Fragment;
            return (
              <Route
                path={route.path}
                element={
                  <Layout>
                    <Protect>
                      <Page />
                    </Protect>
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
