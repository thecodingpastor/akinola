import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id="Modal"></div>
          <div id="Alert"></div>
          <div id="BackdropPortal"></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
