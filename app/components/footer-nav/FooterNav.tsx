import React from 'react';
import './FooterNav.css';

const FooterNav = (): React.JSX.Element => {
  return (
    <div className="footer-nav__container">
      <ul className="footer-nav__list">
        <li>
          <a href="https://github.com/mamokin/ordinalsbot-poc" target="__blank">
            GitHub
          </a>
        </li>
      </ul>
    </div>
  );
};

export default FooterNav;
