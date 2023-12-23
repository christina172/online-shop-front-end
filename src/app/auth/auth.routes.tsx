import React, { FC, PropsWithChildren, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

const Suspended: FC<PropsWithChildren & { element: any }> = ({ element: Element }) => {
  return (
    <Suspense fallback={<div />}>
      <Element />
    </Suspense>
  );
};

// ============== Pages ==============
const SignUpPageView = React.lazy(() => import("app/auth/signup-view.page"));
const LoginPageView = React.lazy(() => import("app/auth/login-view.page"));
const LogoutPageView = React.lazy(() => import("app/auth/logout-view.page"));

const AuthRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/sign_up"} element={<Suspended element={SignUpPageView} />} />
      <Route path={"/log_in"} element={<Suspended element={LoginPageView} />} />
      <Route path={"/log_out"} element={<Suspended element={LogoutPageView} />} />
      <Route path={"/"} element={<Suspended element={LoginPageView} />} />

      {/* DEFAULT */}
      <Route path='*' element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AuthRoutes;