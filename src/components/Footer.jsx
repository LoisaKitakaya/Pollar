const Footer = () => {
  return (
    <div className="py-4 bg-gray-100">
      <div className="flex items-center justify-around px-16 py-2">
        <a href="/" className="flex items-center">
          <img
            className="w-32"
            src="https://res.cloudinary.com/dit0fii18/image/upload/v1665714259/documents/logos/logo_pollar_bird_hnflza.png"
            alt="logo"
          />
          <span className="ml-4 text-6xl header-font">Pollar</span>
        </a>
        <div>
          <a href="/" className="text-lg px-4 hover:text-blue-900">
            Contact us
          </a>
          <a href="/" className="text-lg px-4 hover:text-blue-900">
            FAQs
          </a>
          <a href="/" className="text-lg px-4 hover:text-blue-900">
            About us
          </a>
          <a href="/" className="text-lg px-4 hover:text-blue-900">
            Privacy policy
          </a>
          <a href="/" className="text-lg px-4 hover:text-blue-900">
            Terms {"&"} conditions
          </a>
        </div>
      </div>
      <div className="bg-gray-300 py-2 mt-2">
        <p className="flex m-auto w-fit items-center">
          <span>Made with</span>{" "}
          <span className="text-red-600 mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </span>{" "}
          <span>
            by{" "}
            <a href="/" className="text-blue-900 hover:underline">
              Freedom Loisa
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
