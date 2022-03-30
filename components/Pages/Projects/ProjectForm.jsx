import { useState, useContext } from "react";
import { useRouter } from "next/router";

import Input from "../../../components/Form/Input";
import Button from "../../../components/Form/Button";
import Spin from "../../UI/Spin";

import GlobalContext from "../../../context/General/GlobalContext";
import checkRange from "../../../utils/checkRange";

import useHttpClient from "../../../utils/hooks/useHttpClient";
import AuthContext from "../../../context/Auth/AuthContext";

const ProjectForm = ({ title, projectToEdit }) => {
  const router = useRouter();
  const [Values, setValues] = useState({
    title: projectToEdit?.title || "",
    description: projectToEdit?.description || "",
    isTeam: projectToEdit?.isTeam || null,
    githubLink: projectToEdit?.githubLink || "",
  });

  const { SetAlert } = useContext(GlobalContext);
  const handleChange = (e) => {
    setValues({ ...Values, [e.target.name]: e.target.value });
  };

  const { SendRequest, Loading } = useHttpClient();
  const { Token } = useContext(AuthContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!checkRange(Values.title.trim().length, 4, 101))
      return SetAlert({
        type: "error",
        message: "Title should have 5 - 100 characters.",
        title: "Error",
      });

    if (!checkRange(Values.description.trim().length, 99, 2001))
      return SetAlert({
        type: "error",
        message: "Title should have 100 - 2000 characters",
        title: "Error",
      });

    if (!checkRange(Values.githubLink.trim().length, 19, 1001))
      return SetAlert({
        type: "error",
        message: "Git Hub link should have 20 - 1000 characters",
        title: "Error",
      });

    if (!Values.isTeam)
      return SetAlert({
        type: "error",
        message: "Choose if is an individual or collaborative project",
        title: "Error",
      });
    const method = !projectToEdit ? "POST" : "PATCH";
    const endPoint = !projectToEdit
      ? `${process.env.APP_URL}/projects`
      : `${process.env.APP_URL}/projects/${router.query.projectId}`;

    SendRequest(
      endPoint,
      method,
      JSON.stringify({
        title: Values.title,
        isTeam: Values.isTeam,
        description: Values.description,
        githubLink: Values.githubLink,
      }),
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      }
    )
      .then((data) => {
        setValues({
          title: "",
          description: "",
          isTeam: null,
          githubLink: "",
        });
        SetAlert({
          type: "success",
          message: !projectToEdit
            ? "New project created"
            : "Project edited successfully",
          title: "Success",
        });
        router.push("/projects/" + data.project._id);
      })
      .catch((err) => {
        SetAlert({
          type: "error",
          message: err.message,
          title: "Something went wrong.",
        });
      });
  };
  return (
    <div style={{ marginBottom: "3rem" }}>
      <h2 className="text-center">{title}</h2>
      <form onSubmit={onSubmit}>
        <Input
          id="project_title"
          name="title"
          placeholder="Title"
          label="Title: Title is required"
          onChange={handleChange}
          value={Values.title}
          required
        />
        <Input
          element="textarea"
          id="project_description"
          name="description"
          placeholder="Description"
          label="Description: Description is required"
          onChange={handleChange}
          value={Values.description}
          required
        />
        <Input
          element="select"
          options={[
            { label: "Collaborative", value: true },
            { label: "Individual", value: false },
          ]}
          id="project_isTeam"
          name="isTeam"
          defaultValue={projectToEdit?.isTeam || "Collaborative or Individual"}
          label="Collaborative or Individual"
          onChange={handleChange}
          value={projectToEdit?.isTeam || Values.isTeam}
          required
        />

        <Input
          id="project_githubLink"
          name="githubLink"
          placeholder="Github Link"
          label="Github Link: Github Link is required"
          onChange={handleChange}
          value={Values.githubLink}
          type="url"
          required
        />

        <div className="flex-center">
          {!Loading ? (
            <Button
              text={!projectToEdit ? "Submit" : "Edit"}
              fade
              type="submit"
            />
          ) : (
            <Spin />
          )}
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
