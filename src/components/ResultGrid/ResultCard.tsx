import css from './resultGrid.module.scss';

interface IResultCardProps {
  card: number[];
}

function ResultCard({ card }:IResultCardProps) {
  return (
    <div className={ css.resultCard }>
      { card.map((n, i) => <span key={ i }>{ n }</span> ) }
    </div>
  );
}

export default ResultCard;
