import Axios from "../../Axios";

export const postUserRegister = async (userInformatins) => await Axios.post('/userRegister' , userInformatins)