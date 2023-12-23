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
const OrderHistoryPageView = React.lazy(() => import("app/orders/order-history-view.page"));
const CartPageView = React.lazy(() => import("app/cart/cart-view.page"));

const OrdersRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/cart"} element={<Suspended element={CartPageView} />} />
      <Route path={"/order_history"} element={<Suspended element={OrderHistoryPageView} />} />

      {/* DEFAULT */}
      <Route path='*' element={<Navigate to="/cart" />} />
    </Routes>
  );
};

export default OrdersRoutes;