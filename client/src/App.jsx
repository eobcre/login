import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import SignUpSuccess from './SignUpSuccess';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/success' element={<SignUpSuccess />} />
      </Routes>
    </Router>
  );
};

export default App;
