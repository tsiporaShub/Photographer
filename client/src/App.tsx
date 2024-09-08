import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopNavComponent from './components/topNav.component';
import SigninFormComponent from './components/signin.component.tsx';
import SignupFormComponent from './components/signup.component.tsx';
import OrderFormComponent from './components/orderPackage.tsx';

function App() {
  return (
    <Router>
       <Routes>
         <Route path="/" element={<TopNavComponent />} />
         <Route path="/signin" element={<SigninFormComponent />} />
         <Route path="/signup" element={<SignupFormComponent />} />
         <Route path="/order" element={<OrderFormComponent />}>
           {/* <Route path=":id" element={<OrderFormComponent />} /> */}
         </Route>
       </Routes>
    </Router>
  );
}
export default App;