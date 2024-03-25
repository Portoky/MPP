import { useState } from "react";

interface ListGroupProps {
  items: string[];
  heading: string;
  // (item: string) => void
  onSelectItem: (item: string) => void;
}

//props -> IMMUTABLE, UNCHANGEABLE -> FUNCTIONAL PROGRAMMING PRINCIPLE
function ListGroup({ items, heading, onSelectItem }: ListGroupProps) {
  //no item selected LOCAL  without useState
  //hook -> telling that this var will change over time
  const [selectedIndex, setSelectedIndex] = useState(-1); //whenever selectedIndex is changed react rerenders the components
  //const [name, setName] = useState('')
  //arr[0]; // variable([selected index])
  //arr[1]; //updater function

  //function, event handler
  //const handleClick = (event: MouseEvent) => console.log(event);
  return (
    <>
      {/*the same as <Fragment> -> toreturn more components in a function*/}
      <h1>{heading}</h1>
      {items.length === 0 && <p>No item found</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }} /*it is a reference to a function*/
          >
            {item}
          </li>
        ))}
      </ul>
    </> //
  );
}

export default ListGroup;
