import css from './ErrorHandler.module.scss';

interface IErrorHandlerProps {
  error: Error;
}

function ErrorHandler({ error }: IErrorHandlerProps) {
  return (
    <div className={ css.alert } role="alert">
      <p className='font-semibold'>An error occurred</p>
      <pre>{ error?.message || 'unknown' }</pre>
    </div>
  );
}

export default ErrorHandler;
