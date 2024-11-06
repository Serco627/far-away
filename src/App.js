export default function App() {
  return (
    <div>
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
  return (
    <div className="add-form">
      <h3>What do you need for your trip ?</h3>
    </div>
  );
}

function PackingList() {
  return <div className="list">LIST</div>;
}

function Stats() {
  return <footer> 💼 You have x items in your list 💼</footer>;
}
