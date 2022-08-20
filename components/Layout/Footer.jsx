import { useContext, useEffect } from "react";

import Image from "next/image";

import { GrSecure } from "react-icons/gr";
import { AiOutlineLogout } from "react-icons/ai";

import GlobalContext from "../../context/General/GlobalContext";

import classes from "./Footer.module.scss";

import Login from "../Modals/Login";
import AuthContext from "../../context/Auth/AuthContext";
import { useState } from "react";

function Footer() {
  const { ToggleModal } = useContext(GlobalContext);
  const { IsLoggedIn, Logout } = useContext(AuthContext);
  const [Count, setCount] = useState(0);

  useEffect(() => {
    const getCount = () => {
      fetch(
        "https://api.countapi.xyz/update/michaelakinola/d8fe5bd6-a5a0-437c-a7a3-42e744ebf019/?amount=1"
      )
        .then((res) => res.json())
        .then((res) => setCount(res.value))
        .catch((err) => console.log(err));
    };

    getCount();
  }, []);

  return (
    <footer>
      {Count && IsLoggedIn && (
        <p className={classes.Count}>
          This site has been visited <span>{Count} </span> times and counting
        </p>
      )}
      <div className={classes.footer}>
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
      </div>
    </footer>
  );
}

export default Footer;
