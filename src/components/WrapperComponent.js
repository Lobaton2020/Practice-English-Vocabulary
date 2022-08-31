import { useState } from "react";
import { DataService } from "../data/data.service";
import { Cards } from "./CardsComponent";
import { Import } from "./ImportComponents";

export function Wrapper() {
    const [info, setInfo] = useState(DataService.loadInfo())
    function rebootCards() {
        setInfo(DataService.loadInfo())
    }
    return (
        <>
            <Cards onRebootCards={rebootCards} arrayDict={info} />
            <Import onRebootCards={rebootCards} />
        </>
    )
}