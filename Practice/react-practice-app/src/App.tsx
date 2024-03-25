import Alert from "./components/Alert";
import Button from "./components/Button";
import { useState } from "react";
//import ListGroup from "./components/ListGroup";

function App() {
  // let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

  // //separate event handler
  // const handleSelectItem = (item: string) => {
  //   console.log(item);
  // };
  // return (
  //   <div>
  //     <ListGroup
  //       items={items}
  //       heading="Cities"
  //       onSelectItem={handleSelectItem}
  //     ></ListGroup>{" "}
  //     {/*<Message/> ->self closing*/}
  //   </div>
  // );

  // return (
  //   <div>
  //     <Alert>
  //       Hello<span> Marci!!!</span>
  //     </Alert>
  //     <Button onClick={() => console.log("Clicked!!")} color="secondary">
  //       Gombocska
  //     </Button>
  //   </div>
  // );
  const [alertVisible, setAlertVisible] = useState(false);
  return (
    <div>
      {alertVisible && (
        <Alert onClose={() => setAlertVisible(false)}>My Alert!!</Alert> //!!!!!!!() => ...
      )}
      <Button onClick={() => setAlertVisible(true)} color="secondary">
        My Button
      </Button>
    </div>
  );
}
export default App;
