import axios from 'axios';

const ROOT_URL = 'https://expensestracker-f97ac-default-rtdb.firebaseio.com';

/*
    'axios' is a 3rd party api used to make http requests simpler.
*/
export async function storeExpense(data) {
    const response = await axios.post(ROOT_URL + '/expenses.json', data);
    // 'name' property is the ID generated by Firebase.
    const id = response.data.name;
    return id;
}

/*
    Instead of using .then() we will use 'async' await functions.
*/
export async function fetchExpenses() {
    const response = await axios.get(ROOT_URL + '/expenses.json');
    
    const expenses = [];

    for(const key in response.data) {

        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        }
        
        expenses.push(expenseObj);
    }

    return expenses;
}

export function updateExpense(id, data) {
    return axios.put(ROOT_URL + `/expenses/${id}.json`, data);
}

export function deleteExpense(id) {
    return axios.delete(ROOT_URL + `/expenses/${id}.json`);
}