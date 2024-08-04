'use client';
import { ScaleLoader } from 'react-spinners';
import './Loader.css';

export default function Loader({
  color = 'white'
}: {
  color?: 'white' | 'black';
}) {
  return (
    <div className="loader">
      <p>Loading Data...</p>
      <ScaleLoader color={color} />
    </div>
  );
}
