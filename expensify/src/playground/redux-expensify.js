import {combineReducers, createStore} from "redux";
import uuid from 'uuid';

const addExpense = ({description = '', note = '', amount = 0, createdAt = 0} = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

const removeExpense = ({id}) => ({
    type: 'REMOVE_EXPENSE',
    id,
});

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

const setTextFilter = (filter) => ({
    type: 'SET_TEXT_FILTER',
    filter,
});

const sortByDate = () => sortBy('date');
const sortByAmount = () => sortBy('amount');

const sortBy = (field) => ({
    type: 'SET_SORT_BY',
    field
});

const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});


const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLocaleLowerCase().includes(text.toLocaleLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        switch(sortBy) {
            case 'date':
                return a.createdAt < b.createdAt ? 1 : -1;
            case 'amount':
                return a.amount < b.amount ? 1 : -1;
        }
    });
};


const demoState = {
    expenses: [{
        id: 'poasda',
        description: 'January Rent',
        note: 'This was the final payment for that address',
        amount: 54500,
        createdAt: 0,
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
};

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            return state.filter(({id}) => id !== action.id);
        case 'EDIT_EXPENSE' :
            return state.map((expense) => {
                return expense.id === action.id ?
                    {...expense, ...action.updates}
                    : expense;
            });
        default:
            return state;
    }
};

const filtersDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
};

const filtersReducer = (state = filtersDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.filter
            };
        case 'SET_SORT_BY':
            return {
                ...state,
                sortBy: action.field
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate,
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate,
            };
        default:
            return state;
    }
};

const store = createStore(combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
}));


store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses)
});

const coffeeExpense = store.dispatch(addExpense({description: 'Coffee', amount: 300, createdAt: 500}));
const rentExpense = store.dispatch(addExpense({description: 'Rent', amount: 100, createdAt: 600}));


// store.dispatch(removeExpense({id: rentExpense.expense.id}));
//
// store.dispatch(editExpense(coffeeExpense.expense.id, {amount: 500}));
//
// store.dispatch(setTextFilter('rent'));
//
// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
//
// store.dispatch(setStartDate(600));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(400));
store.dispatch(sortByDate());