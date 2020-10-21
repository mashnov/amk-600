import names from './names';
import paths from './paths';

export default [
  {
    path: paths.user,
    name: names.user,
    component: () => import(/* webpackChunkName: "user" */ '~/views/user/UserView.vue'),
  },
];
