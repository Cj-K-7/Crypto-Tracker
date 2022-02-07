import { BrowserRouter, Route, Switch } from "react-router-dom"
import CoinDetail from "./routes/CoinDetail";
import Coins from "./routes/Coins";

function Router() {
  return(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
            <Route path="/:coinId">
                <CoinDetail />
            </Route>
            <Route path="/">
                <Coins />
            </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default Router;
