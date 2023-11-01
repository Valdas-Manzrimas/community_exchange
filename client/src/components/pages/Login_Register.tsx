import Login from '../Base/Login';
import Register from '../Base/Register';

function LoginRegister() {
  //   const [email, setEmail] = useState('');
  //   const [password, setPassword] = useState('');
  //   const [username, setUsername] = useState('');
  //   const [confirmPassword, setConfirmPassword] = useState('');
  //   const [termsAgreed, setTermsAgreed] = useState(false);

  const handleLoginSubmit = (email: string, password: string) => {
    console.log(email, password);
  };

  const handleRegisterSubmit = (user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    console.log(user);
  };

  return (
    <div className='flex justify-center items-center h-screen w-100'>
      <Login onSubmit={handleLoginSubmit} />
      <Register onSubmit={handleRegisterSubmit} />
    </div>
  );
}

export default LoginRegister;
