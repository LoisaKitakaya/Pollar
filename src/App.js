import { Routes, Route } from "react-router-dom";

import Console from "./pages/app/Console";
import Accounts from "./pages/auth/Accounts";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/site/Home";
import Intersection from "./pages/site/Intersection";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/intersection/" element={<Intersection />} />
      <Route path="/app/console/" element={<Console />} />
      <Route path="/auth/signup/" element={<SignUp />} />
      <Route path="/auth/signin/" element={<SignIn />} />
      <Route path="/auth/accounts/" element={<Accounts />} />
    </Routes>
  );
};

export default App;
