import api from "./axiosConfig"

export const getIncomes = async () => {
    const response = await api.get('/incomes');
    return response.data;
};

export const addIncome = async (expense) => {
    return await api.post('/incomes', expense);
};

export const deleteIncome = async (id) => {
    return await api.delete(`/incomes/${id}`);
};

export const editIncome = async (id, expense) => {
    return await api.put(`/incomes/${id}`, expense);
};