import { useContext } from "react";

import Image from "next/image";

import { GrSecure } from "react-icons/gr";
import { AiOutlineLogout } from "react-icons/ai";

import GlobalContext from "../../context/General/GlobalContext";

import classes from "./Footer.module.scss";

import Login from "../Modals/Login";
import AuthContext from "../../context/Auth/AuthContext";

function Footer() {
  const { ToggleModal } = useContext(GlobalContext);
  const { IsLoggedIn, Logout } = useContext(AuthContext);
  return (
    <footer className={classes.footer}>
      {!IsLoggedIn ? (
        <GrSecure onClick={ToggleModal} />
      ) : (
        <AiOutlineLogout onClick={Logout} />
      )}
      <div>
        <div className={classes.FooterImage}></div>
        <Image
          src="/images/logo.png"
          alt="Michael Akinola"
          width={30}
          height="30"
          className="round"
        />
        &nbsp; Michael Akinola &copy; {new Date().getFullYear()}
      </div>
      <Login />
    </footer>
  );
}

export default Footer;
