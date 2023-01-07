import { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/pro-light-svg-icons';
import Logo from '../Logo';
import OffCanvas from '../OffCanvas';
import css from './header.module.scss';

function Header() {
  const [show, setShow] = useState<boolean>(false);

  const handleShow = useCallback(() => {
    setShow(true);
  }, []);

  const handleHide = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <header className={ css.header }>
      <div className={ css.content }>
        <button className="condensed mr-2" onClick={ handleShow }>
          <FontAwesomeIcon icon={ faBars } fixedWidth />
          <span className="visually-hidden">Open menu</span>
        </button>
        <Logo />
      </div>

      <OffCanvas open={ show } close={ handleHide } />
    </header>
  );
}

export default Header;
