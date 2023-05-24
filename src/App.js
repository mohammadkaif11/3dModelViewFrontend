import AppNavbar from "./Component/AppNavbar";
import { Router, Routes,Route } from 'react-router-dom'
import ThreeDimensionView from "./Component/ThreeDimensionView";
import Landing from "./Component/Landing";
function App() {
  return (
    <>
    <AppNavbar/>
    <Routes>
        <Route exact path='/' Component={Landing}/>
        <Route exact path='/3dview/:id' Component={ThreeDimensionView}/>
    </Routes>
    </>
  );
}

export default App;