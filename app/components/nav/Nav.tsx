import Link from 'next/link';
import { NAV_PATHS } from '../../lib/constants/routes';
import { ConnectWallet } from '../connect-wallet/ConnectWallet';
import { Navbar } from '../navbar/Navbar';
import './Nav.css';
import { NavPaths } from './NavPaths';

export default async function Nav() {
  return (
    <Navbar>
      <Link href={NAV_PATHS.ROOT}>
        <h1>Ordinalsbot POC</h1>
      </Link>

      <div className="nav__content">
        <Navbar.Content justify="start" className="nav__links">
          <NavPaths />
        </Navbar.Content>

        <Navbar.Content justify="end">
          <Navbar.Item className="nav__auth">
            <ConnectWallet />
          </Navbar.Item>
        </Navbar.Content>
      </div>
    </Navbar>
  );
}
