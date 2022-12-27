import { useCallback, useState } from 'react';
import './App.css';
import NumberCard from './components/NumberCard';

function App() {
  const [started, setStarted] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [magic, setMagic] = useState<number>(0);

  const handleStart = useCallback(() => {
    setStarted(true);
  }, []);


  const handleAgain = useCallback(() => {
    setStarted(false);
    setMagic(0);
    setCount(0);
  }, []);

  return (
    <div className="App">
      {!started && (
        <>
          <h1>Think of a number<br />between 1 and 64</h1>
          <button onClick={ handleStart }>Got it!</button>
        </>
      )}

      {(started && count < 6) && (
        <NumberCard
          setCount={ setCount }
          setMagic={ setMagic }
        />
      )
      }

      {count === 6 && (
        <>
          <h3>Your number is</h3>
          <h1>{magic || 64}</h1>
          <button onClick={ handleAgain }>Play again</button>
        </>
      )
      }
    </div>
  );
}

export default App;
