import React, { FC, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

const PrivateRoute: FC<{ element: any }> = ({ element: Element }) => {
  return localStorage.getItem('os_access_token') ? (
    <Suspense fallback={<div />}>
      <div><Element /></div>
    </Suspense>
  ) : (
    <Navigate to={"/auth/log_in"} />
  );
};

const PublicRoute: FC<{ element: any }> = ({ element: Element }) => (
  <Suspense fallback={<div />}>
    <Element />
  </Suspense>
);

// ============== Pages ==============
const UserPage = React.lazy(() => import("app/user"));
const AuthPage = React.lazy(() => import("app/auth"));
const ProductsPage = React.lazy(() => import("app/products"));


const AppRoutes = () => {
  return (
    <Routes>
      <Route path={"/user/*"} element={<PrivateRoute element={UserPage}/>}/>

      <Route path={"/auth/*"} element={<PublicRoute element={AuthPage}/>}/>
      <Route path={"/products/*"} element={<PublicRoute element={ProductsPage}/>}/>

      {/* DEFAULT */}
      <Route path='*' element={<Navigate to="/products?page=1"/>}/>
    </Routes>
  );
};

export default AppRoutes;