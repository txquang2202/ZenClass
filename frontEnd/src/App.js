import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import routes from "./routes";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import CreateRouter from "./routes/CreateRouter";




function App() {
  const routes = CreateRouter();
  return (
    <>
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
                      <Protect roleRequired={route.roleRequired}>
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
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
