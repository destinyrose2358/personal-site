import { PropsWithChildren, useMemo } from "react";
import ProjectDataEngine from "../../../utils/projects/project-data";
import useProjectListState from "../../../utils/projects/use-project-list-state";
import { Container, Paper, Typography } from "@mui/material";
import SLink from "../../custom-material-ui/links/s-link";

export type ProjectPageProps = PropsWithChildren<{
    projectDataEngine: ProjectDataEngine;
}>;

export default function ProjectPage(props: ProjectPageProps): JSX.Element {
    const {children, projectDataEngine: {descriptionElement, title, wip, parentProject} } = props;
    const projectListEngine = useProjectListState();
    const renderedDescriptionElement = useMemo(() => {
        return descriptionElement({
            includeLink: false,
            projectListEngine,
            children: <>
                {children}
                {wip ? <Typography variant="info"> Work In Progress...More To Come In The Future!</Typography> : null}
            </>
        })
    }, [descriptionElement, projectListEngine, wip, children]);

    return <Paper variant="main">
        <Container
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                width: "100%"
            }}
        >
            {parentProject ? <SLink href={`/projects/${parentProject.getPath()}`}>{parentProject.title}</SLink> : null}
            <Typography style={{
                justifySelf: "center",
                gridColumn: 2
            }} variant="h5">{title}</Typography>
        </Container>
        {renderedDescriptionElement}
    </Paper>
}
