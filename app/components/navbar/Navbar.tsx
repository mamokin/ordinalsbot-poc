import React from 'react';
import './Navbar.css';
import { NavbarContent } from './NavbarContent';
import { NavbarItem } from './NavbarItem';

function NavbarComponent({ children }: { children: React.ReactNode }) {
  return <nav className="navbar__container">{children}</nav>;
}

export const Navbar = Object.assign(NavbarComponent, {
  Content: NavbarContent,
  Item: NavbarItem
});
