import Todo from '@/routes/Todo'
import Task from '@/routes/Task'
import NotFound from '@/routes/NotFound'
import MyTask from '@/routes/MyTask'

export default [
  /**
   * 开发环境跳/login_admin重定向到/
   */
  process.env.NODE_ENV === 'development' && {
    path: '/login_admin',
    redirect: '/'
  },
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    redirect: '/dashboard/todo',
    routes: [
      {
        path: '/dashboard/todo',
        component: Todo
      },
      {
        path: '/dashboard/task',
        component: Task
      },
      {
        path: '/dashboard/mytask',
        component: MyTask
      },
    ]
  },
  {
    path: '*',
    component: NotFound
  }
].filter(Boolean)
