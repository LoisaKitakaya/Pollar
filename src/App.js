import { Routes, Route } from "react-router-dom";

import OrganizerConsole from "./pages/app/OrganizerConsole";
import Results from "./pages/app/Results";
import VoterConsole from "./pages/app/VoterConsole";
import Accounts from "./pages/auth/Accounts";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/site/Home";
import Intersection from "./pages/site/Intersection";
import Pricing from "./pages/site/Pricing";

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
      <Route path="/app/results/:id" element={<Results />} />
      <Route path="/pricing" element={<Pricing />} />
    </Routes>
  );
};

export default App;
