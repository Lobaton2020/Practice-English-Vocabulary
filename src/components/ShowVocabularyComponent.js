import { useState } from "react";
import { ListVocabulary } from "./shared/ListVocabularyComponent";

export function ShowVocabulary({ vocabularyList }) {
    const [showButton, setShowButton] = useState(true)
    if (vocabularyList.length == 0) {
        return (
            <>
                <h1>Data not found</h1>
            </>
        )
    }


    function ShowList() {
        const dataParsed = vocabularyList.map(([key, value]) => ({ data: [value, key] }))
        return (
            <>
                <button className="btn" onClick={() => setShowButton(!showButton)}>Cerrar</button>
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