import Link from 'next/link';
import { NAV_PATHS } from '../../lib/constants/routes';
import { Navbar } from '../navbar/Navbar';
import './Nav.css';
import { NavPaths } from './NavPaths';

export default async function Nav() {
  return (
    <Navbar>
      <Link href={NAV_PATHS.ROOT}>
        <h3>Ordinals POC</h3>
      </Link>

      <div className="nav__content">
        <Navbar.Content justify="center" className="nav__links">
          <NavPaths />
        </Navbar.Content>
      </div>
    </Navbar>
  );
}
