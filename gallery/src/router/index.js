import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import Faculty from '@/views/Faculty.vue';
import Book from '@/views/Book.vue';
import Library from '@/views/Library.vue';
import SingleBookView from '@/views/SingleBookView.vue';
import SingleFacultyView from "@/views/SingleFacultyView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/faculties',
    name: 'Faculty',
    component: Faculty
  },
  {
    path: '/books',
    name: 'BookList',
    component: Book
  },
  {
    path: '/libraries',
    name: 'Library',
    component: Library
  },
  {
    path: '/book/:id',
    name: 'Book',
    component: SingleBookView
  },
  {
    path: '/faculty/:id',
    name: 'SingleFaculty',
    component: SingleFacultyView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
