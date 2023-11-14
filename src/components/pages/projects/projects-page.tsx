import ProjectsList from "./projects-list";
import useProjectListState from "../../../utils/projects/use-project-list-state";
import { Paper, Typography } from "@mui/material";

export default function ProjectsPage(): JSX.Element {
    const projectListEngine = useProjectListState();
    return <Paper variant="main">
        <Typography variant="h3">Projects</Typography>
        <ProjectsList projectListEngine={projectListEngine} />
    </Paper>
}
