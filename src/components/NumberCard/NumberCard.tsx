import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/pro-light-svg-icons';
import { Transition, TransitionStatus } from 'react-transition-group';
import { DURATION, sliceRandomElement } from '../../lib';
import NumberCardItem from './NumberCardItem';
import css from './numberCard.module.scss';

const numbers = [
  [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63],
  [2, 3, 6, 7, 10, 11, 14, 15, 18, 19, 22, 23, 26, 27, 30, 31, 34, 35, 38, 39, 42, 43, 46, 47, 50, 51, 54, 55, 58, 59, 62, 63],
  [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55, 60, 61, 62, 63],
  [8, 9, 10, 11, 12, 13, 14, 15, 24, 25, 26, 27, 28, 29, 30, 31, 40, 41, 42, 43, 44, 45, 46, 47, 56, 57, 58, 59, 60, 61, 62, 63],
  [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63],
  [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63],
];

const defaultStyle = {
  transition: `opacity ${DURATION}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles: Record<TransitionStatus, object> = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: defaultStyle.opacity },
  exited: { opacity: defaultStyle.opacity },
  unmounted: { opacity: defaultStyle.opacity },
};

interface INumberCardProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setCount: Dispatch<SetStateAction<number>>;
  setMagic: Dispatch<SetStateAction<number>>;
}

function NumberCard({ loading, setLoading, setCount, setMagic }: INumberCardProps) {
  const { element, array } = sliceRandomElement<number[]>(numbers);
  const [nextCard, setNextCard] = useState<number[]>(element);
  const [numberArray, setNumberArray] = useState<number[][]>(array);
  const overlayRef = useRef(null);

  const getNextCard = useCallback(() => {
    const { element, array } = sliceRandomElement<number[]>(numberArray);
    setTimeout(() => { // just slow it down a bit
      setNextCard(element);
      setNumberArray(array);
    }, DURATION);
  }, [numberArray]);

  const handleYes = useCallback(() => {
    setLoading(true);
    setMagic(magic => magic + nextCard[0]);
    setCount(count => count + 1);
    getNextCard();
  }, [nextCard, setLoading, setMagic, setCount, getNextCard]);

  const handleNo = useCallback(() => {
    setLoading(true);
    setCount(count => count + 1);
    getNextCard();
  }, [setLoading, setCount, getNextCard]);

  return (
    <>
      <h1>Is it any of these numbers?</h1>

      <div className={ css.numberCard }>
        <Transition nodeRef={ overlayRef } in={ loading } timeout={ DURATION }>
          { state => (
            <span ref={ overlayRef } className={ css.numberCardOverlay } style={ {
              ...defaultStyle,
              ...transitionStyles[state],
            } } />
          ) }
        </Transition>

        { nextCard.map((n, i) => <NumberCardItem key={ i } number={ n } />) }
      </div>

      <p className="mt-6">
        <button className="large mr-4" onClick={ handleYes } disabled={ loading }>
          <FontAwesomeIcon icon={ faCircleCheck } fixedWidth className="text-success mr-2" />
          Yes!
        </button>
        <button className="large" onClick={ handleNo } disabled={ loading }>
          <FontAwesomeIcon icon={ faCircleXmark } fixedWidth className="text-danger mr-2" />
          No
        </button>
      </p>
    </>
  );
}

export default NumberCard;
