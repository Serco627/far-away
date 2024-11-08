import { useEffect, useState } from "react";
import Confetti from "react-confetti";

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

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
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

function Form({ onAddItems }) {
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
    onAddItems(newItem);
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

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => {
          return (
            <Item
              item={item}
              key={item.id}
              onDeleteItem={onDeleteItem}
              onToggleItem={onToggleItem}
            />
          );
        })}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onToggleItem(item.id);
        }}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (percentage === 100) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [percentage]);

  return (
    <footer className="stats">
      {showConfetti && <Confetti />}
      <em>
        {percentage === 100
          ? `🎉 You are ready to go! Happy vacation! 🛫`
          : numItems === 0
          ? `You have no items in your list. Start adding some items to your packing list. 🚀`
          : `💼 You have ${numItems} items in your list and you already packed ${numPacked} (${percentage}%) 💼`}
      </em>
    </footer>
  );
}
// {/* {numItems === 0
//   ? `You have no items in your list. Put something in the list.`
//   : `💼 You have ${numItems} items in your list and you already packed ${numPacked} (${percentage}%) :  💼`} */}
