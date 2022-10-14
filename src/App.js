import { Routes, Route } from "react-router-dom";
import Console from "./pages/app/Console";

import Home from "./pages/site/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/app/console/" element={<Console />} />
    </Routes>
  );
};

export default App;
