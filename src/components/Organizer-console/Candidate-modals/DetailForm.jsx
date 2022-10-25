const DetailForm = ({ allPolls }) => {
  return (
    <div>
      <form className="px-4" onSubmit={(e) => {}}>
        <label htmlFor="firstname" className="block mb-4">
          <span className="text-gray-700">
            First name<span className="text-red-700 text-3xl">*</span>
          </span>
          <input
            type="text"
            name="firstname"
            placeholder="e.g. John"
            required
            className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
          />
        </label>
        <label htmlFor="lastname" className="block mb-4">
          <span className="text-gray-700">
            Last name<span className="text-red-700 text-3xl">*</span>
          </span>
          <input
            type="text"
            name="lastname"
            placeholder="e.g. Doe"
            required
            className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
          />
        </label>
        <label htmlFor="email" className="block mb-4">
          <span className="text-gray-700">
            Email<span className="text-red-700 text-3xl">*</span>
          </span>
          <input
            type="email"
            name="email"
            placeholder="e.g. johndoe54@gmail.com"
            required
            className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
          />
        </label>
        <label htmlFor="country" className="block mb-4">
          <span className="text-gray-700">
            Country<span className="text-red-700 text-3xl">*</span>
          </span>
          <input
            type="text"
            name="country"
            placeholder="e.g. Kenya"
            required
            className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
          />
        </label>
        <label htmlFor="country" className="block mb-4">
          <span className="text-gray-700">
            Poll<span className="text-red-700 text-3xl">*</span>
          </span>
          <select
            name="pollid"
            placeholder="e.g. Kenya"
            required
            className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
          >
            <option disabled selected>
              Select poll candidate will take part in
            </option>
            {allPolls.map((poll, index) => {
              const list = (
                <>
                  <option value={poll.id} key={index}>
                    {poll.seat}
                  </option>
                </>
              );

              return list;
            })}
          </select>
        </label>
        <label htmlFor="bio" className="block mb-4">
          <span className="text-gray-700">
            Bio
            <span className="text-red-700 text-3xl">*</span>
          </span>
          <textarea
            cols="30"
            rows="10"
            name="bio"
            placeholder="Short intro about this candidate"
            required
            className="mt-1 block w-full rounded-md shadow-sm bg-gray-200
              border-gray-300 focus:border-indigo-300 focus:ring-indigo-200
              focus:ring-opacity-50 focus:ring focus:bg-gray-100"
          ></textarea>
        </label>
        <br />
        <button
          type="submit"
          className="rounded-md shadow py-3 px-4 w-full border-gray-300 bg-green-600 hover:bg-green-900 hover:text-white mb-4"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default DetailForm;
