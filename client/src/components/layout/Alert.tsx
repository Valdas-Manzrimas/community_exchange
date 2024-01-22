import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearAlert } from '../../store/slices/alertSlice';

interface AlertProps {
  message: string;
  type: 'success' | 'error';
}

const Alert: React.FC<AlertProps> = ({ message, type }) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);

      dispatch(clearAlert());
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch]);

  return (
    <div
      className={`absolute top-[4rem] right-[1rem] max-w-[500px] py-3 px-12 rounded-full transition-all ease-in-out duration-500 transform z-10 ${
        isVisible ? 'opacity-100 translate-y-0 ' : '-translate-y-full opacity-0'
      } ${type === 'success' ? 'bg-success' : 'bg-error opacity-80'}`}
      role='alert'
    >
      {message}
    </div>
  );
};

export default Alert;
