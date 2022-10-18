import { gql, useQuery } from "@apollo/client";
import {
  IconDeviceMobileMessage,
  IconDeviceDesktopAnalytics,
} from "@tabler/icons";
import { Tabs } from "@mantine/core";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import PageTitle from "../../pageTitle";
import RegisterVoter from "../../components/Accounts/RegisterVoter";
import RegisterOrganizer from "../../components/Accounts/RegisterOrganizer";

const GET_WORKSPACES = gql`
  query GetWorkspaces {
    allWorkspaces {
      name
    }
  }
`;

const Accounts = () => {
  PageTitle("Accounts");

  const { loading, error, data } = useQuery(GET_WORKSPACES);

  let workspaceData = [];

  if (data) {
    console.log(data);
    console.log("Data fetched successfully.");

    data.allWorkspaces.map((space) => {
      return workspaceData.push(space.name);
    });
  }
  if (loading) return "Fetching...";
  if (error) return `Fetching error! ${error.message}`;

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
    </div>
  );
};

export default Accounts;
