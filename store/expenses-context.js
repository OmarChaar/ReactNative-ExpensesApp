import { createContext, useReducer  } from "react";
import { sortByLatest } from "../util/sorting";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e2',
        description: 'Cheese Stix',
        amount: 89.29,
        date: new Date('2021-11-05')
    },
    {
        id: 'e3',
        description: 'Some bananas',
        amount: 5.99,
        date: new Date('2022-05-01')
    },
    {
        id: 'e4',
        description: 'Laptop',
        amount: 5.99,
        date: new Date('2022-05-21')
    },
    {
        id: 'e5',
        description: 'Car',
        amount: 5.99,
        date: new Date('2022-05-17')
    },
    {
        id: 'e6',
        description: 'Lemons',
        amount: 51.99,
        date: new Date('2020-05-17')
    },
    {
        id: 'e7',
        description: 'Omar Chaar',
        amount: 500.99,
        date: new Date('1992-08-17')
    },
];



/* 
    Creating a context to be used throughout the app.
    Defining the shape of the context
*/
export const ExpensesContext = createContext({
    expenses: [],
    // Functions with params that are expected as arguments.
    setExpenses: (expenses) => {},
    addExpense: ({description, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {},
});

/*
    'expensesReducer' -> Reducer Function, it will receive a 'state' & 'action' object automatically. 
    Both values will be provided by React because this function will be connected to the 'useReducer' hook.

    'state' -> state managed by the 'useReducer' hook.
    'action' -> dispached by us.
*/
function expensesReducer(state, action) {
    if(action.type == 'SET') {
        const sortedExpenses = sortByLatest(action.payload);
        return sortedExpenses;
    }
    else if(action.type == 'ADD') {
        return [action.payload, ...state];
    }
    else if(action.type == 'UPDATE') {
        const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
        const updatableExpense = state[updatableExpenseIndex];

        const updatedItem = {...updatableExpense, ...action.payload.data};

        const updatedExpenses = [...state];
        updatedExpenses[updatableExpenseIndex] = updatedItem;

        return updatedExpenses;
    }
    else if(action.type == 'DELETE') {
       return state.filter(expense => expense.id !== action.payload) 
    }
    else {
        return state;
    }
}

/* 
    The provider function that holds the logic that will be used thoughtout the app.
    Add 'children' prop to wrap everything inside ExpensesContextProvider.
*/
function ExpensesContextProvider({children}) {

    // HERE WE ADD STATE MANAGEMENT LOGIC

    /*
        useReducer() -> a hook used for complex state management, it works with a reducer function
        that has to be defined as the first parameter of 'useReducer()'. Once it is defined we can 
        trigger the functions within the reducer function.

        second parameter of 'useReducer()' sets the initial value of the array.

        useReducer() -> returns an array with exactly 2 elements.
        1st element -> state that will be managed by the reducer.
        2nd element -> dispatch function to execute new functions that manipulate the state.
    */
    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    /*
        We added the 'setExpenses()' function to retrieve expenses from Firebase.
    */
    function setExpenses(expenses) {
        dispatch({type: 'SET', payload: expenses});
    }

    // How to use 'dispatch'
    function addExpense(expenseData) {
        /*
            to dispatch, we must pass an action that will be made available by React inside the 
            Reducer function as the 2nd parameter.

            '{type: 'ADD', payload: expenseData}' will be the 'action' dispatched in the Reducer function.
        */
        dispatch({type: 'ADD', payload: expenseData});
    }

    function deleteExpense(id) {
        dispatch({type: 'DELETE', payload: id});
    }

    function updateExpense(id, expenseData) {
        dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}});
    }

    // These values will expect the same parameters as declated in the 'creatContext()' method.
    const value = {
        expenses: expensesState,
        setExpenses: setExpenses,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    }

    return (
        <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
    )
}

export default ExpensesContextProvider;