import { Accordion, Avatar } from "@mantine/core";

import data from "./data.json";

const features = data.features;

const FeaturesContainer = () => {
  return (
    <div>
      <Accordion variant="filled" radius="xs" defaultValue="customization">
        {features.map((feature, index) => {
          const list = (
            <>
              <Accordion.Item value={`${feature.slug}`} key={index}>
                <Accordion.Control>
                  <span className="flex items-center">
                    <Avatar src={feature.icon} alt="it's me" />
                    <span className="ml-4">{feature.title}</span>
                  </span>
                </Accordion.Control>
                <Accordion.Panel>{feature.summary}</Accordion.Panel>
              </Accordion.Item>
            </>
          );

          return list;
        })}
      </Accordion>
    </div>
  );
};

export default FeaturesContainer;
