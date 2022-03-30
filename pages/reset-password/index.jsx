import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

import Head from "next/head";

import AuthContext from "../../context/Auth/AuthContext";

import Button from "../../components/Form/Button";
import Input from "../../components/Form/Input";

import classes from "./Index.module.scss";

const PasswordRest = () => {
  const router = useRouter();
  const token = router.query.token;

  const { ResetPassword } = useContext(AuthContext);

  const [Values, setValues] = useState({
    password_reset: "",
    confirm_password_reset: "",
  });

  const handleChange = (e) => {
    setValues({ ...Values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ResetPassword({
      password: Values.password_reset,
      passwordConfirm: Values.confirm_password_reset,
      resetToken: token,
    });
  };

  const isValid =
    Values.password_reset.trim().length > 5 &&
    Values.confirm_password_reset.trim().length > 5 &&
    Values.password_reset.trim() === Values.confirm_password_reset.trim();

  return (
    <>
      <Head>
        <title>Reset Password</title>
      </Head>
      <div className="">
        <h2 className="text-center">Password Reset</h2>
        <form onSubmit={handleSubmit} className={classes.Form}>
          <Input
            type="password"
            name="password_reset"
            id="password_reset"
            placeholder="Enter your new password"
            label="Enter your new password"
            onChange={handleChange}
            value={Values.password_reset}
            required
          />
          <Input
            type="password"
            name="confirm_password_reset"
            id="confirm_password_reset"
            placeholder="Confirm password"
            label="Confirm password"
            onChange={handleChange}
            value={Values.confirm_password_reset}
            required
          />
          {!isValid ? (
            <p className="text-center fade">
              Passwords must match and be more than 5 characters
            </p>
          ) : (
            <Button text="Change Password" type="submit" fade />
          )}
        </form>
      </div>
    </>
  );
};

export default PasswordRest;
