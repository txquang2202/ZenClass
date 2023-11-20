import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "./routes";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="Container">
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            // const Layout = route.isShowHeader ? DefaultLayout : Fragment;
            const Protect = route.isProtected ? ProtectedRoute : Fragment;

            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

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
