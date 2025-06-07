import API from "../utils/api"

const handleError = (err) => {
    if (err.response?.status === 401) {
      setError('Session Expired.')
    } else if (err.response?.data) {
      setError(Object.values(err.response.data).flat().join(' '))
    } else {
      setError('Erro inesperado.')
    }
  }

export const fetchMonthBalance = async (params) => {
    try {
        const { data } = await API['dashboard'].get('/month-balance', { params })
        return data
    } catch (err) {
        handleError(err)
        return null
    }
}

export const fetchExpensesByCategory = async (params) => {
    try {
        const { data } = await API['dashboard'].get('/expenses-by-category', { params })
        return data
    } catch (err) {
        handleError(err)
        return null
    }
}

export const fetchCategoryExpensesDistribution = async (params) => {
    try {
        const { data } = await API['dashboard'].get('/category-expenses-distribution', { params })
        return data
    } catch (err) {
        handleError(err)
        return null
    }
}

export const fetchMonthBillTotal = async (params) => {
    try {
        const { data } = await API['dashboard'].get('/month-bill-total', { params })
        return data
    } catch (err) {
        handleError(err)
        return null
    }
}