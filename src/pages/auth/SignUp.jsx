import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import PageTitle from "../../pageTitle";

const REGISTER_USER_ACCOUNT = gql`
  mutation SignIn(
    $username: String!
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
    $password2: String!
  ) {
    registerUser(
      username: $username
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
      password2: $password2
    ) {
      user {
        username
        firstName
        lastName
        email
        isActive
        dateJoined
      }
    }
  }
`;

const SignUp = () => {
  PageTitle("Sign up");

  const navigate = useNavigate();

  const [registerUser, { data, loading, error }] = useMutation(
    REGISTER_USER_ACCOUNT
  );

  if (data) {
    console.log(data);
    console.log("Account creation success.You can now log in.");
    navigate('/auth/signin/')
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
          <h1 className="text-xl text-center mb-4">Create user account</h1>
          <form
            className="px-4"
            onSubmit={(e) => {
              e.preventDefault();

              registerUser({
                variables: {
                  username: e.target.username.value,
                  email: e.target.email.value,
                  firstname: e.target.firstname.value,
                  lastname: e.target.lastname.value,
                  password: e.target.password.value,
                  password2: e.target.password2.value,
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
            <label htmlFor="password2" className="block mb-4">
              <span className="text-gray-700">
                Username<span className="text-red-700 text-3xl">*</span>
              </span>
              <input
                type="password"
                name="password2"
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
              Create
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

export default SignUp;
