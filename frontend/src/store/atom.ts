import { atomFamily , selectorFamily } from "recoil";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const blogAtom = atomFamily({
    key : "blogAtom",
    default : selectorFamily({
        key : "blogSelectorFamily",
        get : (id : string) => async () => {
            const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            })
            return res.data.blogs;
        }
    })
})