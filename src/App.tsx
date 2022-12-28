import { useCallback, useState } from 'react';
import Header from './components/Header';
import NumberCard from './components/NumberCard';
import css from './App.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo, faThumbsUp } from '@fortawesome/pro-light-svg-icons';

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
    <>
      <Header />

      <div className={ css.container }>
        { !started && (
          <>
            <h1>Think of a number<br />between 1 and 64</h1>
            <button className="large" onClick={ handleStart }>
              Got it!
              <FontAwesomeIcon icon={ faThumbsUp } fixedWidth className="ml-2" />
            </button>
          </>
        ) }

        { (started && count < 6) && (
          <NumberCard
            setCount={ setCount }
            setMagic={ setMagic }
          />
        ) }

        { count === 6 && (
          <>
            <h3>Your number is</h3>
            <h1>{ magic || 64 }</h1>
            <button className="large" onClick={ handleAgain }>
              <FontAwesomeIcon icon={ faRedo } fixedWidth className="mr-2" />
              Play again
            </button>
          </>
        ) }
      </div>
    </>
  );
}

export default App;
