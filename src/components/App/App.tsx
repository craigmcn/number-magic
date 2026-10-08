import { useCallback, useEffect, useReducer } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark } from "@fortawesome/pro-light-svg-icons";
import {
  DURATION,
  NUMBERS,
  gameReducer,
  initialGameState,
  shuffle,
} from "../../lib";
import Header from "../Header";
import Start from "../Start";
import ErrorBoundary from "../ErrorBoundary";
import NumberCard from "../NumberCard";
import Result from "../Result";
import css from "./App.module.scss";

function App() {
  const [game, dispatch] = useReducer(gameReducer, initialGameState);

  const handleStart = useCallback(() => {
    dispatch({ type: "start", deck: shuffle(NUMBERS) });
  }, []);

  const handleYes = useCallback(() => {
    dispatch({ type: "answer", isYes: true });
  }, []);

  const handleNo = useCallback(() => {
    dispatch({ type: "answer", isYes: false });
  }, []);

  const handleAgain = useCallback(() => {
    dispatch({ type: "reset" });
  }, []);

  const isLastCard =
    game.phase === "transitioning" && game.remaining.length === 0;

  // One timer per transition: the overlay fades in over DURATION, then the next card swaps in
  // underneath it. The last card skips the fade since the result screen replaces it anyway.
  useEffect(() => {
    if (game.phase !== "transitioning") return;

    const timer = setTimeout(
      () => dispatch({ type: "advance" }),
      isLastCard ? 100 : DURATION,
    );

    return () => clearTimeout(timer);
  }, [game.phase, isLastCard]);

  return (
    <>
      <Header />

      <main className={css.container}>
        <ErrorBoundary onReset={handleAgain}>
          {game.phase === "start" && <Start handleStart={handleStart} />}

          {(game.phase === "card" || game.phase === "transitioning") && (
            <>
              <NumberCard
                loading={game.phase === "transitioning"}
                numbers={game.current}
              />

              <p className="mt-6">
                <button
                  className="large success mr-4"
                  onClick={handleYes}
                  disabled={game.phase === "transitioning"}
                >
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    fixedWidth
                    className="text-success mr-2"
                  />
                  Yes!
                </button>

                <button
                  className="large danger"
                  onClick={handleNo}
                  disabled={game.phase === "transitioning"}
                >
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    fixedWidth
                    className="text-danger mr-2"
                  />
                  No
                </button>
              </p>
            </>
          )}

          {game.phase === "result" && (
            <Result result={game.yesCards} handleAgain={handleAgain} />
          )}
        </ErrorBoundary>
      </main>
    </>
  );
}

export default App;
