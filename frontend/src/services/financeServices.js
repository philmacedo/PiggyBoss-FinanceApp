import API from "../utils/api"

export const fetchTransactions = async () => {

    try {
        const response = await API["finance"].get("/transactions/");
        return response.data
    } catch (err) {
        return (Object.values(err.response.data).flat().join(' '))
    } 
}

export const fetchCards = async () => {
    try {
        const response = await API['finance'].get('/card/')
        return response.data
    } catch (err) {
        return { "error" : Object.values(err.response.data).flat().join(' ') }
    }
}

export const fetchBanks = async () => {
    try {
        const response = await API['finance'].get('/bank_account/')
        return response.data
    } catch (err) {
        return { "error" : Object.values(err.response.data).flat().join(' ') }
    }
}

export const fetchInstitution = async () => {
    try {
        const response = await API['finance'].get('/institution/')
        return response.data
    } catch (err) {
        return { "error" : Object.values(err.response.data).flat().join(' ') }
    }
}

export const fetchBalance = async () => {
    try {
        const response = await API['dashboard'].get('/month-balance/')
        return response.data
    } catch (err) {
        return { "error" : Object.values(err.response.data).flat().join(' ') }
    }
}

export const deleteTransaction = async (id) => {
  try {
    // Usa o endpoint 'transactions' com o ID e o método DELETE
    const { data } = await API['finance'].delete(`/transactions/${id}/`);
    return data;
  } catch (err) {
    console.error("Failed to delete transaction", err);
    return null;
  }
};

export const deleteBank = async (id) => {
    try {
        const { data } = await API['finance'].delete(`/bank_account/${id}/`);
        return data;
    } catch (err) {
        console.error("Failed to delete bank", err);
        throw err;
    }
};

export const deleteCard = async (id) => {
    try {
        const { data } = await API['finance'].delete(`/card/${id}/`);
        return data;
    } catch (err) {
        console.error("Failed to delete card", err);
        throw err;
    }
};

export const deleteCategory = async (id) => {
    try {
        const { data } = await API['finance'].delete(`/category/${id}/`);
        return data;
    } catch (err) {
        console.error("Failed to delete category", err);
        throw err;
    }
};