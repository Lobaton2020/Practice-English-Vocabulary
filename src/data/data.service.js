import toastr from "toastr";
import config from "../config";

export class DataService {
    static loadInfo() {
        try {
            let informationTmp = localStorage.getItem(config.KEY_INFO_LOCAL_STORARE);
            if (!informationTmp) throw new Error("DATA NOT FOUND")
            return JSON.parse(informationTmp)
        } catch (err) {
            console.error(err)
            toastr.error("Oops", "Error to load the information!", "error")
            return []
        }
    }

    static setInfo(data) {
        try {
            localStorage.setItem(config.KEY_INFO_LOCAL_STORARE, JSON.stringify(data));
        } catch (err) {
            toastr.error("Fail to import data")
            console.error(err)
        }
    }
}