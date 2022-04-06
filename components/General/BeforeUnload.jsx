import { useEffect } from "react";
import Router from "next/router";

const BeforeUnload = ({ children, blockRoute, message, unloadFunc, id }) => {
  useEffect(() => {
    // For nextjs routing  ==> working fine
    const handleRouteChange = () => {
      if (blockRoute) {
        const promptAnswer = confirm(
          message ||
            "Are you sure you want to leave this page? If you have uploaded an image, delete it to rid your database of unused files. You will also lose your work!"
        );

        if (!promptAnswer) {
          Router.events.emit("routeChangeComplete");
          throw "Error can safely be ignored";
        } else {
          unloadFunc != undefined && unloadFunc();
        }
      }
    };

    // For refreshing page
    const handlePageRefresh = (e) => {
      if (blockRoute) {
        e.returnValue =
          "Are you sure you want to leave? Your work will be lost.";
        //NOT WORKING PROPERLY YET
        unloadFunc != undefined && unloadFunc();
      }
    };

    window.addEventListener("beforeunload", handlePageRefresh);

    Router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      Router.events.off("routeChangeStart", handleRouteChange);
      window.removeEventListener("beforeunload", handlePageRefresh);
    };
  }, [blockRoute]);

  return <div id={id}>{children}</div>;
};

export default BeforeUnload;
