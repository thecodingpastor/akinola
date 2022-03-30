import ProtectedRoute from "../../components/Layout/ProtectedRoute";
import ProjectForm from "../../components/Pages/Projects/ProjectForm";

const Projects = () => {
  return (
    <ProtectedRoute>
      <div className="container">
        <ProjectForm title="Create Project" />
      </div>
    </ProtectedRoute>
  );
};

export default Projects;
