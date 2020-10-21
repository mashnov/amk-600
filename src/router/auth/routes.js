import names from './names';
import paths from './paths';

export default [
  {
    path: paths.auth,
    name: names.auth,
    component: () => import(/* webpackChunkName: "auth" */ '~/views/auth/AuthView.vue'),
  },
];
