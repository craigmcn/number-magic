import css from './numberCard.module.scss';

interface INumberCardItemProps {
  number: number;
}

function NumberCardItem({ number }: INumberCardItemProps) {
  return (
    <span className={ css.numberCardItem }>
      { number }
    </span>
  );
}

export default NumberCardItem;
