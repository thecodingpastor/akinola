import "../styles/globals.scss";

import { AuthContextProvider } from "../context/Auth/AuthContext";
import { GlobalContextProvider } from "../context/General/GlobalContext";
import { PostContextProvider } from "../context/Post/PostContext";
import { ProjectContextProvider } from "../context/Project/ProjectContext";

import Layout from "../components/Layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContextProvider>
      <AuthContextProvider>
        <PostContextProvider>
          <ProjectContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ProjectContextProvider>
        </PostContextProvider>
      </AuthContextProvider>
    </GlobalContextProvider>
  );
}

export default MyApp;
