import swal from "sweetalert";
import config from "../config";

export class DataService {
    static loadInfo() {
        try {
            let informationTmp = localStorage.getItem(config.KEY_INFO_LOCAL_STORARE);
            return JSON.parse(informationTmp)
        } catch (err) {
            console.error(err)
            swal("Oops", "Error to load the information!", "error")
        }
    }
}