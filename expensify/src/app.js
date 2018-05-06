import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import AppRouter from "./routers/AppRouter";
import configureStore from './store/configureStore'
import getVisibleExpenses from './selectors/expenses'
import {addExpense} from "./actions/expenses";
import {setTextFilter} from "./actions/filters";

const store = configureStore();

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses)
});


store.dispatch(addExpense({
    description: "Water bill",
    note: "overdue",
    amount: 100,
    createdAt: 1000,
}));

store.dispatch(addExpense({
    description: "Gas Bill",
    note: "not overdue",
    amount: 50,
    createdAt: 1000,
}));

store.dispatch(setTextFilter("gas"));

ReactDOM.render(<AppRouter/>, document.getElementById('app'));