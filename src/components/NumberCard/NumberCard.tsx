import { useRef } from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';
import { useReadLocalStorage } from 'usehooks-ts';
import { DURATION } from '../../lib';
import NumberCardItem from './NumberCardItem';
import css from './numberCard.module.scss';

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
  numbers: number[];
}

function NumberCard({ loading, numbers }: INumberCardProps) {
  const overlayRef = useRef(null);
  const isManual = useReadLocalStorage('manual');

  return (
    <>
      { !isManual && <h1>Is it any of these numbers?</h1> }

      <div className={ css.numberCard }>
        <Transition nodeRef={ overlayRef } in={ loading } timeout={ DURATION }>
          { state => (
            <span ref={ overlayRef } className={ css.numberCardOverlay } style={ {
              ...defaultStyle,
              ...transitionStyles[state],
            } } />
          ) }
        </Transition>

        { numbers?.map((n, i) => <NumberCardItem key={ i } number={ n } />) }
      </div>
    </>
  );
}

export default NumberCard;
