import api from "../service/axiosConfig";

export const getTransactions = () => {
    return api.get('/transactions')
}
