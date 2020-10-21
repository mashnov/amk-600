import names from './names';
import paths from './paths';

export default [
  {
    path: paths.admin,
    name: names.admin,
    component: () => import(/* webpackChunkName: "admin" */ '~/views/admin/AdminView.vue'),
  },
];
