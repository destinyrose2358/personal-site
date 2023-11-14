import { useMemo } from "react";
import { ProjectDataEngineCollection } from "../../../utils/projects/project-data";
import ProjectListItem from "./project-list-item";
import { PROJECTS } from "./project-pages";
import { PropsWithProjectListEngine } from "../../../utils/projects/use-project-list-state";

export type ProjectsListProps = PropsWithProjectListEngine<{
    projects?: ProjectDataEngineCollection;
}>

export default function ProjectsList(props: ProjectsListProps): JSX.Element {
    const { projects = PROJECTS, projectListEngine } = props;

    const renderedListItems = useMemo(() => {
        return Object.values(projects).map((project, index) => <ProjectListItem projectDataEngine={project} key={index} projectListEngine={projectListEngine} />)
    }, [projects, projectListEngine]);

    return <div>
        {renderedListItems}
    </div>
}