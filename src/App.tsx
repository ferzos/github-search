import style from "./App.module.css";
import { HomeLayout } from "./pages";

const App = () => {
  return (
    <div className={style.appContainer}>
      <HomeLayout />
    </div>
  );
};

export default App;