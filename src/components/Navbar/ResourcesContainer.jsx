import { Avatar } from "@mantine/core";

import data from "./data.json";

const resources = data.resources;

const ResourcesContainer = () => {
  return (
    <div>
      {resources.map((resource, index) => {
        const list = (
          <>
            <a
              href="/"
              className="flex items-center hover:text-blue-900"
              key={index}
            >
              <Avatar src={resource.icon} className="ml-4 mb-2" alt="it's me" />
              <span className="ml-8">{resource.title}</span>
            </a>
          </>
        );

        return list;
      })}
    </div>
  );
};

export default ResourcesContainer;
