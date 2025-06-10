import LoginForm from '@/components/auth/login-form';
import { genMetaData } from '@/app/seo';

export const dynamic = 'force-static';

export const metadata = genMetaData({
  title: 'Login',
  url: '/login',
});

const Login = async () => {
  return <LoginForm />;
};

export default Login;
