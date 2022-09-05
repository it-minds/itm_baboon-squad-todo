import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './index.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div >
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-3xl font-bold">Vite + React</h1>
      <div className="card">
        <button className="bg-black text-black" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and s  ave to test HMR
        </p>
      </div>
      <p className="text-3xl">
        Click on the Vite gfsgdfg React logos to learn more
      </p>
    </div>
  )
}

export default App
