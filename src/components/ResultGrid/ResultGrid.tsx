import { ErrorBoundary } from 'react-error-boundary';
import ErrorHandler from '../ErrorHandler';
import ResultCard from './ResultCard';
import css from './resultGrid.module.scss';

interface IResultGridProps {
  result: number[][];
}

function ResultGrid({ result }: IResultGridProps) {
  return (
    <div className={ css.resultGrid }>
      { result.map((card, i) => (
        <ErrorBoundary key={ i } FallbackComponent={ ErrorHandler }>
          <ResultCard card={ card } />
        </ErrorBoundary>
      )) }
    </div>
  );
}

export default ResultGrid;
