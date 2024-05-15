import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export default function Card({ children }: Props) {
  return <div className='card bg-base-100 p-6'>{children}</div>;
}
