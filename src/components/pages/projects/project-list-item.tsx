import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ProjectDataEngine from "../../../utils/projects/project-data";
import { SyntheticEvent, useCallback, useMemo } from "react";
import { PropsWithProjectListEngine } from "../../../utils/projects/use-project-list-state";

export type ProjectListItemProps = PropsWithProjectListEngine<{
    projectDataEngine: ProjectDataEngine;
}>

export default function ProjectListItem(props: ProjectListItemProps): JSX.Element {
    const { projectDataEngine: { wip, title, descriptionElement, getPath}, projectListEngine: { selection, updateSelection }, projectListEngine} = props;
    const isSelected = useMemo(() => {
        const splitSelection = selection.split("/");
        return getPath().split("/").every((value, index) => { return value === splitSelection[index]});
    }, [selection, getPath]);
    const renderedDescriptionElement = useMemo(() => {
        return descriptionElement({ projectListEngine });
    }, [descriptionElement, projectListEngine]);
    const updateParentSelectionToSelf = useCallback((event: SyntheticEvent<Element, Event>, expanded: boolean) => updateSelection(getPath())(event, expanded), [
        getPath,
        updateSelection
    ]);

    return <Accordion expanded={isSelected} onChange={updateParentSelectionToSelf}>
        <AccordionSummary>
            <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                <Typography>{title}</Typography>
                {wip ? <Typography variant="info">WIP</Typography> : null}
            </div>
        </AccordionSummary>
        <AccordionDetails>
            {renderedDescriptionElement}
        </AccordionDetails>
    </Accordion>
}
