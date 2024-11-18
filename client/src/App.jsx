import { useState } from "react";
import Routing from "./Routing";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  return <Routing isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />;
};

export default App;
