import { useCallback, useId, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/pro-light-svg-icons";
import Logo from "../Logo";
import OffCanvas from "../OffCanvas";
import css from "./header.module.scss";

function Header() {
  const [show, setShow] = useState<boolean>(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleShow = useCallback(() => {
    setShow(true);
  }, []);

  const handleHide = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <header className={css.header}>
      <div className={css.content}>
        <button
          ref={menuButtonRef}
          className="condensed mr-2"
          onClick={handleShow}
          aria-expanded={show}
          aria-controls={menuId}
        >
          <FontAwesomeIcon icon={faBars} fixedWidth />
          <span className="visually-hidden">Open menu</span>
        </button>
        <Logo />
      </div>

      <OffCanvas
        id={menuId}
        open={show}
        close={handleHide}
        returnFocusRef={menuButtonRef}
      />
    </header>
  );
}

export default Header;
