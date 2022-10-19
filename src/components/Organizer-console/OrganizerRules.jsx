import { Accordion } from "@mantine/core";

import data from "../Organizer-console/data.json";

const rules = data.rules;

const OrganizerRules = ({ opened, setOpened }) => {
  return (
    <div>
      {/* body */}
      <div className="h-full py-4 px-20">
        <div className="w-3/4 mx-auto my-8 py-6 px-4 bg-slate-100 rounded-md shadow-lg">
          <h1 className="text-2xl text-center mb-6">
            Rules to be observed by the organizer
          </h1>
          <Accordion variant="separated" defaultValue="ruleone">
            {rules.map((rule, index) => {
              const list = (
                <>
                  <Accordion.Item value={`${rule.value}`} key={index}>
                    <Accordion.Control className="bg-gray-200 hover:bg-gray-300">
                      {rule.title}
                    </Accordion.Control>
                    <Accordion.Panel>{rule.description}</Accordion.Panel>
                  </Accordion.Item>
                </>
              );

              return list;
            })}
          </Accordion>
        </div>
      </div>
      {/* body */}
    </div>
  );
};

export default OrganizerRules;
