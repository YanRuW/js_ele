//JavaScript Document
import "@babel/polyfill";
import React, {Component, Fragment} from "react";
import ReactDOM, {render} from "react-dom";
import {HashRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store"
import App from "./container/app";
import Loadable from "react-loadable";

let Contracted = Loadable({
    loader: () => import("./container/contracted"),
    loading: () => null
});
let Contract = Loadable({
    loader: () => import("./container/contract"),
    loading: () => null
});
let ElecNumber = Loadable({
    loader: () => import("./component/elecNumber"),
    loading: () => null
});
let Protocol = Loadable({
    loader: () => import("./component/protocol"),
    loading: () => null
});
let Detail = Loadable({
    loader: () => import("./container/detail"),
    loading: () => null
});
let Home1 = Loadable({
    loader: () => import("./component/home1"),
    loading: () => null
});
let Home2 = Loadable({
    loader: () => import("./component/home2"),
    loading: () => null
});
ReactDOM.render(<Provider store={store}>
<Router>
    <App>
        <Switch>
            <Home1 exact path="/" component={Contract}/>
            {/* <Route exact path="/" component={Contract}/> */}
            <Home2  path="/contracted"  component={Contracted} />
            {/* <Route  path="/contracted" component={Contracted} /> */}
            {/* <Route  path="/contract" component={Contract} /> */}
            <Route path="/detail" component={Detail} />
            <Route path="/elecNumber" component={ElecNumber} />
            <Route path="/protocol" component={Protocol} />
            <Redirect to="/" />
        </Switch>
    </App>
</Router></Provider>, document.getElementById("root"));