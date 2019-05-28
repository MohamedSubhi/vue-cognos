import Tree from './components/treeView/Tree.vue'
import Login from './components/Login.vue'

export default [
    { 
        path: "/",
        name: "home",
        component: Tree,
        props: true,
        beforeEnter: (to, from, next) => {
            if (to.params.loggedIn)
                next()
            else 
                next({ name: 'login' })
        } 
    },
    { path: "/login", component: Login, name: 'login', props: true }
]