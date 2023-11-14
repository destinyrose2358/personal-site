import { SyntheticEvent, useCallback, useState } from "react";

export type ProjectListEngine = {
    selection: string;
    updateSelection: (path: string) => (event: SyntheticEvent, isExpanded: boolean) => void;
}

export type PropsWithProjectListEngine<T> = T & {
    projectListEngine: ProjectListEngine;
};

export default function useProjectListState(): ProjectListEngine {
    const [selection, setSelection] = useState("");
    const updateSelection: (path: string) => (event: SyntheticEvent, isExpanded: boolean) => void = useCallback((path) => (event, isExpanded) => {
        setSelection(isExpanded ? path : path.split("/").slice(0,-1).join("/"));
    }, []);

    return {
        selection,
        updateSelection
    }
}
