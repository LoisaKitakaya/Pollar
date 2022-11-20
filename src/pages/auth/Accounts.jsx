import { gql, useQuery } from "@apollo/client";
import {
  IconDeviceMobileMessage,
  IconDeviceDesktopAnalytics,
} from "@tabler/icons";
import { Tabs } from "@mantine/core";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import PageTitle from "../../pageTitle";
import RegisterVoter from "../../components/Accounts/RegisterVoter";
import RegisterOrganizer from "../../components/Accounts/RegisterOrganizer";
import loader from "../../assets/Loading-Image/256x256.gif";

const GET_WORKSPACES = gql`
  query GetWorkspaces {
    allWorkspaces {
      name
    }
  }
`;

const appError = [];

const Accounts = () => {
  PageTitle("Accounts");

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
  }, []);

  const { loading, error, data } = useQuery(GET_WORKSPACES);

  let workspaceData = [];

  if (data) {
    console.log(data);
    console.log("Data fetched successfully.");

    processSuccess();

    data.allWorkspaces.map((space) => {
      return workspaceData.push(space.name);
    });
  }
  if (loading) return (
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
    <div>
      {/* navigation */}
      <Navbar />
      {/* navigation */}

      {/* body */}
      <div className="min-h-fit">
        <div className="w-3/5 mx-auto mt-10 mb-20">
          <Tabs color="cyan" defaultValue="voter">
            <Tabs.List position="center">
              <Tabs.Tab
                value="voter"
                icon={<IconDeviceMobileMessage size={24} color={"gray"} />}
              >
                <span className="text-lg">Register voter account</span>
              </Tabs.Tab>
              <Tabs.Tab
                value="organizer"
                icon={<IconDeviceDesktopAnalytics size={24} color={"gray"} />}
              >
                <span className="text-lg">Register organizer account</span>
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="voter" pt="xl">
              <RegisterVoter workspaceData={workspaceData} />
            </Tabs.Panel>

            <Tabs.Panel value="organizer" pt="xl">
              <RegisterOrganizer />
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
      {/* body */}

      {/* footer */}
      <Footer />
      {/* footer */}

      {/* Notification */}
      <ToastContainer closeButton={false} />
      {/* Notification */}
    </div>
  );
};

export default Accounts;
