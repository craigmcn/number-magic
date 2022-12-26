import { useCallback, useEffect, useState } from 'react'
import './App.css'

const numbers = [
  [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63],
  [2, 3, 6, 7, 10, 11, 14, 15, 18, 19, 22, 23, 26, 27, 30, 31, 34, 35, 38, 39, 42, 43, 46, 47, 50, 51, 54, 55, 58, 59, 62, 63],
  [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55, 60, 61, 62, 63],
  [8, 9, 10, 11, 12, 13, 14, 15, 24, 25, 26, 27, 28, 29, 30, 31, 40, 41, 42, 43, 44, 45, 46, 47, 56, 57, 58, 59, 60, 61, 62, 63],
  [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63],
  [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63],
]

function App() {
  const [started, setStarted] = useState<boolean>(false)
  const [count, setCount] = useState<number>(0)
  const [magic, setMagic] = useState<number>(0)

  const handleAgain = useCallback(() => {
    setStarted(false)
    setMagic(0)
    setCount(0)
  }, [])

  const handleYes = useCallback(() => {
    setMagic((magic) => magic + numbers[count][0])
    setCount((count) => count + 1)
  }, [count, magic])

  const handleNo = useCallback(() => {
    setCount((count) => count + 1)
  }, [count])

  return (
    <div className="App">
      {!started && (
        <>
          <h1>Think of a number<br/>between 1 and 64</h1>
          <button onClick={() => setStarted(true)}>Got it!</button>
        </>
        )
      }

      {(started && count < 6) && (
        <>
          <h1>Is it any of these numbers?</h1>

          <p style={{justifyItems: "center", display: "flex", flexWrap: "wrap", maxWidth: "24rem", margin: "1rem auto"}}>{numbers[count].map((n, i) => {
            return <span key={i} style={{fontSize: "120%", lineHeight: "1.8", margin: "0 0.5rem", width: "2em"}}>{n}</span>
          })}</p>

          <button onClick={handleYes}>Yes!</button>
          <button onClick={handleNo}>No</button>
        </>
      )
    }

    {count === 6 && (
      <>
        <h3>Your number is</h3>
        <h1>{magic || 64}</h1>
        <button onClick={handleAgain}>Play again</button>
      </>
    )
  }
    </div>
  )
}

export default App
