import React, { Fragment } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  return (
    <React.Fragment>
      <Routes>
        {loading === false && (
          <Route
            {...rest}
            render={(props) => {
              if (isAuthenticated === false) {
                return <Navigate to="/login" />;
              }

              if (isAdmin === true && user.role !== "admin") {
                return <Navigate to="/" />;
              }

              return <Component {...props} />;
            }}
          />
        )}
      </Routes>
    </React.Fragment>
  );
};

export default ProtectedRoute;
