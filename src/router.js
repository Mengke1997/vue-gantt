import VueRouter from 'vue-router';
import Gantt from './pages/Gantt';

const routes = [{
    path: '/gantt',
    component: Gantt,
  }];
  
  const router = new VueRouter({
    routes,
  });
  
  export default router;
  