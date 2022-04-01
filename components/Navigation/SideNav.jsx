import { useContext } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import NavData from "./NavData";
import classes from "./SideNav.module.scss";
import AuthContext from "../../context/Auth/AuthContext";

const SideNav = () => {
  const router = useRouter();
  const { IsLoggedIn } = useContext(AuthContext);
  const closeNav = () => {
    const checkbox = document.getElementById("navi_toggle");
    checkbox.checked = !checkbox.checked;
  };

  const handleClick = (e) => {
    e.preventDefault();
    const target = e.target.getAttribute("href");
    const location = document.querySelector(target).offsetTop;
    closeNav();
    window.scrollTo({
      left: 0,
      top: location - 70,
    });
  };

  return (
    <div className={classes.navigation}>
      <input
        type="checkbox"
        className={classes.navigation__checkbox}
        id="navi_toggle"
      />
      <label htmlFor="navi_toggle" className={classes.navigation__button}>
        <span className={classes.navigation__icon}>&nbsp;</span>
      </label>
      <div className={classes.navigation__background}>&nbsp;</div>

      <nav className={classes.navigation__nav}>
        <ul className={classes.navigation__list}>
          <li className={classes.navigation__item} onClick={closeNav}>
            <Link href="/">
              <a className={classes.navigation__link}>Home</a>
            </Link>
          </li>
          {router.pathname === "/" &&
            NavData.map((nav) => (
              <li
                className={classes.navigation__item}
                key={nav.id}
                onClick={handleClick}
              >
                <a href={nav.url} className={classes.navigation__link}>
                  {nav.text}
                </a>
              </li>
            ))}

          <li className={classes.navigation__item} onClick={closeNav}>
            <Link href="/blog">
              <a className={classes.navigation__link}>Blog</a>
            </Link>
          </li>
          {IsLoggedIn && (
            <>
              <li className={classes.navigation__item} onClick={closeNav}>
                <Link href="/projects">
                  <a className={classes.navigation__link}>New&nbsp;Projects</a>
                </Link>
              </li>
              <li className={classes.navigation__item} onClick={closeNav}>
                <Link href="/create">
                  <a className={classes.navigation__link}>Create</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;
