import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Autocomplete } from "@mantine/core";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRef, useEffect } from "react";

import loader from "../../assets/Lazy-Loader/loading.svg";

const REGISTER_VOTER = gql`
  mutation RegisterVoter($country: String!, $workspace: String!) {
    registerVoter(country: $country, workspace: $workspace) {
      voter {
        user {
          firstName
          lastName
          email
          isActive
        }
        country
        workspace {
          name
          pollLimit
          voterLimit
        }
      }
    }
  }
`;

const appError = [];

const RegisterVoter = ({ workspaceData }) => {
  const [workspace, setWorkspace] = useState("");
  const toastElem = useRef(null);

  const notifyloading = () =>
    (toastElem.current = toast.info("Loading... Please wait", {
      position: toast.POSITION.BOTTOM_LEFT,
      toastId: "rv-loading",
      className: "bg-info",
      autoClose: false,
      icon: ({ theme, type }) => <img src={loader} alt="loader" />,
    }));

  const processSuccess = () => {
    sessionStorage.setItem("errors", JSON.stringify(appError));
  };

  const processError = (error) => {
    const errorList = JSON.parse(sessionStorage.getItem("errors"));

    errorList.push({ error: error.message });

    sessionStorage.setItem("errors", JSON.stringify(errorList));

    window.location.reload();
  };

  useEffect(() => {
    if (!sessionStorage.getItem("errors")) {
      sessionStorage.setItem("errors", JSON.stringify(appError));
    } else {
      const errorList = JSON.parse(sessionStorage.getItem("errors"));

      if (errorList.length) {
        let showError = errorList[errorList.length - 1];

        toast.error(`${showError.message}`, {
          position: toast.POSITION.BOTTOM_LEFT,
          toastId: "ro-error",
          className: "bg-error",
        });
      }
    }
  }, []);

  const [registerVoter, { data, loading, error }] = useMutation(REGISTER_VOTER);

  const navigate = useNavigate();

  if (data) {
    console.log(data);

    processSuccess();

    navigate("/app/voter_console/");
  }
  if (loading) {
    notifyloading();
  } else {
    toast.dismiss(toastElem.current);
  }
  if (error) processError(error);

  return (
    <div className="bg-zinc-100 rounded-lg shadow-md border p-4 w-3/4 m-auto">
      <form
        className="px-4"
        onSubmit={(e) => {
          e.preventDefault();

          registerVoter({
            variables: {
              country: e.target.country.value,
              workspace: e.target.workspace.value,
            },
          });
        }}
      >
        <label htmlFor="username" className="block mb-4">
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
        <label htmlFor="workspace" className="block mb-4">
          <br />
          <Autocomplete
            label="Start typing to filter workspaces"
            placeholder="Pick one"
            className="mb-4"
            data={workspaceData}
            onChange={(value) => setWorkspace(value)}
          />
          <span className="text-gray-700">
            Workspace<span className="text-red-700 text-3xl">*</span>
          </span>
          <br />
          <input
            type="text"
            name="workspace"
            placeholder="e.g. Medical society elections"
            value={workspace}
            required
            readOnly
            className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
          />
          <br />
          <span className="text-gray-700 text-sm flex">
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
            </span>
            Workspace here refers the name of the collection which
            elections/polls are grouped into. This name is often shared by the
            organizer. For more information, get in touch with your elections
            organizer.
          </span>
        </label>
        <label htmlFor="agree" className="inline-flex items-center mb-4">
          <input
            type="checkbox"
            name="agree"
            required
            className="text-indigo-600 rounded shadow-sm border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring"
          />
          <span className="ml-2 text-gray-900">
            I agree to the{" "}
            <a href="/" className="text-blue-900 underline">
              Terms {"&"} conditions
            </a>
          </span>
        </label>
        <br />
        <button
          type="submit"
          className="rounded-md shadow py-3 px-4 w-full border-gray-300 bg-green-600 hover:bg-green-900 hover:text-white mb-4"
        >
          Register
        </button>
      </form>

      {/* Notification */}
      <ToastContainer closeButton={false} />
      {/* Notification */}
    </div>
  );
};

export default RegisterVoter;
