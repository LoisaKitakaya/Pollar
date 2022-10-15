import { Routes, Route } from "react-router-dom";

import Console from "./pages/app/Console";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/site/Home";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/app/console/" element={<Console />} />
      <Route path="/auth/signup/" element={<SignUp />} />
      <Route path="/auth/signin/" element={<SignIn />} />
    </Routes>
  );
};

export default App;
