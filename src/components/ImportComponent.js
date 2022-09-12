import { useRef, useState } from "react";
import toastr from "toastr";
import config from "../config";
import { DataService } from "../data/data.service";
export function Import({ onRebootCards }) {



    const [showButton, setShowButton] = useState(true);
    const textAreaRef = useRef(null)
    const handleClose = (_) => {
        setShowButton(!showButton)
    };

    const handleClick = (e) => {
        try {
            const data = textAreaRef.current.value;
            const arrayInfo = data.split("\n").map((elem) => {
                const result = elem.split(":").reverse()
                if (result.length != 2) {
                    console.error(result)
                    throw new Error("Format to import ")
                }
                return result
            })
            DataService.setInfo(arrayInfo)

            toastr.success("Importacion exitosa!")
            handleClose({})
            onRebootCards()

        } catch (err) {
            console.log(err, "IMPORT ERROR")
            toastr.error("Error del formato del texto importado")
        }
    };
    function ImportProcess() {
        return (<>
            <div className="form-group">
                <label for="exampleFormControlTextarea1">
                    Import text example: name:nombre
                    * be carefull with the linenew
                </label>
                <textarea
                    rows="20"
                    className="form-control"
                    ref={textAreaRef}
                    id="exampleFormControlTextarea1"
                >
                </textarea>
            </div>

            <button className="btn btn-secondary" onClick={handleClick}>Import</button>
            <button className="btn btn-danger" onClick={handleClose}>Cerrar</button>
        </>
        )
    }
    return (
        <div className="container mt-2">
            {showButton ? (
                <button className="btn btn-danger" onClick={handleClose}>Import Data Modal</button>
            ) : <ImportProcess />}
        </div>
    )
}