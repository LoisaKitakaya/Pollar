import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

import loader from "../../assets/Loading-Image/256x256.gif";
import packages from "../Pricing/data.json";

const UPGRADE_ACCOUNT = gql`
  mutation upgradeAccount($tier: String!) {
    upgradeAccount(tier: $tier) {
      organizer {
        id
        paidStatus
        runningPackage
        workspace {
          name
          pollLimit
          voterLimit
        }
      }
    }
  }
`;

const MY_ACCOUNT = gql`
  query MyAccount {
    myOrganizerAccount {
      id
      user {
        id
        username
        firstName
        lastName
        email
      }
      phone
      country
      paidStatus
      runningPackage
      workspace {
        name
        voterLimit
        pollLimit
      }
    }
  }
`;

const packageData = packages;
const appError = [];

const PriceCards = () => {
  const [status, setStatus] = useState(false);

  const navigate = useNavigate();

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

        toast.error(`${showError.error}`, {
          position: toast.POSITION.BOTTOM_LEFT,
          toastId: "ro-error",
          className: "bg-error",
        });
      }
    }

    setStatus(localStorage.getItem("authenticated"));

    console.log(status);
  }, [status]);

  const [upgradeAccount, { data, loading, error }] = useMutation(
    UPGRADE_ACCOUNT,
    {
      refetchQueries: [
        { query: MY_ACCOUNT }, // DocumentNode object parsed with gql
      ],
    }
  );

  if (data) {
    console.log(data);

    processSuccess();

    navigate("/app/organizer_console/");
  }
  if (loading)
    return (
      <>
        <div className="h-full w-full">
          <div className="my-52">
            <img src={loader} className="m-auto" alt="loader" />
          </div>
        </div>
      </>
    );
  if (error) processError(error);

  return (
    <div className="my-8">
      <div className="flex justify-evenly w-4/5 mx-auto">
        {packageData.packages.map((item, index) => {
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
                  <>
                    {status ? (
                      <button
                        className="button bg-emerald-400 text-white py-2 px-4 rounded-md shadow-md hover:bg-emerald-500 font-semibold w-3/5 mb-8"
                        onClick={() => {
                          upgradeAccount({
                            variables: {
                              tier: item.tier_code,
                            },
                          });
                        }}
                      >
                        Buy
                      </button>
                    ) : (
                      <Link
                        to="/auth/signin/"
                        className="button bg-emerald-400 text-white py-2 px-4 rounded-md shadow-md hover:bg-emerald-500 font-semibold w-3/5 mb-8"
                      >
                        Sign in to buy
                      </Link>
                    )}
                  </>
                )}
              </div>
            </>
          );

          return list;
        })}
      </div>
      <p className="mt-8"></p>

      {/* Notification */}
      <ToastContainer closeButton={false} />
      {/* Notification */}
    </div>
  );
};

export default PriceCards;
