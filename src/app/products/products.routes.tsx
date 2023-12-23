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
const ProductsPageView = React.lazy(() => import("app/products/products-view.page"));
const ProductPageView = React.lazy(() => import("app/products/product-view.page"));

const ProductsRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Suspended element={ProductsPageView} />} />
      <Route path={"/:productId"} element={<Suspended element={ProductPageView} />} />

      {/* DEFAULT */}
      <Route path='*' element={<Navigate to="/?page=1" />} />
    </Routes>
  );
};

export default ProductsRoutes;