import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/pro-light-svg-icons';

interface IStartProps {
  handleStart: () => void;
}

function Start({ handleStart }: IStartProps) {
  return (
    <>
      <h1>
        Think of a number
        <br />
        between 1 and 64
      </h1>

      <button className="large" onClick={ handleStart }>
        Got it!
        <FontAwesomeIcon icon={ faThumbsUp } fixedWidth className="ml-2" />
      </button>
    </>
  );
}

export default Start;
