import API from "../utils/api"

export const fetchCards = async () => {
    try {
        const { data } = await API['finance'].get('/card')
        return data
    } catch (err) {
        return { "error" : Object.values(err.response.data).flat().join(' ') }
    }
}

export const fetchBanks = async () => {
    try {
        const { data } = await API['finance'].get('/bank_account')
        return data
    } catch (err) {
        return { "error" : Object.values(err.response.data).flat().join(' ') }
    }
}

export const fetchBalance = async () => {
    try {
        const { data } = await API['dashboard'].get('/month-balance')
        return data
    } catch (err) {
        return { "error" : Object.values(err.response.data).flat().join(' ') }
    }
}