import { useState } from "react";
import "./index.css";
import ListSelector from "./components/ListSelector"

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1 className="text-3xl font-bold italic">Easy Todo</h1>
      <ListSelector/>
    </div>
  );
}

export default App;
