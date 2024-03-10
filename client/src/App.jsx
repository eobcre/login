import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import SignUpSuccess from './SignUpSuccess';
import HeroSection from './HeroSection';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/success' element={<SignUpSuccess />} />
        <Route path='/home' element={<HeroSection />} />
      </Routes>
    </Router>
  );
};

export default App;
