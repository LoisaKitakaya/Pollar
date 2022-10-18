import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import PageTitle from "../../pageTitle";

const TOKEN_AUTH = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      refreshToken
      payload
      refreshExpiresIn
    }
  }
`;

const SignIn = () => {
  PageTitle("Sign in");

  const navigate = useNavigate();

  const [tokenAuth, { data, loading, error }] = useMutation(TOKEN_AUTH);

  if (data) {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("authenticated");

    localStorage.setItem("token", data.tokenAuth.token);
    localStorage.setItem("refreshToken", data.tokenAuth.refreshToken);
    localStorage.setItem("authenticated", true);

    console.log(data);
    console.log("Account logged in successfully.");

    navigate("/intersection/");
  }
  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      {/* navigation */}
      <Navbar />
      {/* navigation */}

      {/* body */}
      <div className="min-h-fit">
        <div className="bg-zinc-100 rounded-lg shadow-md border p-4 w-2/5 mx-auto my-20">
          <h1 className="text-xl text-center mb-4">Log in to account</h1>
          <form
            className="px-4"
            onSubmit={(e) => {
              e.preventDefault();

              tokenAuth({
                variables: {
                  username: e.target.username.value,
                  password: e.target.password.value,
                },
              });
            }}
          >
            <label htmlFor="username" className="block mb-4">
              <span className="text-gray-700">
                Username<span className="text-red-700 text-3xl">*</span>
              </span>
              <input
                type="text"
                name="username"
                placeholder="e.g. johnDoe54"
                required
                className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
              />
            </label>
            <label htmlFor="password" className="block mb-4">
              <span className="text-gray-700">
                Password<span className="text-red-700 text-3xl">*</span>
              </span>
              <input
                type="password"
                name="password"
                placeholder="**************"
                required
                className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
              />
            </label>
            <br />
            <button
              type="submit"
              className="rounded-md shadow py-3 px-4 w-full border-gray-300 bg-green-600 hover:bg-green-900 hover:text-white mb-4"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
      {/* body */}

      {/* footer */}
      <Footer />
      {/* footer */}
    </div>
  );
};

export default SignIn;
