import { Navigate, Route, Routes } from "react-router-dom";
import Apartment from "./pages/apartment/Apartment";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import Renter from "./pages/renter/Renter";
import Transaction from "./pages/transaction/Transaction";
import PrivateRoute from "./utility/PrivateRoute";
import Authentication from "./pages/authentication/Authentication";
import PublicRoute from "./utility/PublicRoute";
import Conversation from "./pages/message/pages/Conversation";
import Inbox from "./pages/message/pages/Inbox";
import withPullToRefresh from "./utility/withPullToRefresh";
import { useState } from "react";
import PullToRefresh from "react-pull-to-refresh";

const AppRoutes = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const PullDownIcon = () => (
    <div>
      <span>Pull down to refresh</span>
    </div>
  );

  const ReleaseIcon = () => (
    <div>
      <span>Release to refresh</span>
    </div>
  );

  function onRefresh() {
    setIsRefreshing(true);

    // Make API calls or other asynchronous tasks here to fetch new data
    window.location.reload();
    // setTimeout(() => {
    //   window.location.reload();
    // }, 2000); // Simulate a delay for the API calls
  }

  return (
    <div className="body_container">
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              {" "}
              <Dashboard />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/apartment"
          element={
            <PrivateRoute>
              {" "}
              <Apartment />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/renter"
          element={
            <PrivateRoute>
              {" "}
              <Renter />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/transaction"
          element={
            <PrivateRoute>
              {" "}
              <Transaction />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/inbox"
          element={
            <PrivateRoute>
              <PullToRefresh onRefresh={onRefresh} refreshing={isRefreshing}>
                <Conversation />
              </PullToRefresh>
            </PrivateRoute>
          }
        />
        <Route
          path="/inbox/:id"
          element={
            <PrivateRoute>
              <Inbox />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              {" "}
              <Profile />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/auth"
          element={
            <PublicRoute>
              {" "}
              <Authentication />{" "}
            </PublicRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
