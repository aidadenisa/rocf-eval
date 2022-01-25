
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '', 
        component: () => import('src/pages/Dashboard.vue'),
        meta: {
          requireAuth: true
        }
      },
      { path: '/register', component: () => import('src/pages/Register.vue') },
      { path: '/login', name: 'Login', component: () => import('src/pages/Login.vue') }
    ]
  },
  {
    path: '/evaluate',
    component: () => import('layouts/EvaluationLayout.vue'),
    children: [
      { path: 'patient', component: () => import('src/pages/PatientCode.vue') },
      { path: 'camera', component: () => import('src/pages/Camera.vue') },
      { path: 'adjust-photo', component: () => import('src/pages/AdjustPhoto.vue') },
      { path: 'set-points', component: () => import('src/pages/SetPoints.vue') },
      { path: 'threshold', component: () => import('src/pages/Threshold.vue') },
      { path: 'rocf/:id', component: () => import('src/pages/ROCFResult.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
