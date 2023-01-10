import { faXmarkLarge } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useRef } from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';
import { useLocalStorage, useOnClickOutside } from 'usehooks-ts';
import { version } from '../../../package.json';
import headerCss from '../Header/header.module.scss';
import Logo from '../Logo';
import logoCss from '../Logo/logo.module.scss';
import Switch from '../Switch';
import css from './offCanvas.module.scss';

const duration = 200;

const defaultStyle = {
  transition: `left ${duration}ms ease-in-out`,
  left: '-20rem', // .offCanvas { width: 20rem; }
};

const transitionStyles: Record<TransitionStatus, object> = {
  entering: { left: '0' },
  entered: { left: '0' },
  exiting: { left: defaultStyle.left },
  exited: { left: defaultStyle.left },
  unmounted: { left: defaultStyle.left },
};

interface IOffCanvasProps {
  open: boolean;
  close: () => void;
}

function OffCanvas({ open, close }: IOffCanvasProps) {
  const nodeRef = useRef(null);
  useOnClickOutside(nodeRef, close);

  const [isManual, setIsManual] = useLocalStorage('manual', false);

  const toggleManual = useCallback(() => {
    setIsManual(prev => !prev);
  }, [setIsManual]);

  return (
    <Transition nodeRef={ nodeRef } in={ open } timeout={ duration }>
      { state => (
        <div ref={ nodeRef } className={ css.offCanvas } style={ {
          ...defaultStyle,
          ...transitionStyles[state],
        } }>
          <div className={ css.header }>
            <button className="condensed mr-2" onClick={ close }>
              <FontAwesomeIcon icon={ faXmarkLarge } fixedWidth />
              <span className="visually-hidden">Close menu</span>
            </button>

            <div className={ headerCss.brand }>
              <a href="/">
                <Logo className={ `${logoCss.outlined} mr-2` } />
                <span className='text-xl font-semibold'>craigmcn</span>
              </a>
            </div>
          </div>

          <h1 className='text-xl'>Number Magic</h1>

          <p><Switch checked={ isManual } onChange={ toggleManual }>Magic</Switch></p>

          <div className='text-muted text-sm pb-2'>
            Version { version }
          </div>
        </div>
      ) }
    </Transition>
  );
}

export default OffCanvas;
