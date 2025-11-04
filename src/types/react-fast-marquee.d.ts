declare module 'react-fast-marquee' {
  import { ReactNode, FC } from 'react';

  export interface MarqueeProps {
    speed?: number;
    gradient?: boolean;
    gradientColor?: [number, number, number];
    gradientWidth?: number | string;
    pauseOnHover?: boolean;
    direction?: 'left' | 'right';
    className?: string;
    children?: ReactNode;
  }

  const Marquee: FC<MarqueeProps>;
  export default Marquee;
}

