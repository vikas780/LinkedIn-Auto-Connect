import { useState } from 'react'
import reactLogo from '@/assets/react.svg'
import wxtLogo from '/wxt.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2>LinkedIn Auto Connect</h2>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
