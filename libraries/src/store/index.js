import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    faculties: [],
    faculty: null,
    books: [],
    book: null,
    libraries: [],
    library: [],
    bookInfo: {
      id: '',
      name: '',
      writer: '',
      genre: '',
      desciption: '',
      relesedate: '',
      publisher: '',
      libraryId: '',
      userId: ''
    }
    //selectedBooks: []
  },

  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
    },

    removeToken(state) {
      state.token = '';
      localStorage.token = '';
    },

    setBookInfo(state, book){
      state.bookInfo.id= book.id,
      state.bookInfo.name= book.name,
      state.bookInfo.writer= book.writer,
      state.bookInfo.genre= book.genre,
      state.bookInfo.desciption= book.desciption,
      state.bookInfo.relesedate= book.relesedate,
      state.bookInfo.publisher= book.publisher,
      state.bookInfo.libraryId= book.libraryId,
      state.bookInfo.userId= book.userId

      console.log()
    },

    setFaculties(state, faculties) {
      state.faculties = faculties;
    },

    setBooks(state, books) {
      state.books = books;
    },

    setLibraries(state, libraries) {
      state.libraries = libraries;
    },

    setBookById(state, book) {
      state.book = book;
    },

    setFacultyById(state, faculty) {
      state.faculty = faculty;
    },

    setLibraryByFacultyId(state, facId) {
      state.library = ''
      state.libraries.forEach(library => {
        if (library.facultyId === facId){
          state.library = library;
        }
      });
      // console.log(state.library)
    }

    // selectBooks(state, int) {
    //   state.selectedBooks = []
    //   state.books.forEach(book => {
    //     if (book.libraryId === int){
    //       state.selectedBooks.push(book);
    //     }
    //   });
    //   // console.log(state.selectedBooks)
    // }

  },

  actions: {
    register({ commit }, obj) {
      console.log(obj)
      fetch('http://localhost:9000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
          .then( tkn => { 
            if (tkn.msg) {
              alert(tkn.msg);
            } else {
              // console.log(tkn.token)
              commit('setToken', tkn.token)
            }
          });
    },

    login({ commit }, obj) {
      fetch('http://localhost:9000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
          .then( tkn => { 
            if (tkn.msg) {
              alert(tkn.msg);
            } else {
              // console.log(tkn.token)
              commit('setToken', tkn.token)
            }
          });
    },

    fetchFacutlies({ commit }, obj){
      fetch('http://127.0.0.1:8500/admin/faculty/all',{
        headers: {
            'authorization': `Bearer ${localStorage.token}`
        },
        method: 'GET'
    })
        .then( obj => obj.json() )
        .then( res => commit('setFaculties', res));
    },

    fetchBooks({ commit }, obj){
      fetch('http://127.0.0.1:8500/admin/book/all',{
        headers: {
            'authorization': `Bearer ${localStorage.token}`
        },
        method: 'GET'
    })
        .then( obj => obj.json() )
        .then( res => commit('setBooks', res));
    },
    fetchLibraries({ commit }, obj){
      fetch('http://127.0.0.1:8500/admin/library/all',{
        headers: {
          'authorization': `Bearer ${localStorage.token}`
        },
        method: 'GET'
      })
          .then( obj => obj.json() )
          .then( res => commit('setLibraries', res));
    },

    // getBooksByLibId({ commit }, int){
    //   fetch('http://127.0.0.1:8500/admin/book/all',{
    //     headers: {
    //       'authorization': `Bearer ${localStorage.token}`
    //     },
    //     method: 'GET'
    //   })
    //       .then( obj => obj.json() )
    //       .then( res => commit('setBooks', res));
    //
    //   commit('selectBooks',int);
    // },

    fetchBookByID({ commit }, id){
      fetch(`http://127.0.0.1:8500/admin/book/${id}`,{
        headers: {
          'authorization': `Bearer ${localStorage.token}`
        },
        method: 'GET'
      })
          .then( obj => obj.json() )
          .then( res => commit('setBookById', res) );
    },

    fetchFacultyByID({ commit }, id){
      fetch(`http://127.0.0.1:8500/admin/faculty/${id}`,{
        headers: {
          'authorization': `Bearer ${localStorage.token}`
        },
        method: 'GET'
      })
          .then( obj => obj.json() )
          .then( res => commit('setFacultyById', res) );
    },
    fetchLibraryByFacultyId({ commit }, facId){
      fetch('http://127.0.0.1:8500/admin/library/all',{
        headers: {
          'authorization': `Bearer ${localStorage.token}`
        },
        method: 'GET'
      })
          .then( obj => obj.json() )
          .then( res => commit('setLibraries', res));

      commit('setLibraryByFacultyId', facId);
    },
    addBook({ commit }, obj){
        fetch('http://127.0.0.1:8500/admin/book/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' ,
            'authorization': `Bearer ${localStorage.token}`
          },
          body: JSON.stringify(obj)
        }).then( res => res.json() )
            .then( el => {
              if (el.msg) {
                alert(el.msg, 'ovo je error msg');
              }
            });
    },
    updateBook({ commit }, obj){
      fetch(`http://127.0.0.1:8500/admin/book/${obj.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json' ,
          'authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
          .then( el => {
            if (el.msg) {
              alert(el.msg, 'ovo je error msg');
            }
          });
    }

    
  },

  modules: {
  }
})