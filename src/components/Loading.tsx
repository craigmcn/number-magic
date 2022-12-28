import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass } from '@fortawesome/pro-light-svg-icons';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

interface ILoadingProps {
  size?: SizeProp;
  message?: string;
}

function Loading({ size, message }: ILoadingProps) {
  return (
    <>
      <FontAwesomeIcon icon={ faHourglass } size={ size } spin fixedWidth style={ { '--fa-animation-duration': '1.2s' } as React.CSSProperties } />
      <span className='visually-hidden'>{ message || 'Loading...' }</span>
    </>
  );
}

export default Loading;
