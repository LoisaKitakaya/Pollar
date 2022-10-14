import { useState } from "react";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const Home = () => {
  const [features, setFeaturesState] = useState(false);
  const [resources, setResourcesState] = useState(false);

  return (
    <div className="bg-gray-100">
      {/* navigation */}
      <Navbar
        featureState={features}
        setFeatureState={setFeaturesState}
        resourcesState={resources}
        setResourcesState={setResourcesState}
      />
      {/* navigation */}

      {/* body */}
      <div onClick={() => setFeaturesState(false)}></div>
      {/* body */}

      {/* body */}
      <Footer />
      {/* body */}
    </div>
  );
};

export default Home;
