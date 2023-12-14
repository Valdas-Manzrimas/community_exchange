import Login from '../Base/Login';

function LoginRegister() {
  return (
    <>
      <h1 className='text-4xl font-bold text-center mt-10'>Login</h1>{' '}
      <div className='grid md:grid-flow-col mt-20 items-center grid-flow-row'>
        <div className='h-full flex justify-center max-md:mb-8'>
          <Login />
        </div>
      </div>
    </>
  );
}

export default LoginRegister;
