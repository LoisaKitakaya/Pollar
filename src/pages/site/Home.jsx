import { useState } from "react";

import Footer from "../../components/Footer";
import HowPollarWorks from "../../components/Home/HowPollarWorks";
import Intro from "../../components/Home/Intro";
import KeyFeatures from "../../components/Home/KeyFeatures";
import Market from "../../components/Home/Market";
import Support from "../../components/Home/Support";
import Navbar from "../../components/Navbar";
import PageTitle from "../../pageTitle";

const Home = () => {
  PageTitle("Home");
  
  const [features, setFeaturesState] = useState(false);
  const [resources, setResourcesState] = useState(false);

  return (
    <div>
      {/* navigation */}
      <Navbar
        featureState={features}
        setFeatureState={setFeaturesState}
        resourcesState={resources}
        setResourcesState={setResourcesState}
      />
      {/* navigation */}

      {/* body */}

      {/* body component */}
      <Intro />
      {/* body component */}

      {/* body component */}
      <Market />
      {/* body component */}

      {/* body component */}
      <KeyFeatures />
      {/* body component */}

      {/* body component */}
      <Support />
      {/* body component */}

      {/* body component */}
      <HowPollarWorks />
      {/* body component */}

      {/* body */}

      {/* body */}
      <Footer />
      {/* body */}
    </div>
  );
};

export default Home;
