import { Transition, TransitionStatus } from 'react-transition-group';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkLarge } from '@fortawesome/pro-light-svg-icons';
import { useOnClickOutside } from 'usehooks-ts';
import { version } from '../../../package.json';
import Logo from '../Logo';
import headerCss from '../Header/header.module.scss';
import css from './offCanvas.module.scss';

const duration = 300;

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

  const handleClickOutside = () => {
    close();
  };

  useOnClickOutside(nodeRef, handleClickOutside);

  return (
    <Transition nodeRef={ nodeRef } in={ open } timeout={ duration }>
      { state => (
        <div ref={ nodeRef } className={ css.offCanvas } style={ {
          ...defaultStyle,
          ...transitionStyles[state],
        } }>
          <div className='d-flex'>
            <button className="condensed mr-2" onClick={ close }>
              <FontAwesomeIcon icon={ faXmarkLarge } fixedWidth />
              <span className="visually-hidden">Close menu</span>
            </button>

            <div className={ headerCss.brand }>
              <a href="/">
                <Logo className="mr-2" />
                <span className='text-xl font-semibold'>craigmcn</span>
              </a>
            </div>
          </div>

          <h1 className='text-xl'>Number Magic</h1>

          <div className='text-muted text-sm pb-2'>
            Version { version }
          </div>
        </div>
      ) }
    </Transition>
  );
}

export default OffCanvas;
