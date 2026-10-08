import ResultCard from "./ResultCard";
import css from "./resultGrid.module.scss";

interface IResultGridProps {
  result: number[][];
}

function ResultGrid({ result }: IResultGridProps) {
  return (
    <div className={css.resultGrid}>
      {result.map((card, i) => (
        <ResultCard key={i} card={card} />
      ))}
    </div>
  );
}

export default ResultGrid;
