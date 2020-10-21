import names from './names';
import paths from './paths';

import StartLoginView from '~/views/login/LoginView';
import StartForgotView from '~/views/forgot-password/ForgotPasswordView';
import StartRegisterView from '~/views/register/RegisterView';
import StartRegisterPersonalView from '~/views/register-personal/RegisterPersonalView';
import StartRegisterBusinessView from '~/views/register-business/RegisterBusinessView';
import Test from '~/views/Test';

export default [
  {
    path: paths.login,
    name: names.login,
    component: StartLoginView,
  },
  {
    path: paths.forgot,
    name: names.forgot,
    component: StartForgotView,
  },
  {
    path: paths.register,
    name: names.register,
    component: StartRegisterView,
  },
  {
    path: paths.registerPersonal,
    name: names.registerPersonal,
    component: StartRegisterPersonalView,
  },
  {
    path: paths.registerBusiness,
    name: names.registerBusiness,
    component: StartRegisterBusinessView,
  },
  {
    path: paths.test,
    name: names.test,
    component: Test,
  },
];
