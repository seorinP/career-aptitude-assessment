import { Redirect, Route, Switch } from "react-router-dom";
import { setLocale } from "yup";
import ko from "yup-locales-ko";
import "bootstrap/dist/css/bootstrap.min.css";

import Test from "pages/Test";
import Result from "pages/Result";

import "./App.css";
import Completed from "pages/Completed";
setLocale(ko);

const App = () => {
  return (
    // <div className="py-5">
    <div>
      <Switch>
        <Route path="/test">
          <Test />
        </Route>
        <Route path="/completed/:seq">
          <Completed />
        </Route>
        <Route path="/result/:seq">
          <Result />
        </Route>
        <Route path="/" exact>
          <Redirect to="/test" />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
