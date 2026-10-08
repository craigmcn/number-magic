import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/pro-light-svg-icons";
import { useMagicMode } from "../../hooks";
import ErrorBoundary from "../ErrorBoundary";
import ResultGrid from "../ResultGrid";

interface IResultProps {
  result: number[][];
  handleAgain: () => void;
}

function Result({ result, handleAgain }: IResultProps) {
  const [isMagic] = useMagicMode();
  const magic = result.reduce((r, c) => r + c[0], 0);

  return (
    <>
      {magic === 0 && (
        <>
          <h3>Your number wasn&rsquo;t on any card</h3>

          <p>Was it between 1 and 63?</p>
        </>
      )}

      {magic > 0 && !isMagic && (
        <ErrorBoundary>
          <ResultGrid result={result} />
        </ErrorBoundary>
      )}

      {magic > 0 && isMagic && (
        <>
          <h3>Your number is</h3>

          <h1>{magic}</h1>
        </>
      )}

      <button className="large mt-4" onClick={handleAgain}>
        <FontAwesomeIcon icon={faRedo} fixedWidth className="mr-2" />
        Play again
      </button>
    </>
  );
}

export default Result;
