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
              className="flex items-center p-4 hover:text-blue-900 hover:bg-zinc-100"
              key={index}
            >
              <Avatar src={resource.icon} className="" alt="it's me" />
              <span className="ml-4">{resource.title}</span>
            </a>
          </>
        );

        return list;
      })}
    </div>
  );
};

export default ResourcesContainer;
