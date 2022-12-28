import { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo, faThumbsUp } from '@fortawesome/pro-light-svg-icons';
import { getRandomInt } from './lib';
import Header from './components/Header';
import Loading from './components/Loading';
import NumberCard from './components/NumberCard';
import css from './App.module.scss';

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [started, setStarted] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [magic, setMagic] = useState<number>(0);

  const handleStart = useCallback(() => {
    setLoading(true);
    setStarted(true);
  }, []);


  const handleAgain = useCallback(() => {
    setStarted(false);
    setMagic(0);
    setCount(0);
  }, []);

  useEffect(() => {
    if (loading) {
      const duration = getRandomInt(200, 600);
      setTimeout(() => {
        setLoading(false);
      }, duration);
    }
  }, [loading]);

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
            loading={ loading }
            setLoading={ setLoading }
            setCount={ setCount }
            setMagic={ setMagic }
          />
        ) }

        { count === 6 && (
          <>
            <h3>Your number is</h3>
            { loading && (
              <div style={ { fontSize: '3.2em', height: '1.1em', margin: '0.67em' } }>
                <Loading size="sm" />
              </div>
            ) }

            { !loading && <h1>{ magic || 64 }</h1> }

            <button className="large" onClick={ handleAgain } disabled={ loading }>
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
