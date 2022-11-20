const Forbidden = () => {
  return (
    <div className="min-h-screen">
      <div className="w-3/4 mx-auto">
        <h1
          className="text-center font-bold text-zinc-200"
          style={{
            fontSize: "224px",
            lineHeight: "15rem",
          }}
        >
          403
        </h1>
        <p
          className="text-center font-semibold mb-8"
          style={{
            fontSize: "48px",
          }}
        >
          You have found a secret place.
        </p>
        <p className="text-2xl text-center mb-16">
          Unfortunately, this is only a 403 page. Which means, you are forbidden
          from accessing this page. This is because you do not have the
          necessary permissions that would otherwise grant you access to this
          page.
        </p>
        <div className="w-fit mx-auto">
          <button className="button py-2 px-4 w-80 rounded-md hover:shadow-md text-sky-500 hover:text-white hover:bg-sky-500 flex items-center justify-center" onClick={() => window.history.back()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 font-semibold"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>
            <span className="ml-2 text-2xl">Take me back</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
