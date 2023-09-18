import {Switch, Route, Redirect} from "react-router-dom";
import {AuthPage} from "./pages/AuthPage/AuthPage";
import { StatisticPage } from "./pages/StatisticPage/StatisticPage";
import { OnlineGraph } from "./pages/OnlineGraph/OnlineGraph";
import { MonitoringPage } from './pages/MonitoringPage/MonitoringPage';
import { UsersPage } from "./modules/Users/UsersPage/UsersPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/" exact>
                    <MonitoringPage />
                </Route>
                <Route path="/statistics">
                    <StatisticPage />
                </Route>
                <Route path="/users">
                    <UsersPage />
                </Route>
            </Switch>
        );
    }
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    );
}