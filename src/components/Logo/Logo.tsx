import css from './logo.module.scss';

function Logo({ className }: React.HTMLAttributes<SVGElement>) {
  return (
    <svg className={ `${css.svg}${className ? ' '+className : ''}` } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="40">
      <rect className={ css.fillBg } x="0" width="512" height="512" rx="51.2" />
      <path className={ css.fillFg }
        d="M507.1 334.5c0 -12.2 -0.9 -24.2 -4 -36c-4.5 -16.9 -14 -30.2 -30.2 -37.2c-13.4 -5.8 -27.9 -5.8 -42.1 -3.2c-19.7 3.6 -36.9 12.2 -49.7 28.3c-2.2 2.8 -4.3 5.6 -6.5 8.3c-0.4 -0.4 -0.8 -0.6 -0.9 -0.9c-0.3 -0.6 -0.4 -1.2 -0.6 -1.8c-5.3 -16.2 -16.3 -27 -32.3 -32c-17.9 -5.5 -36 -4 -53.6 1.5c-17.7 5.5 -32.5 15.5 -43 31.8c0 -9.4 -0.1 -18.9 0.1 -28.4c0.1 -3.3 -0.9 -4.1 -4.2 -4.1c-15.5 0.2 -31 0.2 -46.5 0c-4 -0.1 -4.5 1.2 -4.5 4.8c0.1 63.8 0.1 127.6 0 191.4c0 3.7 0.6 5.1 4.8 5c17.2 -0.3 34.3 -0.2 51.5 0c3.9 0.1 4.9 -0.9 4.9 -4.9l-0.1 -106.4c0 -2.1 0.3 -4.1 1.1 -6.2c3.6 -10.1 9.8 -18.1 17.9 -25.1c9.5 -8.2 25.2 -10.9 34.5 -5.3c10.3 6.3 13.4 16.7 13.5 27.7c0.3 38.3 0.2 76.6 0 114.9c0 4 0.7 5.4 5 5.3c17.3 -0.3 34.6 -0.3 52 0c4.1 0.1 5.2 -0.9 5.2 -5.1c-0.2 -36 -0.1 -71.9 -0.1 -107.9c0 -1.6 -0.2 -3.5 0.5 -4.9c5.8 -12.9 13.8 -24 27.2 -30.1c15.5 -7 29 -1.2 34.8 11.2c3.5 7.5 4.3 15.7 4.4 23.9c0.2 35.8 0.2 71.6 0 107.4c0 4.8 1.5 5.6 5.8 5.5c16.8 -0.2 33.7 -0.2 50.5 0c3.8 0 5 -0.8 5 -4.8C507 416.1 507.1 375.3 507.1 334.5z" />
      <path className={ css.fillFg }
        d="M161.3 411.2c-2 4.7 -4.8 9.1 -8.6 12.3c-16.4 13.6 -34.6 21.3 -56.6 18.4c-13.6 -1.8 -25.6 -6.9 -35.5 -15.6c-23.9 -21 -32.3 -48.3 -28 -79.1c2.6 -18.9 11 -35.4 25.9 -48.2c11.5 -9.8 24.6 -15.7 39.5 -17c13.6 -1.2 26.7 1.2 38.8 8.1c10.3 5.9 18.6 13.8 24.2 24.4c8.2 -2.6 16.7 -5.2 25.4 -8c-5.4 -11.5 -16.8 -24.6 -27.2 -31.6c-25.2 -17.1 -52.9 -19.6 -81.5 -12.4c-19.3 4.8 -35.6 15.4 -48.5 31c-14.3 17.3 -21.7 37.2 -23.7 59.1c-1.1 12 -0.2 24 2.9 35.8c6.5 25 19.8 45.4 41 60c20.2 13.9 42.6 19.5 67.2 16.7c15.2 -1.7 29.2 -6.1 42 -14.2c13.4 -8.4 23.7 -19.6 29.9 -34.5c-7.8 -2.2 -15.3 -4.1 -22.6 -6.7C163 408.4 162.1 409.3 161.3 411.2z" />
    </svg>
  );
}

export default Logo;
