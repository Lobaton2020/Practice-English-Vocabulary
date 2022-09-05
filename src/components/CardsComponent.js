import { useEffect, useRef, useState } from "react";
import toastr from 'toastr'
import { ListVocabulary } from "./shared/ListVocabularyComponent";
toastr.options.progressBar = true
toastr.options.positionClass = 'toast-bottom-left'
export function Cards({ arrayDict, onRebootCards }) {
    const inputRef = useRef(null)
    const [information, setInformation] = useState(arrayDict);
    const [showButton, setShowButton] = useState(true)
    const [elementsDone, setElementsDone] = useState([])
    const [showElementsDone, setsShowElementsDone] = useState(false)
    const [currentElement, setCurrentElement] = useState(null)


    useEffect(() => {
        setInformation(arrayDict)
        setsShowElementsDone(false)
        if (information.length == 0) {
            toastr.info("Plase import a fields")
            return
        }
        addACurrentValue()
    }, [arrayDict])

    const addACurrentValue = () => {
        const max = information.length;
        const randIndex = Math.floor(Math.random() * max)
        if (information[randIndex] == null) return
        setCurrentElement({
            counter: 1,
            data: [...information[randIndex]]
        })
        const newInfo = information.filter((_, i) => i != randIndex);
        setInformation(newInfo)
    }
    const handleClose = (e) => {
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
            if(elementsDone.length >= arrayDict.length){
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
            addACurrentValue()
            if (!information.length) {
                setsShowElementsDone(true)
            }

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
        window.location.reload()
        // console.log(arrayDict.length,"GENERAL")
        // console.log(information, currentElement, "++++++")
        // setElementsDone([])
        // setInformation(arrayDict)
        // setsShowElementsDone(false)
        // addACurrentValue()
        // console.log(information, currentElement, "_____")
        // // onRebootCards()
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
    console.log(currentElement)
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