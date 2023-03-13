import { HomeLayout } from "./pages";

import style from "./App.module.css";

const App = () => {
  return (
    <div className={style.appContainer}>
      <HomeLayout />
    </div>
  );
};

export default App;
