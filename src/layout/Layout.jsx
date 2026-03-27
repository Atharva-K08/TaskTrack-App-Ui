import React from "react";
import ProfilePage from "../pages/user/ProfilePage";
import NavBar from "../components/common/NavBar";
import { useNavigate } from "react-router-dom";

function Layout({ children }) {
  const navigator = useNavigate();
  const clickHandler = (route) => {
    navigator(route);
  };
  return (
    <div className="container-fliud">
      <div className="row">
        <div className="col">
          <NavBar />
        </div>
      </div>
      <div className="row" style={{ minHeight: "100vh" }}>
        <div className="col-2 bg-primary-subtle">
          <div className="row">
            <div className="col-12">
              <div className="card p-2 m-2" role="button" onClick={() => clickHandler("/")}>
                Dashboard
              </div>
            </div>
            <div className="col-12">
              <div className="card p-2 m-2" role="button" onClick={() => clickHandler("/students")}>
                Students
              </div>
            </div>
            <div className="col-12">
              <div className="card p-2 m-2" role="button" onClick={() => clickHandler("/teachers")}>
                Teachers
              </div>
            </div>
            <div className="col-12">
              <div className="card p-2 m-2" role="button" onClick={() => clickHandler("/batches")}>
                Batches
              </div>
            </div>
          </div>
        </div>
        <div className="col-10 bg-danger-subtle">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
