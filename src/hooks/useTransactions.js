import { getTransactions } from "@/service/transactions";
import { useEffect, useState } from "react";

export default function useTransactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getTransactions()
            .then(res => setTransactions(res.data))
            .catch(err => {
                console.error("Erro ao buscar transações: ", err);

                const apiMessage = err.response?.data?.message;
                setError(apiMessage || "Erro ao carregar transações");
            })
            .finally(() => setLoading(false));
    }, [])

    return { transactions, loading, error };
}