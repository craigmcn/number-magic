import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { sliceRandomElement } from '../lib';

const numbers = [
  [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63],
  [2, 3, 6, 7, 10, 11, 14, 15, 18, 19, 22, 23, 26, 27, 30, 31, 34, 35, 38, 39, 42, 43, 46, 47, 50, 51, 54, 55, 58, 59, 62, 63],
  [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55, 60, 61, 62, 63],
  [8, 9, 10, 11, 12, 13, 14, 15, 24, 25, 26, 27, 28, 29, 30, 31, 40, 41, 42, 43, 44, 45, 46, 47, 56, 57, 58, 59, 60, 61, 62, 63],
  [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63],
  [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63],
];

interface INumberCardProps {
  setCount: Dispatch<SetStateAction<number>>;
  setMagic: Dispatch<SetStateAction<number>>;
}

function NumberCard({ setCount, setMagic }: INumberCardProps) {
  const { element, array } = sliceRandomElement<number[]>(numbers);
  const [nextCard, setNextCard] = useState<number[]>(element);
  const [numberArray, setNumberArray] = useState<number[][]>(array);

  const getNextCard = useCallback(() => {
    const { element, array } = sliceRandomElement<number[]>(numberArray);
    setNextCard(element);
    setNumberArray(array);
  }, [numberArray]);

  const handleYes = useCallback(() => {
    setMagic(magic => magic + nextCard[0]);
    setCount(count => count + 1);
    getNextCard();
  }, [nextCard, setMagic, setCount, getNextCard]);

  const handleNo = useCallback(() => {
    setCount(count => count + 1);
    getNextCard();
  }, [setCount, getNextCard]);

  return (
    <>
      <h1>Is it any of these numbers?</h1>

      <p className="number-card">{nextCard.map((n, i) => {
        return <span key={ i } className="number-card__item">{n}</span>;
      })}</p>

      <button style={ { marginRight: '1rem' } } onClick={ handleYes }>Yes!</button>
      <button onClick={ handleNo }>No</button>
    </>
  );
}

export default NumberCard;
