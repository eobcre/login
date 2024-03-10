import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    console.log(data);
  };

  // const handleLogin = async (formData) => {
  //   try {
  //     const res = await fetch('http://localhost:3000/auth/sign-up', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     const resData = await res.json();
  //     console.log(resData);
  //   } catch (error) {
  //     console.error('Login error:', error);
  //   }
  // };

  return (
    <div className='flex justify-center items-center bg-[#202020] w-full h-screen'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col border border-[#53D3D4] rounded-md p-10 w-[480px]'
      >
        <label htmlFor='name' className='text-white'>
          User Name
        </label>
        <input
          type='text'
          id='name'
          placeholder='Enter your user name'
          className='rounded-md outline-none mt-1 mb-2 p-3'
          {...register('name', {
            required: '* User Name is required.',
            minLength: {
              value: 4,
            },
          })}
        />
        <p className='text-red-500 mb-3'>{errors.name?.message}</p>

        <label htmlFor='password' className='text-white'>
          Password
        </label>
        <input
          type='password'
          id='password'
          placeholder='Enter your password'
          className='rounded-md outline-none mt-1 mb-2 p-3'
          {...register('password', {
            required: '* Password is required.',
            minLength: {
              value: 8,
            },
          })}
        />
        <p className='text-red-500 mb-2'>{errors.password?.message}</p>

        <div className='flex'>
          <input
            type='submit'
            value='Login'
            // onClick={handleLogin}
            // onClick={handleSubmit((data) => handleLogin(data))}
            className='text-white border border-[#53D3D4] rounded-md m-auto mt-6 p-2 w-[100px]'
          />

          <input
            type='button'
            value='Sign Up'
            onClick={() => navigate('/sign-up')}
            className='text-white border border-[#53D3D4] rounded-md m-auto mt-6 p-2 w-[100px]'
          />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
