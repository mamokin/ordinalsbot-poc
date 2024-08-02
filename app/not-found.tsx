import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-4xl font-bold">Not Found</h2>
        <p className="text-xl">Could not find requested resource</p>
        <Link className="hover:text-sky-500" href="/">
          Return Home
        </Link>
      </div>
    </div>
  );
}
