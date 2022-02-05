import ResetStyle from './style/ResetStyle';
import Router from './Router';
import { ReactQueryDevtools } from "react-query/devtools"

const App = () => {
  return (
    <>
      <ResetStyle />
      <Router />
      <ReactQueryDevtools initialIsOpen={true}/>
    </>
  );
};

export default App;
