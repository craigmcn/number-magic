import { type FallbackProps } from "react-error-boundary";
import css from "./ErrorBoundary.module.scss";

function ErrorHandler({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className={css.alert} role="alert">
      <p className="font-semibold">An error occurred</p>
      <pre>{error instanceof Error ? error.message : "unknown"}</pre>
      <button className="large" onClick={resetErrorBoundary}>
        Start over
      </button>
    </div>
  );
}

export default ErrorHandler;
