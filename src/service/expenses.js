import api from "./axiosConfig"

export const getExpenses = async () => {
    const response = await api.get('/expenses');
    return response.data;
};

export const createExpense = async (expense) => {
    return await api.post("/expenses", expense);
};