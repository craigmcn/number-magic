import ErrorBoundary from '../ErrorBoundary';
import ResultCard from './ResultCard';
import css from './resultGrid.module.scss';

interface IResultGridProps {
  result: number[][];
}

function ResultGrid({ result }: IResultGridProps) {
  return (
    <div className={ css.resultGrid }>
      { result.map((card, i) => (
        <ErrorBoundary key={ i }>
          <ResultCard card={ card } />
        </ErrorBoundary>
      )) }
    </div>
  );
}

export default ResultGrid;
