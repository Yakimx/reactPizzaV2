import React, { Suspense } from "react";
import "./App.css";
import "./scss/app.scss";

import Home from "./components/pages/Home";
import MainLayout from "./layouts/MainLayout";

import { Routes, Route } from "react-router-dom";

const Cart = React.lazy(()=>import('./components/pages/Cart'));
const NotFound = React.lazy(()=>import('./components/pages/NotFound'));
const FullPizza = React.lazy(()=>import('./components/pages/FullPizza'));
//test
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
      <Route path="" element={<Home />} />
        
        <Route path="cart" element={
        <Suspense fallback={<div>Загрузка...</div>}>
        <Cart />
        </Suspense>
        } />

        <Route path="pizza/:id" element={
        <Suspense fallback={<div>Загрузка...</div>}>
        <FullPizza />
        </Suspense>} />  

        <Route path="*" element={
        <Suspense fallback={<div>Загрузка...</div>}>
        <NotFound />
        </Suspense>        
        } />
        
      </Route>
    </Routes>
  );
}

export default App;
