import { useRef, useState } from "react";
import swal from "sweetalert";
import config from "../config";



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
            localStorage.setItem(
                config.KEY_INFO_LOCAL_STORARE,
                JSON.stringify(arrayInfo)
            )
            swal("Great!!","Importacion exitosa","success")
            handleClose({})
            onRebootCards()
        } catch (err) {
            console.log(err, "IMPORT ERROR")
            swal("Opps! ","Error del formato del texto importado","error")
        }
    };
    function ImportProcess() {
        return (<>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">
                    Import text example: name:nombre
                    * be carefull with the linenew
                </label>
                <textarea
                    rows="20"
                    class="form-control"
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