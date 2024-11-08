import { useState } from "react";
import Logo from "../src/components/Logo.js";
import Form from "../src/components/Form.js";
import PackingList from "../src/components/Packinglist.js";
import Stats from "../src/components/Stats.js";

// Lift the state up
// 1. Move the state in the parent component -> App()
// 2. Pass the state down to the child component as a prop in the child component -> PackingList items={items}
// 3. Pass the function that updates the state down to the child component as a prop -> Form onAddItems={handleAddItems}
// 4. Call the function in the child component (Form) to update the state -> onAddItems(newItem)

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    const updatedItems = [...items, item];
    setItems(updatedItems);
  }

  function handleDeleteItem(id) {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  }

  function handleToggleItem(id) {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, packed: !item.packed };
      }
      return item;
    });
    setItems(updatedItems);
  }
  // other syntax for all the handler functions could be like this:
  // function handleToggleItem(id) {
  //   setItems(items.map((item) =>
  //     item.id === id ? { ...item, packed: !item.packed } : item
  //   ));
  // }

  function handleClearList() {
    const confirmed = window.confirm(
      "Click OK to clear the list or Cancel to keep the list."
    );
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
