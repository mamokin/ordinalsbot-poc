import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-4xl font-bold">Not Found</h2>
        <p className="text-xl">Could not find requested resource</p>
        <br />
        <p className="text-xl">
          You may be on a dynamic route that requires paramerters in the URL.
        </p>
        <p className="text-xl">
          Refer to the following list for expected parameters:
        </p>
        <br />
        <ol>
          <li>
            <p className="text-xl">
              <code>/order-status/</code> requires an <code>order-id</code> i.e.
              /order-status/order-id
            </p>
          </li>
          <li>
            <p className="text-xl">
              <code>/ticker-info/</code> requires a <code>ticker</code> i.e.
              /order-status/trio
            </p>
          </li>
        </ol>
        <br />
        <Link className="hover:text-sky-500" href="/">
          Return Home
        </Link>
      </div>
    </div>
  );
}
