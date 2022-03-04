import { ReactNode } from 'react';

export default function RespHeader({
  children,
  style,
}: {
  children: ReactNode;
  style?: Object;
}) {
  return (
    <h1
      style={{
        fontSize: 'min(7vw, 30px)',
        ...style,
      }}
    >
      {children}
    </h1>
  );
}
