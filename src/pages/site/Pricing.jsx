import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import PriceCards from "../../components/Pricing/PriceCards";
import PageTitle from "../../pageTitle";

const Pricing = () => {
  PageTitle("Pricing");

  return (
    <div>
      {/* navigation */}
      <Navbar />
      {/* navigation */}

      <div className="py-4">
        {/* intro */}
        <div className="pb-2 mx-80">
          <h1 className="text-4xl text-center mb-4">Pricing plans</h1>
          <p className="text-lg text-center">
            Prices are indicated for the number of voters in one election. Pay
            only to increase the number of voters and create a vote immediately.
            You may choose as many number of elections as you may need at the
            shopping cart step.
          </p>
        </div>
        {/* intro */}

        {/* cards */}
        <PriceCards />
        {/* cards */}

        {/* outro */}
        <div className="pb-2 mb-8 w-fit mx-auto">
          <h1 className="text-4xl text-center mt-8">
            Playing big? Get a custom solution
          </h1>
          <div className="flex items-center justify-evenly mt-8">
            <div>
              <p className="mb-3 text-2xl font-semibold">
                Enterprise plan features plus:
              </p>
              <ul className="text-lg mb-4 pl-4">
                <li>
                  <span className="mr-2 font-semibold text-xl text-blue-600">
                    +
                  </span>{" "}
                  Flexible voters' identification
                </li>
                <li>
                  <span className="mr-2 font-semibold text-xl text-blue-600">
                    +
                  </span>{" "}
                  Private blockchain
                </li>
                <li>
                  <span className="mr-2 font-semibold text-xl text-blue-600">
                    +
                  </span>{" "}
                  White labeling
                </li>
                <li>
                  <span className="mr-2 font-semibold text-xl text-blue-600">
                    +
                  </span>{" "}
                  Language localization
                </li>
                <li>
                  <span className="mr-2 font-semibold text-xl text-blue-600">
                    +
                  </span>{" "}
                  Additional functionality
                </li>
              </ul>
              <a
                href="/"
                className="button bg-emerald-300 hover:bg-emerald-400 text-white py-2 px-4 rounded-md shadow-md font-semibold"
              >
                Contact us
              </a>
            </div>
            <img
              className="w-2/5 rounded-md shadow-md"
              src="https://images.pexels.com/photos/2422293/pexels-photo-2422293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="pricing"
            />
          </div>
        </div>
        {/* outro */}
      </div>

      {/* body */}
      <Footer />
      {/* body */}
    </div>
  );
};

export default Pricing;
