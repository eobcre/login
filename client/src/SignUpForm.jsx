import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/auth/sign-up', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      navigate('/success');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className='flex justify-center items-center bg-[#202020] w-full h-screen'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col border border-[#53D3D4] rounded-md p-10 w-[480px]'
      >
        <label htmlFor='username' className='text-white'>
          User Name
        </label>
        <input
          type='text'
          id='username'
          name='username'
          value={formData.username}
          onChange={handleChange}
          placeholder='Enter your user name'
          className='rounded-md outline-none mt-1 mb-2 p-3'
        />

        <label htmlFor='password' className='text-white'>
          Password
        </label>
        <input
          type='password'
          id='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          placeholder='Enter your password'
          className='rounded-md outline-none mt-1 mb-2 p-3'
        />

        <div className='flex'>
          <input
            type='submit'
            value='Register'
            className='text-white border border-[#53D3D4] rounded-md m-auto mt-6 p-2 w-[100px]'
          />
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
