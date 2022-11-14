import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navBar";
import Movies from "./Movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
function App() {
  return (
    <main>
      <NavBar />
      <div className="container">
        <Switch>
          <Route path="/movies" exact component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/notfound" component={NotFound} />
          <Route path="/movies/:id" component={MovieForm} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="notfound" />
        </Switch>
      </div>
    </main>
  );
}

export default App;
