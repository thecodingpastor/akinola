import Head from "next/head";
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";

import GlobalContext from "../../../context/General/GlobalContext";

import BlogButtons from "../../../components/General/BlogButtons";
import ProjectContext from "../../../context/Project/ProjectContext";
import Button from "../../../components/Form/Button";

const Project = (props) => {
  const { project } = props.data;
  const router = useRouter();
  const { SetAlert } = useContext(GlobalContext);
  const { GetSingleProject } = useContext(ProjectContext);

  useEffect(() => {
    if (!project) {
      router.push("/");
      SetAlert({
        type: "error",
        message: "Could not find project. Try again later",
        title: "Error",
      });
    }
    GetSingleProject(project);
  }, []);
  return (
    <>
      <Head>
        <title>{project?.title || "Project"}</title>
      </Head>
      <BlogButtons _id={project?._id} isProject />
      <div
        className="container"
        style={{
          padding: "2rem",
          textAlign: "justify",
        }}
      >
        <h2 className="text-center">{project?.title}</h2>
        {project?.isTeam && (
          <div
            className="text-center"
            style={{ fontWeight: "bold", fontSize: "italic" }}
          >
            This is a collaborative project
          </div>
        )}
        <p>{project?.description}</p>
        <div className="flex-center">
          <Button
            text="Go To Github Repo"
            handleClick={() => {
              window.open(project?.githubLink, "_blank");
            }}
          />
        </div>
      </div>
      ;
    </>
  );
};

export async function getServerSideProps({ params }) {
  const resp = await fetch(
    `${process.env.APP_URL}/projects/${params.projectId}`
  );
  const data = await resp.json();
  return {
    props: {
      data: data,
    },
  };
}

export default Project;
