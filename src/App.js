import Provider from "./context/Provider";
import MainRouter from './components/MainRouter';

function App() {
  return (
    <Provider>
      <MainRouter />
    </Provider>
  );
}

export default App;
