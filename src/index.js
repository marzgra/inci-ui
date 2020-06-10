import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import List from './components/common/list/List';
// import Detail from './components/detail/Detail';
// import NotFound from './components/notfound/NotFound';
import './index.css';
import Header from "./components/common/header/Header";
import Detail from "./components/detail/Detail";
import AnalyzeForm from "./components/form/AnalyzeForm";

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={List} />
                    <Route exact path="/ingredients/id/:id" component={Detail} />
                    <Route exact path="/analyze" component={AnalyzeForm} />
                    {/*<Route exact path="/functions" component={Detail} />*/}
                    {/*<Route exact path="/analyze" component={Detail} />*/}
                    {/*<Route component={NotFound} />*/}
                </Switch>
            </div>
        </BrowserRouter>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));