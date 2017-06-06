/*
 *
 * APIクライアント
 * ※ 実際はAPIアクセスを行う。
 *
 */

//import axios from 'axios';

export default {
  fetch() {
    //return axios.get('/api/todos');
    return new Promise(resolve => {
       resolve({data:
       [
        {
          id: 1,
          title: 'React.js学習する',
          done: false,
          disabled: false
        }, {
          id: 2,
          title: 'Fluxとはなんぞや？',
          done: true,
          disabled: false
        }, {
          id: 3,
          title: 'Reduxだと？',
          done: false,
          disabled: false
        }
      ], status: 200});
    });
  },
  create(todo) {
    return new Promise(resolve => {
       resolve({todo});
    });
  },
  delete(id) {
    return new Promise(resolve => {
       resolve({id});
    });
  },
  done(id) {
    return new Promise(resolve => {
       resolve({id});
    });
  }
};
