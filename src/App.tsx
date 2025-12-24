import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout";
import Home from "./pages/Home/home";
import Signin from "./pages/Auth/signin";
import Signup from "./pages/Auth/signup";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </>
  );
}

export default App;
