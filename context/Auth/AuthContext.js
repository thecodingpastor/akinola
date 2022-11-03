import { createContext, useReducer, useContext } from "react";
import AuthReducer from "./AuthReducers";
import useHttpClient from "../../utils/hooks/useHttpClient";

import emailjs from "@emailjs/browser";

import { useRouter } from "next/router";

import { START_TYPE, FAILURE_TYPE, LOGIN_TYPE, LOGOUT_TYPE } from "./AuthTypes";

import GlobalContext from "../General/GlobalContext";

const INITIAL_STATE = {
  User: null,
  IsLoggedIn: false,
  Token: null,
  AuthLoading: false,
  AuthError: null,
  Login: () => {},
};

const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const MY_URL = process.env.APP_URL;
  const token =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("token"))?.id
      : "";
  const tokenExpiresDate =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("token"))?.exp
      : "";

  const { SetAlert } = useContext(GlobalContext);
  const [state, AuthDispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const { Loading, error, SendRequest, ClearError } = useHttpClient();

  const router = useRouter();

  const CheckUserAuth = () => {
    if (token && new Date(tokenExpiresDate) > new Date()) {
      AuthDispatch({ type: START_TYPE });
      SendRequest(`${MY_URL}/users/checkAuth`, "GET", null, {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      })
        .then((data) => {
          AuthDispatch({
            type: LOGIN_TYPE,
            payload: { ...data, token: token },
          });
        })
        .catch((err) => {
          SetAlert({
            type: "error",
            title: "You are not authenticated.",
            message: err.message,
          });
          router.replace("/");
          localStorage.removeItem("token");
        });
    } else {
      localStorage.removeItem("token");
    }
  };

  const Login = (body) => {
    AuthDispatch({ type: START_TYPE });
    const tokenExpirationDate = new Date(
      new Date().getTime() + +process.env.TOKEN_EXPIRES
    );

    SendRequest(`${MY_URL}/users/login`, "POST", JSON.stringify(body), {
      "Content-Type": "application/json",
    })
      .then((data) => {
        localStorage.setItem(
          "token",
          JSON.stringify({
            id: data.token,
            exp: tokenExpirationDate,
          })
        );
        SetAlert({
          type: "success",
          message: "Login successful. Access to backend granted",
          title: "Success",
        });
        AuthDispatch({ type: LOGIN_TYPE, payload: data });
      })
      .catch((err) => {
        SetAlert({
          type: "error",
          message: err.message,
          title: "Login failed.",
          duration: 6000,
        });
      });
  };

  const ForgotPassword = (email) => {
    AuthDispatch({ type: START_TYPE });
    SendRequest(
      `${MY_URL}/users/forgot-password`,
      "POST",
      JSON.stringify({ email }),
      {
        "Content-Type": "application/json",
      }
    )
      .then((data) => {
        if (!data.mail) {
          SetAlert({
            type: "success",
            message: data.message,
            title: "Check your email.",
            duration: 10000,
          });
        } else {
          const serviceID = process.env.EMAIL_SERVICE_ID;
          const userID = process.env.EMAIL_USER_ID;

          emailjs
            .send(
              serviceID,
              "template_7felm67", //templateID
              { message: data.mail },
              userID
            )
            .then(
              () => {
                SetAlert({
                  type: "success",
                  message: data.message,
                  title: "Check your email.",
                  duration: 10000,
                });
              },
              (error) => {
                SetAlert({
                  type: "error",
                  duration: 12000,
                  title: "Something went wrong.",
                  message: error.text,
                });
              }
            );
        }
      })
      .catch((err) => {
        SetAlert({
          type: "error",
          message: err.message,
          title: "Failed.",
          duration: 6000,
        });
      });
    // }
  };

  // const ForgotPassword = (email) => {
  //   if (!process.env.ADMIN_EMAIL.includes(email)) {
  //     return SetAlert({
  //       type: "success",
  //       message:
  //         "If valid, a message would have been sent to the provided email address for further instructions.",
  //       title: "Check your email.",
  //     });
  //   } else {
  //     AuthDispatch({ type: START_TYPE });

  //     SendRequest(
  //       `${MY_URL}/users/forgot-password`,
  //       "POST",
  //       JSON.stringify({ email }),
  //       {
  //         "Content-Type": "application/json",
  //       }
  //     )
  //       .then((data) => {
  //         if (!data.mail) {
  //           console.log("data => ", data);
  //           SetAlert({
  //             type: "success",
  //             message: data.message,
  //             title: "Check your email.",
  //             duration: 10000,
  //           });
  //         } else {
  //           // The service ID is invalid. To find this ID, visit https://dashboard.emailjs.com/admin
  //           const serviceID = process.env.EMAIL_SERVICE_ID; //service_ivgh97m
  //           const userID = process.env.EMAIL_USER_ID;

  //           return console.log(data);
  //           emailjs
  //             .send(
  //               serviceID,
  //               "template_7felm67", //templateID
  //               { message: data.mail },
  //               userID
  //             )
  //             .then(
  //               () => {
  //                 SetAlert({
  //                   type: "success",
  //                   message: data.message,
  //                   title: "Check your email.",
  //                   duration: 10000,
  //                 });
  //               },
  //               (error) => {
  //                 SetAlert({
  //                   type: "error",
  //                   duration: 12000,
  //                   title: "Something went wrong.",
  //                   message: error.text,
  //                 });
  //               }
  //             );
  //         }
  //       })
  //       .catch((err) => {
  //         SetAlert({
  //           type: "error",
  //           message: err.message,
  //           title: "Failed.",
  //           duration: 6000,
  //         });
  //       });
  //   }
  // };

  const Logout = () => {
    localStorage.removeItem("token");
    AuthDispatch({ type: LOGOUT_TYPE });
    SetAlert({
      message: "Successfully logged out.",
      title: "Success",
    });
    location.href = "/";
  };

  const ResetPassword = (body) => {
    const { password, passwordConfirm, resetToken } = body;
    if (!resetToken || resetToken.length < 10)
      return SetAlert({
        type: "error",
        message: "Invalid token",
        title: "Error",
        duration: 10000,
      });

    AuthDispatch({ type: START_TYPE });
    SendRequest(
      `${MY_URL}/users/reset-password?resetToken=${resetToken}`,
      "PATCH",
      JSON.stringify({ password, passwordConfirm }),
      {
        "Content-Type": "application/json",
      }
    )
      .then(() => {
        SetAlert({
          type: "success",
          message: "Password changed successfully. Login again to have access.",
          title: "Success",
        });

        AuthDispatch({ type: LOGOUT_TYPE });
        router.push("/");
      })
      .catch((err) => {
        SetAlert({
          type: "error",
          message: err.message,
          title: "Error",
          duration: 10000,
        });
      });
  };

  const context = {
    IsLoggedIn: !!state.User,
    User: state.User,
    ShowModal: state.ShowModal,
    Token: token,
    AuthError: error,
    AuthLoading: Loading,
    ClearAuthError: ClearError,
    CheckUserAuth,
    Login,
    ForgotPassword,
    ResetPassword,
    Logout,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
