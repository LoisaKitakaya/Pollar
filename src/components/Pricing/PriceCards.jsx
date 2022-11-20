import packages from "../Pricing/data.json";

const data = packages;

const PriceCards = () => {
  return (
    <div className="my-8">
      <div className="flex justify-evenly w-4/5 mx-auto">
        {data.packages.map((item, index) => {
          const list = (
            <>
              <div
                className="rounded-md shadow-md p-4 border text-center w-4/5 mx-2 bg-slate-100"
                key={index}
              >
                <p className="mt-8 mb-2 text-xl text-center">
                  Poll limit: {item.poll_limit}
                </p>
                <p className="mb-8 text-xl text-center">
                  Voter limit: {item.voter_limit}
                </p>
                <p className="mb-8 text-lg font-semibold italic text-green-500">
                  {item.tier_price}
                </p>
                <p className="mb-8 text-4xl font-bold header-font">
                  {item.tier_name}
                </p>
                {item.tier_name === "FREE" ? (
                  <button
                    disabled
                    className="button bg-blue-200 text-white py-2 px-4 rounded-md shadow-md font-semibold w-3/5 mb-8"
                  >
                    Default
                  </button>
                ) : (
                  <button className="button bg-emerald-400 text-white py-2 px-4 rounded-md shadow-md hover:bg-emerald-500 font-semibold w-3/5 mb-8">
                    Buy
                  </button>
                )}
              </div>
            </>
          );

          return list;
        })}
      </div>
      <p className="mt-8"></p>
    </div>
  );
};

export default PriceCards;
