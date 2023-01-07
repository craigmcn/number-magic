import { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/pro-light-svg-icons';
import { DURATION, NUMBERS, sliceRandomElement } from '../../lib';
import Header from '../Header';
import Start from '../Start';
import ErrorBoundary from '../ErrorBoundary';
import NumberCard from '../NumberCard';
import Result from '../Result';
import css from './App.module.scss';

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [started, setStarted] = useState<boolean>(false);
  const [magic, setMagic] = useState<number[][]>([]);
  const [current, setCurrent] = useState<number[]>([]);
  const [numberArray, setNumberArray] = useState<number[][]>(NUMBERS);

  const initNumbers = useCallback(() => {
    const { element, array } = sliceRandomElement<number[]>(NUMBERS);
    setCurrent(element);
    setNumberArray(array);
  }, []);

  const getNextCard = useCallback(() => {
    const { element, array } = sliceRandomElement<number[]>(numberArray);
    setCurrent(element);
    setNumberArray(array);
  }, [numberArray]);

  const slowNextCard = useCallback((slow = true) => {
    setTimeout(() => { // match with transition duration
      getNextCard();
    }, slow ? DURATION : 100);
  }, [getNextCard]);

  const handleStart = useCallback(() => {
    setStarted(true);
  }, []);

  const handleYes = useCallback(() => {
    setLoading(true);
    setMagic(magic => [...magic, current]);
    slowNextCard(numberArray.length > 0);
  }, [numberArray.length, current, setLoading, setMagic, slowNextCard]);

  const handleNo = useCallback(() => {
    setLoading(true);
    slowNextCard(numberArray.length > 0);
  }, [numberArray.length, setLoading, slowNextCard]);

  const handleAgain = useCallback(() => {
    setStarted(false);
    setMagic([]);
    initNumbers();
  }, [initNumbers]);

  useEffect(() => {
    if (!loading) return;

    const timer = setTimeout(() => {
      setLoading(false);
    }, DURATION);

    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    initNumbers();
  }, [initNumbers]);

  return (
    <>
      <Header />

      <main className={ css.container }>
        { !started && <Start handleStart={ handleStart } /> }

        { (started && current) && (
          <>
            <ErrorBoundary>
              <NumberCard
                loading={ loading }
                numbers={ current }
              />
            </ErrorBoundary>

            <p className="mt-6">
              <button className="large success mr-4" onClick={ handleYes } disabled={ loading }>
                <FontAwesomeIcon icon={ faCircleCheck } fixedWidth className="text-success mr-2" />
                Yes!
              </button>

              <button className="large danger" onClick={ handleNo } disabled={ loading }>
                <FontAwesomeIcon icon={ faCircleXmark } fixedWidth className="text-danger mr-2" />
                No
              </button>
            </p>
          </>
        ) }

        { (started && !current) && (
          <ErrorBoundary>
            <Result result={ magic } handleAgain={ handleAgain } />
          </ErrorBoundary>
        ) }
      </main>
    </>
  );
}

export default App;
