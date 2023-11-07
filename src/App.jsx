import "./App.css";
import { Auth } from "./pages/auth/index";
import { Home } from "./pages/home/index";
import { BrowserRouter as Router } from "react-router-dom";
import { Savings } from "./pages/savings";
import Footer from "./pages/home/components/footer";
import AnimatedRoutes from "./components/AnimatedRoutes";
function App() {
  return (
    <div className="App">
      <Router>
        <AnimatedRoutes />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
