/*
 *
 * APIクライアント
 * ※ 実際はAPIアクセスを行う。
 *
 */
export default {
  fetch() {
    return {
      data: [
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
      ]
    }
  },
  create(title) {
    return {
      data: {
        title,
        done: false,
        disabled: false
      }
    };
  },
  destory(id) {
    return {data: {
        id
      }};
  },
  done(id) {
    return {data: {
        id
      }};
  }
};
