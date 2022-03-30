import { useContext } from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import classes from "./Navigation.module.scss";

import NavData from "./NavData";
import AuthContext from "../../context/Auth/AuthContext";

import { MdOutlineCreateNewFolder } from "react-icons/md";
import { RiSuitcase3Line } from "react-icons/ri";

const Navigation = () => {
  const { IsLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  const handleClick = (e) => {
    if (router.pathname !== "/") return;
    e.preventDefault();
    const target = e.target.getAttribute("href");
    const location = document.querySelector(target).offsetTop;
    // SOmething to be done

    window.scrollTo({
      left: 0,
      top: location - 70,
    });
  };

  return (
    <nav className={classes.Container}>
      <div className={classes.Logo}>
        <>
          <Link href="/">
            <div className={classes.LogoContainer}>
              <img src="/images/logo.png" alt="Michael Akinola's Logo" />
            </div>
          </Link>
          <Link href="/">Michael Akinola </Link>
        </>
      </div>
      <ul className={classes.Links}>
        {router.pathname === "/" &&
          NavData.map((nav) => (
            <a key={nav.id} href={nav.url} onClick={handleClick}>
              {nav.text}
            </a>
          ))}
        <Link href="/blog">
          <a className={router.pathname === "/blog" ? classes.Active : ""}>
            Blog
          </a>
        </Link>
        {IsLoggedIn && (
          <>
            <Link href="/create">
              <a
                className={
                  router.pathname === "/create"
                    ? classes.Active + " flex-center"
                    : "flex-center"
                }
              >
                <MdOutlineCreateNewFolder />
              </a>
            </Link>
            <Link href="/projects">
              <a
                className={
                  router.pathname === "/projects"
                    ? classes.Active + " flex-center"
                    : "flex-center"
                }
              >
                <RiSuitcase3Line />
              </a>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
