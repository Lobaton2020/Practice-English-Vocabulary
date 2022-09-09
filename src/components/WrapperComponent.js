import { useContext, useEffect } from "react";
import { ACTIONS, AppContext } from "../App";
import { DataService } from "../data/data.service";
import { Cards } from "./CardsComponent";
import { Import } from "./ImportComponent";
import { ShowVocabulary } from "./ShowVocabularyComponent";

export function Wrapper() {
    const [state, dispatch] = useContext(AppContext);

    useEffect(() => {
        dispatch({
            type: ACTIONS.ADD_VOCABULARY,
            payload: DataService.loadInfo()
        })

    }, [])
    useEffect(() => {
        console.log("En el wrapper", state)
    }, [state])

    const rebootCards = () => {
        dispatch({
            type: ACTIONS.ADD_VOCABULARY,
            payload: DataService.loadInfo()
        })
    };
    return (
        <>
            <Cards onRebootCards={rebootCards} arrayDict={state.vocabularyList} />
            <Import onRebootCards={rebootCards} />
            <ShowVocabulary vocabularyList={state.vocabularyList} />
        </>
    )
}