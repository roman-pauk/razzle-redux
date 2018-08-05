import Home from '../components/Smart/Home'
import Some from '../components/Smart/Some'
import Test from '../components/Smart/Test'
import Post from '../components/Smart/Post'
export default [
    {
        path: '/some',
        component: Some
    },
    {
        path: '/test',
        component: Test
    },
    {
        path: '/post/:id',
        component: Post
    },
    {
        path: '/',
        component: Home
    },
]