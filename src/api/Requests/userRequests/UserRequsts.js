import Axios from "../../Axios";

export const postUserRegister = (userInformatins) => Axios.post('/userRegister' , userInformatins)