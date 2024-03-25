import { Routes,Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import Form from "./component/Form";
import Record from "./component/Record";
import Login from "./component/Login";
import Pdf from "./component/Pdf";
import Upload from "./component/Upload";



function App() {
  return (
    <div className="App">
       <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/form' element={<Form/>}/>
          <Route path='/records' element={<Record/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/upload' element={<Upload/>}/>
          <Route path='/pdf' element={<Pdf/>}/>
        </Routes>
    </div>
  );
}

export default App;
