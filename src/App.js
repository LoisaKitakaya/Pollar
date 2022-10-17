import { Routes, Route } from "react-router-dom";

import OrganizerConsole from "./pages/app/OrganizerConsole";
import VoterConsole from "./pages/app/VoterConsole";
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
      <Route path="/auth/signup/" element={<SignUp />} />
      <Route path="/auth/signin/" element={<SignIn />} />
      <Route path="/auth/accounts/" element={<Accounts />} />
      <Route path="/app/organizer_console/" element={<OrganizerConsole />} />
      <Route path="/app/voter_console/" element={<VoterConsole />} />
    </Routes>
  );
};

export default App;
