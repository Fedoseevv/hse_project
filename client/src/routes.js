import {Switch, Route, Redirect} from "react-router-dom";
import {AuthPage} from "./pages/AuthPage/AuthPage";
import { UsersPage } from "./modules/Users/UsersPage/UsersPage";
import {DevicesPage} from "./modules/Devices/DevicesPage/DevicesPage";
import {SessionsPage} from "./modules/Sessions/SessionsPage/SessionsPage";
import {CurrentSession} from "./modules/Sessions/CurrentSession/CurrentSession";
import {PersonStat} from "./modules/Sessions/PersonStat/PersonStat";
import {TotalStat} from "./modules/Sessions/TotalStat/TotalStat";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                {/*<Route path="/" exact>*/}
                {/*    <MonitoringPage />*/}
                {/*</Route>*/}
                <Route path="/" exact>
                    <UsersPage />
                </Route>
                {/*<Route path="/statistics">*/}
                {/*    <StatisticPage />*/}
                {/*</Route>*/}
                <Route path="/devices">
                    <DevicesPage />
                </Route>
                <Route path="/sessions">
                    <SessionsPage />
                </Route>
                <Route path="/s/:id">
                    <CurrentSession />
                </Route>
                <Route path="/stat/:id">
                    <PersonStat />
                </Route>
                <Route path="/fullStat/:id">
                    <TotalStat />
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