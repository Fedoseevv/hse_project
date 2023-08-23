import {Switch, Route, Redirect} from "react-router-dom";
import {AuthPage} from "./pages/AuthPage/AuthPage";
import { StatisticPage } from "./pages/StatisticPage/StatisticPage";
import { OnlineGraph } from "./pages/OnlineGraph/OnlineGraph";
import { MonitoringPage } from './pages/MonitoringPage/MonitoringPage';

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
                {/* <Route path="/addEmp" exact>
                    <AddBook/>
                </Route>

                <Route path={"/collections"}>
                    <CollectionPage />
                </Route>
                <Route path={"/collection/:id"}>
                    <TargetCollection />
                </Route>
                <Route path={"/addCollection"}>
                    <AddCollection />
                </Route>
                <Route path={"/search"}>
                    <SearchPage />
                </Route>
                <Route path={'/authors'}>
                    <AuthorPage />
                </Route>
                <Route path={'/addAuthor'}>
                    <AddAuthor />
                </Route>
                <Route path="/addPatient">
                    <AddDocument/>
                </Route>

                <Route path="/addPharm">
                    <AddArticle/>
                </Route>

                <Route path={'/staffManage'}>
                    <AllSourcesPage />
                </Route>

                <Route path={"/"}>
                    <AllSourcesPage />
                </Route> */}

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