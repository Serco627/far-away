import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return (
    <div>
      <h1> 🌴 Far Away 🧳</h1>
    </div>
  );
}

function Form() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleInputChange(event) {
    setDescription(event.target.value);
  }

  function handleSelectChange(event) {
    setQuantity(Number(event.target.value));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newItem = { description, quantity, packed: false, id: Date.now() };
    if (!description) return;
    console.log(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip ?</h3>
      <select value={quantity} onChange={handleSelectChange}>
        {/* // Create an array of 20 numbers from 1 to 20 and map over it to create
      an option element for each number */}
        {Array.from({ length: 20 }, (_, index) => index + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        value={description}
        type="text"
        placeholder="Item..."
        onChange={handleInputChange}
      ></input>
      <button>Add</button>
    </form>
  );
}

// 1. Create a state to hold the value of the select field -> quantity, setQuantity
// 2. Set the value of the select field to the state -> value={quantity}
// 3. use onChange to handle the change event -> onChange={handleSelectChange}
// 4. Create a function to handle the change event -> handleSelectChange
// 5. Update the state with the value of the select field -> setQuantity(Number(event.target.value))

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => {
          return <Item item={item} key={initialItems.id} />;
        })}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats"> 💼 You have x items in your list 💼</footer>
  );
}
