import axios from 'axios';

const rootURL = 'https://expensestracker-f97ac-default-rtdb.firebaseio.com/';
const expensesURL = rootURL + 'expenses.json';
export function storeExpense(data) {

    axios.post(expensesURL, data);
}