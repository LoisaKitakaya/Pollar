const Market = () => {
  return (
    <div className="pt-2 px-16">
      <div className="text-center">
        <h1 className="text-4xl my-4">
          Make smarter decisions with innovative technologies
        </h1>
        <p className="text-lg my-4">
          With Polys, your elections will be fair and anonymous thanks to
          blockchain technology and undelying cryptoalgorithms.
        </p>
      </div>
      <div className="">
        <div className="flex items-center w-fit m-auto p-10">
          <img
            className="w-2/4 rounded-lg"
            src="https://images.pexels.com/photos/3183186/pexels-photo-3183186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="content"
          />
          <div className="p-4">
            <h1 className="text-2xl mb-4">
              Full transparency and verifiability of elections
            </h1>
            <p className="text-lg">
              The Polys system is based on blockchain technology, which makes
              voting secure and immutable. All data that enters the blockchain
              (votes and voting results) cannot be replaced or deleted.
            </p>
          </div>
        </div>
        <div className="flex items-center w-fit m-auto p-10">
          <div className="p-4">
            <h1 className="text-2xl mb-4 text-right">
              Security at every stage
            </h1>
            <p className="text-lg text-right">
              Cryptography is an important component that ensures the security
              of our solution: we protect elections from interference by any
              third party, including Polys.
            </p>
          </div>
          <img
            className="w-2/4 rounded-lg"
            src="https://images.pexels.com/photos/39584/censorship-limitations-freedom-of-expression-restricted-39584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="content"
          />
        </div>
        <div className="flex items-center w-fit m-auto p-10">
          <img
            className="w-2/4 rounded-lg"
            src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="content"
          />
          <div className="p-4">
            <h1 className="text-2xl mb-4">Availability for all voters</h1>
            <p className="text-lg">
              Voting from a digital device eliminates the need for voters to
              travel to a polling station. This can have a positive impact on
              voter turnout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;
