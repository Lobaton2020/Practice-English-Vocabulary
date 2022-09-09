import { useEffect, useRef, useState } from "react";
import toastr from 'toastr'
import { ListVocabulary } from "./shared/ListVocabularyComponent";
toastr.options.progressBar = true
toastr.options.positionClass = 'toast-bottom-right'

export function Cards({ arrayDict: information, onRebootCards }) {
    const inputRef = useRef(null)
    const [showButton, setShowButton] = useState(true)
    const [elementsDone, setElementsDone] = useState([])
    const [showElementsDone, setsShowElementsDone] = useState(false)
    const [currentElement, setCurrentElement] = useState(null)


    useEffect(() => {
        setsShowElementsDone(false)
        setCurrentElementHelp()
    }, [information])

    const setCurrentElementHelp = () => {
        const max = information.length;
        if (!max) {
            toastr.info("Plase import a fields__")
            return
        }
        const randIndex = Math.floor(Math.random() * max)
        if (information[randIndex] == null) return
        setCurrentElement({
            counter: 1,
            data: [...information[randIndex]]
        })
    }
    const handleClose = (e) => {
        onRebootCards()
        setElementsDone([])
        setsShowElementsDone(false)
        setCurrentElementHelp()
        setShowButton(!showButton)
    };

    const handleValidate = () => {
        const typed = inputRef.current.value;
        if (typeof typed != "string") {
            toastr.error("Please add a correct vale")
            return
        }
        if (typeof currentElement.data[1] != "string") {
            toastr.error("Opp! It have an error with the value")
            return
        }
        if (typed.trim().toLowerCase() == currentElement.data[1].trim().toLowerCase()) {
            if (elementsDone.length >= information.length) {
                setsShowElementsDone(true)
                toastr.warning("You have finished the words")
                return
            }
            const newElementDone = {
                counter: currentElement.counter,
                data: currentElement.data
            };
            setElementsDone([...elementsDone, newElementDone])
            toastr.success(`Well done!! ${currentElement.counter} attempts`)
            inputRef.current.value = ''
            setCurrentElementHelp()
        } else {

            currentElement.counter++;
            if((currentElement.counter - 1) >= 3){
                toastr.info("Attepmts fulled, We show you the correct answer")
                inputRef.current.value = currentElement.data[1]
            }

            toastr.error(`Try again, ${currentElement.counter - 1} attempts`)
            setCurrentElement({
                ...currentElement,
                counter: currentElement.counter
            })
        }

    }
    const handleKeyup = (e) => {
        if (e.key == "Enter") {
            handleValidate()
        }
    }
    const handleRebootCards = () => {
        onRebootCards()
        setElementsDone([])
        setsShowElementsDone(false)
        setCurrentElementHelp()
    }
    function ShowElementsDone() {
        try {

            if (showElementsDone) {
                return (<ListVocabulary arrayElements={elementsDone} />)
            }
        } catch (e) {
            console.log(e, "EEEE")
        }
        return <></>
    }
    function ShowValidateButton() {
        return (
            <div className="input-group-append">
                <button onClick={handleValidate} disabled={showElementsDone ? true : false} className="btn btn-outline-secondary" type="button" id="button-addon2">Validar</button>
            </div>
        )
    }

    return (
        <div className="container mt-2">
            {showButton ? (
                <button className="btn btn-info" onClick={handleClose}>Cards</button>
            ) :
                <>
                    <div className="input-group flex-nowrap">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="addon-wrapping">{(currentElement || { data: [] }).data[0] || 'Reinicia la app'}</span>
                        </div>
                        <input onKeyUp={handleKeyup} ref={inputRef} type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" />
                        <ShowValidateButton />
                    </div>
                    <ShowElementsDone />
                    <button className="btn btn-danger" onClick={handleClose}>Cerrar</button>
                    <button className="btn" onClick={handleRebootCards}>Reiniciar</button>
                </>}
        </div>
    )
}