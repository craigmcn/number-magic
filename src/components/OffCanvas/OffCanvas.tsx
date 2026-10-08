import { faXmarkLarge } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef, type RefObject } from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import { useOnClickOutside } from "usehooks-ts";
import { version } from "../../../package.json";
import { useMagicMode } from "../../hooks";
import headerCss from "../Header/header.module.scss";
import Logo from "../Logo";
import logoCss from "../Logo/logo.module.scss";
import Switch from "../Switch";
import css from "./offCanvas.module.scss";

const duration = 200;

const defaultStyle = {
  transition: `left ${duration}ms ease-in-out`,
  left: "-20rem", // .offCanvas { width: 20rem; }
};

const transitionStyles: Record<TransitionStatus, object> = {
  entering: { left: "0" },
  entered: { left: "0" },
  exiting: { left: defaultStyle.left },
  exited: { left: defaultStyle.left },
  unmounted: { left: defaultStyle.left },
};

interface IOffCanvasProps {
  id?: string;
  open: boolean;
  close: () => void;
  returnFocusRef?: RefObject<HTMLElement | null>;
}

function OffCanvas({ id, open, close, returnFocusRef }: IOffCanvasProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  // React 19 changed RefObject<T> to { current: T }, making null explicit in the type
  // parameter. usehooks-ts v3 hasn't updated its signature yet, so we cast here.
  useOnClickOutside(nodeRef as RefObject<HTMLElement>, close);

  // Escape and the close button hand focus back to the menu button; an outside click
  // doesn't, since the user has already put focus where they clicked.
  const dismiss = useCallback(() => {
    returnFocusRef?.current?.focus();
    close();
  }, [close, returnFocusRef]);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, dismiss]);

  const [isMagic, setIsMagic] = useMagicMode();

  const toggleMagic = useCallback(() => {
    setIsMagic((prev) => !prev);
  }, [setIsMagic]);

  return (
    <Transition nodeRef={nodeRef} in={open} timeout={duration}>
      {(state) => (
        <div
          id={id}
          ref={nodeRef}
          inert={!open}
          role="dialog"
          aria-label="Menu"
          className={css.offCanvas}
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          <div className={css.header}>
            <button
              ref={closeButtonRef}
              className="condensed mr-2"
              onClick={dismiss}
            >
              <FontAwesomeIcon icon={faXmarkLarge} fixedWidth />
              <span className="visually-hidden">Close menu</span>
            </button>

            <div className={headerCss.brand}>
              <a href="/">
                <Logo className={`${logoCss.outlined} mr-2`} />
                <span className="text-xl font-semibold">craigmcn</span>
              </a>
            </div>
          </div>

          <h1 className="text-xl">Number Magic</h1>

          <p>
            <Switch checked={isMagic} onChange={toggleMagic}>
              Magic
            </Switch>
          </p>

          <div className="text-muted text-sm pb-2">Version {version}</div>
        </div>
      )}
    </Transition>
  );
}

export default OffCanvas;
