import { Button, Breadcrumbs, Anchor } from "@mantine/core";

const items = [
  { title: "Mantine", href: "#" },
  { title: "Mantine hooks", href: "#" },
  { title: "use-id", href: "#" },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

const App = () => {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">App is working.</h1>
      <br />
      <Button>Click me!</Button>
      <br />
      <>
        <Breadcrumbs>{items}</Breadcrumbs>
        <Breadcrumbs separator="→">{items}</Breadcrumbs>
      </>
    </div>
  );
};

export default App;
