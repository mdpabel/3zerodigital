import { genMetaData } from '@/app/seo';
import LoginForm from '../login-form';
import { getCategories } from '@/actions/service-actions';

export const dynamic = 'force-static';

export const metadata = genMetaData({
  title: 'Login',
  url: '/login',
});

const Login = async () => {
  const categories = await getCategories();

  return <LoginForm categories={categories} />;
};

export default Login;
