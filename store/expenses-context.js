import { createContext, useReducer  } from "react";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e2',
        description: 'A pair of pants',
        amount: 89.29,
        date: new Date('2022-01-05')
    },
    {
        id: 'e3',
        description: 'Some bananas',
        amount: 5.99,
        date: new Date('2021-12-01')
    },
    {
        id: 'e4',
        description: 'Chicken Cheese',
        amount: 14.99,
        date: new Date('2022-05-19')
    },
    {
        id: 'e5',
        description: 'Another Book',
        amount: 18.59,
        date: new Date('2022-02-18')
    },
    {
        id: 'e6',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e7',
        description: 'A pair of pants',
        amount: 89.29,
        date: new Date('2022-01-05')
    },
    {
        id: 'e8',
        description: 'Some bananas',
        amount: 5.99,
        date: new Date('2021-12-01')
    },
    {
        id: 'e9',
        description: 'Book',
        amount: 14.99,
        date: new Date('2022-02-15')
    },
    {
        id: 'e10',
        description: 'Another Book',
        amount: 18.59,
        date: new Date('2022-02-18')
    },
    {
        id: 'e11',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e12',
        description: 'A pair of pants',
        amount: 89.29,
        date: new Date('2022-01-05')
    },
    {
        id: 'e13',
        description: 'Some bananas',
        amount: 5.99,
        date: new Date('2021-12-01')
    },
    {
        id: 'e14',
        description: 'Book',
        amount: 14.99,
        date: new Date('2022-02-15')
    },
    {
        id: 'e15',
        description: 'Another Book',
        amount: 18.59,
        date: new Date('2022-02-18')
    },
    {
        id: 'e16',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2022-05-19')
    },
    {
        id: 'e17',
        description: 'A pair of pants',
        amount: 89.29,
        date: new Date('2022-01-05')
    },
    {
        id: 'e18',
        description: 'Some bananas',
        amount: 5.99,
        date: new Date('2021-05-17')
    },
    {
        id: 'e19',
        description: 'Book',
        amount: 14.99,
        date: new Date('2022-02-15')
    },
    {
        id: 'e20',
        description: 'Burgers',
        amount: 18.59,
        date: new Date('2022-05-18')
    }
];

/* 
    Creating a context to be used throughout the app.
    Defining the shape of the context
*/
export const ExpensesContext = createContext({
    expenses: [],
    // Functions with params that are expected as arguments.
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
    if(action.type == 'ADD') {
        const id = new Date().toString() + Math.random().toString();
        return [{...action.payload, id: id}, ...state];
    }
    if(action.type == 'UPDATE') {
        const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
        const updatableExpense = state[updatableExpenseIndex];

        const updatedItem = {...updatableExpense, ...action.payload.data};

        const updatedExpenses = [...state];
        updatedExpenses[updatableExpenseIndex] = updatedItem;

        return updatedExpenses;
    }
    if(action.type == 'DELETE') {
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
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

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
        console.log("deleteExpense id", id);
        dispatch({type: 'DELETE', payload: id});
    }

    function updateExpense(id, expenseData) {
        dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}});
    }

    // These values will expect the same parameters as declated in the 'creatContext()' method.
    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    }

    return (
        <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
    )
}

export default ExpensesContextProvider;