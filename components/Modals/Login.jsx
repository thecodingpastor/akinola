import { useState, useContext } from "react";
import dynamic from "next/dynamic";

import AuthContext from "../../context/Auth/AuthContext";
import GlobalContext from "../../context/General/GlobalContext";

import Button from "../Form/Button";
import Spin from "../UI/Spin";

import Input from "../Form/Input";

const Modal = dynamic(
  () => {
    return import("../Modals/Modal");
  },
  { ssr: false }
);

const Login = () => {
  const { ShowModal, ToggleModal } = useContext(GlobalContext);
  const { Login, AuthLoading, ForgotPassword } = useContext(AuthContext);
  const [Values, setValues] = useState({ email: "", password: "" });
  const [IsLoginMode, setIsLoginMode] = useState(true);
  const [ForgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const handleChange = (e) => {
    setValues((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (IsLoginMode) {
      Login(Values);
      setValues({ email: "", password: "" });
    } else {
      ForgotPassword(ForgotPasswordEmail);
      setForgotPasswordEmail("");
    }
    ToggleModal();
  };

  return (
    <Modal
      onClose={ToggleModal}
      onSubmit={handleSubmit}
      show={ShowModal}
      headerContent={IsLoginMode ? "Login" : "Forgot Password"}
    >
      {IsLoginMode ? (
        <>
          <Input
            id="login_email"
            name="email"
            type="email"
            placeholder="Email"
            label="Email: Email is required"
            onChange={handleChange}
            value={Values.email}
            required
          />
          <Input
            id="login_password"
            name="password"
            type="password"
            placeholder="Password"
            label="Password: Password is required"
            onChange={handleChange}
            value={Values.password}
            required
          />
        </>
      ) : (
        <Input
          name="reset_password"
          type="email"
          placeholder="Enter your login email"
          label="Login email is required"
          onChange={(e) => setForgotPasswordEmail(e.target.value)}
          value={ForgotPasswordEmail}
          required
        />
      )}
      <div className="flex-center">
        {AuthLoading ? (
          <Spin />
        ) : (
          <Button
            text={IsLoginMode ? "Login" : "Change Password"}
            type="submit"
          />
        )}
        <span
          onClick={() => setIsLoginMode(!IsLoginMode)}
          style={{ fontStyle: "italic", fontWeight: "thin", cursor: "pointer" }}
        >
          {IsLoginMode ? "Forgot Password ?" : "Login"}
        </span>
      </div>
    </Modal>
  );
};

export default Login;
