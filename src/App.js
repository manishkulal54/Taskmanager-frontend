import Signup from './Authpages/Signup';
import Signin from './Authpages/Signin';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="*" element={<><h1>404 Page not found</h1></>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
