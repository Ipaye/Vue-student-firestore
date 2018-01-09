import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './dashboard';
import EditStudent from './edit';
import CreateStudent from './new';
import ViewStudent from './view';

Vue.use(Router);

export default new Router({
  routes: [Dashboard, EditStudent, CreateStudent, ViewStudent]
});
