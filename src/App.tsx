import { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/pro-light-svg-icons';
import { useReadLocalStorage } from 'usehooks-ts';
import { DURATION, NUMBERS, sliceRandomElement } from './lib';
import Header from './components/Header';
import Start from './components/Start';
import NumberCard from './components/NumberCard';
import Result from './components/Result';
import css from './App.module.scss';

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [started, setStarted] = useState<boolean>(false);
  const [magic, setMagic] = useState<number[][]>([]);
  const [current, setCurrent] = useState<number[]>([]);
  const [numberArray, setNumberArray] = useState<number[][]>(NUMBERS);
  const isManual = useReadLocalStorage('manual');

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

  const slowNextCard = useCallback(() => {
    setTimeout(() => { // match with transition duration
      getNextCard();
    }, DURATION);
  }, [getNextCard]);

  const handleStart = useCallback(() => {
    setStarted(true);
  }, []);

  const handleYes = useCallback(() => {
    setLoading(numberArray.length > 0);
    setMagic(magic => [...magic, current]);
    slowNextCard();
  }, [numberArray.length, current, setLoading, setMagic, slowNextCard]);

  const handleNo = useCallback(() => {
    setLoading(numberArray.length > 0);
    slowNextCard();
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

      <div className={ css.container }>
        { !started && <Start handleStart={ handleStart } /> }

        { (started && current) && (
          <>
            <NumberCard
              loading={ loading }
              numbers={ current }
            />

            <p className={ isManual ? 'mt-4' : 'mt-6' }>
              <button className={ `mr-4${isManual ? '' : ' large'}` } onClick={ handleYes } disabled={ loading }>
                <FontAwesomeIcon icon={ faCircleCheck } fixedWidth className="text-success mr-2" />
                Yes!
              </button>

              <button className={ isManual ? '' : 'large' } onClick={ handleNo } disabled={ loading }>
                <FontAwesomeIcon icon={ faCircleXmark } fixedWidth className="text-danger mr-2" />
                No
              </button>
            </p>
          </>
        ) }

        { (started && !current) && (
          <Result result={ magic } handleAgain={ handleAgain } />
        ) }
      </div>
    </>
  );
}

export default App;
