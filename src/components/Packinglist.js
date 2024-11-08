import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items.slice().sort((a, b) => a.packed - b.packed);

  // 1. Create a new variable sortedItems
  // 2. Check the value of sortBy
  // 3. If sortBy is "input", set sortedItems to the original items array
  // 4. If sortBy is "description", create a copy of the items array using slice()
  // 5. Sort the copied array by description using localeCompare()
  // 6. If sortBy is "packed", create a copy of the items array using slice()
  // 7. Sort the copied array by packed status

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => {
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

      <div className="actions">
        <select
          value={sortBy}
          onChange={(event) => {
            setSortBy(event.target.value);
          }}
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}
