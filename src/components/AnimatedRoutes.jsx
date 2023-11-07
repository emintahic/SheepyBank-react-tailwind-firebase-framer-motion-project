import { Route, Routes, useLocation } from "react-router-dom";
import { Auth } from "../pages/auth";
import { Home } from "../pages/home/index";
import { Savings } from "../pages/savings";
import { AnimatePresence } from "framer-motion";
export default function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" exact element={<Auth />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/savings" exact element={<Savings />} />
      </Routes>
    </AnimatePresence>
  );
}
