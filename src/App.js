import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom';
import MiniDrawer from './shared/component/navigation';
import AddBuilding from './buildings/pages/AddBuilding';
import AddRoom from './rooms/pages/AddRoom';
import UpdateRoom from './rooms/pages/UpdateRoom';
import AddWorkDays from './workdays/pages/AddWorkDays';
import UpdateWorkDays from './workdays/pages/UpdateWorkDays';
import HomePage from './shared/pages/HomePage';
import { Helmet } from 'react-helmet';

export default function App() {
    return (
        <React.Fragment>
            <Helmet>
                <meta
                    http-equiv='Content-Security-Policy'
                    content="script-src 'self';"
                />
            </Helmet>
            <Router>
                <div>
                    <MiniDrawer>
                        <Switch>
                            <Route path='/' exact>
                                <HomePage></HomePage>
                            </Route>
                            <Route path='/add-building' exact>
                                <AddBuilding></AddBuilding>
                            </Route>
                            <Route path='/add-room' exact>
                                <AddRoom></AddRoom>
                            </Route>
                            <Route path='/update-room' exact>
                                <UpdateRoom></UpdateRoom>
                            </Route>
                            <Route path='/add-workdays' exact>
                                <AddWorkDays></AddWorkDays>
                            </Route>
                            <Route path='/update-workdays' exact>
                                <UpdateWorkDays></UpdateWorkDays>
                            </Route>
                            <Redirect to='/'></Redirect>
                        </Switch>
                    </MiniDrawer>
                </div>
            </Router>
        </React.Fragment>
    );
}

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>Aboutdfggfsdafsdsdsdsdsdsdsdsdsdsdsdsdsdsdddddd</h2>;
}

function Users() {
    return (
        <h2>
            Usersdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        </h2>
    );
}
