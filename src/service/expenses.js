import api from "./axiosConfig"

export const getExpenses = async () => {
    const response = await api.get('/expenses');
    return response.data;
};

export const createExpense = async (expense) => {
    return await api.post("/expenses", expense);
};

export const updateExpense = async (id, expense) => {
    return await api.put(`/expenses/${id}`, expense);
}

export const deleteExpense = async (id) => {
    return await api.delete(`/expenses/${id}`);
}