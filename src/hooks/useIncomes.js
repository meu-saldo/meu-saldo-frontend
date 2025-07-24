import { getIncomes } from "@/service/incomes";
import { useEffect, useState } from "react";

export default function useIncomes() {
    const [incomes, setIncomes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadIncomes = async () => {
        console.log("Atualizando entradas");

        try {
            setLoading(true);
            const data = await getIncomes();
            setIncomes(data);
            console.log("Entradas recebidas: ", data);
            setError(null);
        } catch (err) {
            setError("Erro ao buscar despesas")
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadIncomes();
    }, [])

    return { incomes, loading, error, loadIncomes };
}