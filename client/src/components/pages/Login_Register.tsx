import Login from '../Base/Login';
import Register from '../Base/Register';

function LoginRegister() {
  return (
    <div className='grid grid-flow-col mt-20 items-center'>
      <div className='w-50 h-full flex justify-center items-center'>
        <Login />
      </div>
      <div className='w-50 flex justify-center'>
        <Register />
      </div>
    </div>
  );
}

export default LoginRegister;
