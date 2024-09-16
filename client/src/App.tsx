import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopNavComponent from './components/topNav.component';
import SigninFormComponent from './components/signin.component.tsx';
import SignupFormComponent from './components/signup.component.tsx';
import OrderFormComponent from './components/orderPackage.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import Footer from './components/footer.component.tsx';

function App() {
  return (
    <Provider store={store}>
      {/* <TopNavComponent /> */}
      <Router>
        <TopNavComponent />
        <Routes>
          <Route path="/" element={<SigninFormComponent />} />
          <Route path="/signin" element={<SigninFormComponent />} />
          <Route path="/signup" element={<SignupFormComponent />} />
          <Route path="/order" element={<OrderFormComponent />}>
            {/* <Route path=":id" element={<OrderFormComponent />} /> */}
          </Route>
        </Routes>
      </Router>
      <Footer />
    </Provider>
  );
}
export default App;
