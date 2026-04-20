import { createElement, FC, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./Navigator.data";
import Layout from "@/layouts/layout";

const Navigator: FC = () => (
  <Suspense fallback={"Loading..."}>
    <BrowserRouter>
      <Layout>
        <Routes>
          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          {privateRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          <Route
            path="*"
            element={createElement(
              lazy(async () => await import("@/pages/NotFound"))
            )}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  </Suspense>
);

export default Navigator;
