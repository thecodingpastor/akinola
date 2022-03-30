import { useState, useContext, useEffect } from "react";

import Router from "next/router";
import Head from "next/head";
import dynamic from "next/dynamic";

import Navigation from "../Navigation/Navigation";
import SideNav from "../Navigation/SideNav";
import RouteLoadingSpinner from "../UI/RouteLoadingSpinner";
import Footer from "./Footer";
import PageLoading from "../UI/PageLoading";

import GlobalContext from "../../context/General/GlobalContext";
import AuthContext from "../../context/Auth/AuthContext";

const Scroll = dynamic(
  () => {
    return import("../../components/General/ScrollUpButton");
  },
  { ssr: false }
);

const Alert = dynamic(
  () => {
    return import("../../components/Modals/Alert");
  },
  { ssr: false }
);

const Layout = (props) => {
  const { AlertPopup } = useContext(GlobalContext);
  const { CheckUserAuth, AuthLoading, IsLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    CheckUserAuth();
  }, []);

  const [PageIsRouting, setPageIsRouting] = useState(false);

  Router.events.on("routeChangeStart", (url) => {
    setPageIsRouting(true);
  });

  Router.events.on("routeChangeComplete", (url) => {
    setPageIsRouting(false);
  });

  if (AuthLoading) return <PageLoading />;

  return (
    <>
      <Head>
        <title>Michael Akinola</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Michael Akinola, data science, data analytics, machine learning algorithms, automotive industry"
        />
        <meta charSet="utf-8" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Navigation />
      <SideNav />
      {PageIsRouting && <RouteLoadingSpinner />}
      <main className="frame" id="frame">
        {props.children}
        <Footer />
      </main>
      <Scroll />
      <Alert
        message={AlertPopup?.message}
        title={AlertPopup?.title}
        type={AlertPopup?.type}
      />
    </>
  );
};

export default Layout;
