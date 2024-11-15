import { useState } from "react";
import Routing from "./Routing";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(true);
  return <Routing isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />;
};

export default App;
