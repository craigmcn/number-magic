import { type ReactNode } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import ErrorHandler from "./ErrorHandler";

interface IErrorBoundaryProps {
  children: ReactNode;
  onReset?: () => void;
}

// React 19's createRoot already reports caught errors to the console, so no onError here.
function ErrorBoundary({ children, onReset }: IErrorBoundaryProps) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorHandler} onReset={onReset}>
      {children}
    </ReactErrorBoundary>
  );
}

export default ErrorBoundary;
