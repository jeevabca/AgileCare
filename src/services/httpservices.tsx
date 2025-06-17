import axios from "axios"
import { ENDPOINT } from "../utils/constant"


export const diabieticAPICALL = async (reqest: object) => {
    const response = await axios.post(ENDPOINT.DIABIETIC_PREDIC, reqest)
    return response.data

}

