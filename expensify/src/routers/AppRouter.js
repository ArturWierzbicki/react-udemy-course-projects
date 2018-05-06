import {BrowserRouter, Route, Switch} from "react-router-dom";
import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
import AddExpensePage from "../components/AddExpensePage";
import HelpPage from "../components/HelpPage";
import EditExpensePage, {EXPENSE_ID_PARAM} from "../components/EditExpensePage";
import NotFoundPage from "../components/NotFoundPage";
import Header from "../components/Header";




export default () => (
    <BrowserRouter>
        <div>
            <Header/>
            <Switch>
                <Route exact={true} path="/" component={ExpenseDashboardPage}/>
                <Route path="/create" component={AddExpensePage}/>
                <Route path="/help" component={HelpPage}/>
                <Route path={`/edit/:${EXPENSE_ID_PARAM}`} component={EditExpensePage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </BrowserRouter>
);
