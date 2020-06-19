import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import List from './components/common/list/List';
import './index.css';
import Header from "./components/common/header/Header";
import Detail from "./components/detail/Detail";
import AnalyzeForm from "./components/form/AnalyzeForm";
import AddForm from "./components/addForm/AddForm";

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={List} />
                    <Route exact path="/ingredients/id/:id" component={Detail} />
                    <Route exact path="/analyze" component={AnalyzeForm} />
                    <Route exact path="/ingredients/add" component={AddForm} />
                    <Route exact path="/ingredients/edit" component={AddForm} />
                    {/*<Route exact path="/analyze" component={Detail} />*/}
                    {/*<Route component={NotFound} />*/}
                </Switch>
            </div>
        </BrowserRouter>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));