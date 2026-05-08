import { type ReactNode } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import ErrorHandler from "./ErrorHandler";

interface IErrorBoundaryProps {
  children: ReactNode;
}

function ErrorBoundary(props: IErrorBoundaryProps) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorHandler}>
      {props.children}
    </ReactErrorBoundary>
  );
}

export default ErrorBoundary;
