import { motion } from 'framer-motion';
import './login.scss';
import { useForm } from 'react-hook-form';
import { UserApi } from '../../../api/user/UserApi';
import { useAppDispatch } from '../../../redux/hook';
import { useNavigate } from 'react-router-dom';

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: Inputs) => {
    const params = {
      userEmail: data.email,
      password: data.password,
    };
    const result = await UserApi.loginUser(params);

    if (result.data) {
      dispatch({ type: '/user/login-type', payload: true });

      //verify email with firebase
      // createUserWithEmailAndPassword(auth, data.email, data.password).then(
      //   (cred) => {
      //     const user = cred.user;
      //     console.log(user);
      //   }
      // );

      setValue('email', '');
      setValue('password', '');
      navigate('/');
    }
  };

  return (
    <div className="login__container">
      <motion.div className="login__container-form">
        <h2>Login Form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="userEmail">Email</label>
          <motion.input
            id="userEmail"
            type="email"
            placeholder="User email"
            className="login__container-input"
            whileFocus={{
              boxShadow: '0px 0px 8px rgb(21, 19, 60)',
            }}
            {...register('email', {
              required: true,
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            })}
          />

          {errors.email?.type === 'required' && (
            <p className="login__form-error">Email must be required !!</p>
          )}

          {errors.email?.type === 'pattern' && (
            <p className="login__form-error">Email is invalid !!</p>
          )}

          <label htmlFor="userPassword">Password</label>
          <motion.input
            id="userPassword"
            type="password"
            placeholder="User password"
            className="login__container-input"
            whileFocus={{
              boxShadow: '0px 0px 8px rgb(21, 19, 60)',
            }}
            {...register('password', {
              required: true,
            })}
          />

          {errors.password?.type === 'required' && (
            <p className="login__form-error">Password must be required !!</p>
          )}

          {/* {errors.password?.type === "pattern" && (
            <p className="login__form-error">Password is invalid !!</p>
          )} */}

          <motion.button
            whileFocus={{
              boxShadow: '0px 0px 8px rgb(21, 19, 60)',
            }}
          >
            Submit
          </motion.button>
        </form>

        <div className="signup-link">
          Not a member?{' '}
          <span onClick={() => navigate('/auth/register')}>Signup</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
