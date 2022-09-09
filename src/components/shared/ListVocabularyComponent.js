import { useContext } from "react";
import { ACTIONS, AppContext } from "../../App";
import { DataService } from "../../data/data.service";

export function ListVocabulary({ arrayElements, showConter = true }) {
    const [state, dispatch] = useContext(AppContext);
    const handleDelete = ([key, val]) => {
        const newList = state.vocabularyList.filter(([keyIn, valueIn]) => !(keyIn == val && valueIn == key))
        DataService.setInfo(newList)
        dispatch({
            type: ACTIONS.ADD_VOCABULARY,
            payload: newList
        })
    };
    return (
        <ul className="list-group my-3">
            {arrayElements.map((item, i) => {
                const [espanol, english] = item.data;
                return (
                    <li key={i} className="list-group-item">
                        <span className="align-middle">
                            <b>{english}</b>: {espanol}
                            {showConter ? <span className="badge">{item.counter} attempt/s</span> : <></>}
                        </span>
                        <button className="btn btn-danger btn-md d-inline float-right" onClick={() => handleDelete(item.data)}> X </button>
                    </li>
                )
            })}
        </ul>
    )
}