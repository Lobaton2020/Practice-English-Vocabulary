import { useContext, useState } from "react";
import { ACTIONS, AppContext } from "../../App";
import toastr from "toastr";
import { DataService } from "../../data/data.service";

export default function AddItemVocabulary() {
    const [state, dispatch] = useContext(AppContext);
    const [showButton, setShowButton] = useState(true);
    const handleClose = () => setShowButton(!showButton);
    const handleSubmit = (e) => {
        const payload = [
            e.target.spanish.value,
            e.target.english.value,
        ];
        const newVocabularyList = [...state.vocabularyList, [...payload]];
        dispatch({
            type: ACTIONS.ADD_VOCABULARY,
            payload: newVocabularyList
        })
        DataService.setInfo(newVocabularyList)
        toastr.success("Item añadido correctamente")
        handleClose()
    };

    function FormItem() {
        return (

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" className="form-control" name="spanish" placeholder="Verbo en español" />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" name="english" placeholder="Verbo en ingles" />
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-success">Añadir</button>
                    <button className="btn btn-warning" onClick={handleClose}>Close</button>
                </div>
            </form>)
    }
    return (
        <div className="container mt-2">
            {showButton ? (
                <button className="btn btn-secondary" onClick={handleClose}>Add item form</button>
            ) : (<FormItem />)}
        </div>
    )
}