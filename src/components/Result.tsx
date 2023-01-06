import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/pro-light-svg-icons';
import { useReadLocalStorage } from 'usehooks-ts';
import ResultGrid from './ResultGrid';

interface IResultProps {
  result: number[][];
  handleAgain: () => void;
}

function Result({ result, handleAgain }: IResultProps) {
  const isManual = useReadLocalStorage('manual');
  const magic = result.reduce((r, c) => r + c[0], 0);

  return (
    <>
      { isManual && (
        <ResultGrid result={ result } />
      ) }

      { !isManual && (
        <>
          <h3>Your number is</h3>

          <h1>{ magic || 64 }</h1>
        </>
      ) }

      <button className="large mt-4" onClick={ handleAgain }>
        <FontAwesomeIcon icon={ faRedo } fixedWidth className="mr-2" />
        Play again
      </button>
    </>
  );
}

export default Result;
