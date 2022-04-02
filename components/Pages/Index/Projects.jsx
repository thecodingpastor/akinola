import Link from "next/link";
import { useContext, useEffect } from "react";
import ProjectContext from "../../../context/Project/ProjectContext";

import checkCharacterLength from "../../../utils/checkCharacterLength";

import Card from "../../General/Card";
import classes from "./Projects.module.scss";

const Projects = () => {
  const { Projects, GetAllProjects } = useContext(ProjectContext);

  useEffect(() => {
    if (Projects.length < 1) {
      GetAllProjects();
    }
  }, [Projects.length]);

  if (Projects?.length > 0)
    return (
      <div className={classes.Container} id="projects">
        <h3>Projects</h3>
        <div className={classes.ProjectList}>
          {Projects.map((project) => (
            <div className={classes.Project} key={project._id}>
              <Card className={classes.CardStyles}>
                <h4>{checkCharacterLength(project.title, "title")}</h4>
                <span className={classes.Collab}>
                  {project.isTeam ? "Collaborative" : "Individual"}
                </span>
                <p className={classes.Description}>
                  {checkCharacterLength(project.description)}
                </p>
                <div className={classes.Github}>
                  <a href={project.githubLink} target="_blank" rel="noreferrer">
                    Github Repo
                  </a>
                  <Link href={`/projects/${project._id}`} passHref>
                    <span>More</span>
                  </Link>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  return "";
};

export default Projects;
