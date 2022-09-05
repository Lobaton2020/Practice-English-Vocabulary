import { useState } from "react";
import { DataService } from "../data/data.service";
import { ListVocabulary } from "./shared/ListVocabularyComponent";

export function ShowVocabulary() {
    const [listVocabulary, _] = useState(DataService.loadInfo())
    const [showButton, setShowButton] = useState(true)
    if (listVocabulary.length == 0) {
        return (
            <>
                <h1>Data not found</h1>
            </>
        )
    }


    function ShowList() {
        const dataParsed = listVocabulary.map(([key, value]) => ({ data: [value, key] }))
        return (
            <>
                <ListVocabulary arrayElements={dataParsed} showConter={false} />
            </>
        )
    }

    return (<>
        <div className="container mt-2">
            {showButton ? (
                <button className="btn btn-info" onClick={() => setShowButton(!showButton)}>Show List</button>
            ) : <ShowList />}
        </div>
    </>)
}