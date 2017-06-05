
# React.js 基礎学習

## 学習項目
[TOC]


## 前提
- `npm`はインストールされているとします。

- また、下記バージョンで行ったものです。
macOS: 10.11.5
React.js: 15.5.4
ReactDOM: 15.5.4
npm: 4.2.0
craete-react-app: 1.3.1

- 各項目にある__実装内容__を読んでサンプルなしで書けそうであればサンプルを見ずに実施してみて下さい。
- `create-react-app`で生成される`App.js`をメインに開発していきます。

## STEP0.セットアップ

Facebookが用意している`create-react-app`を使用します。
```
$ npm i -g create-react-app
```

インストール後、下記コマンドでアプリを作成しましょう。
```
$ create-react-app [App名]
```

作成後、nodeモジュールのインストールを行いましょう。
```
$ cd [App名]
$ npm i
```

インストールが完了したら、`npm start`を実行し起動出来る事は確認して下さい。

```
$ npm start
```


## STEP1. コンポーネント化とPropsについて学ぼう

### 1-1.Welcomeコンポーネントを作成してみよう。

__実装内容__
- `App.js`の`<h2>Welcome to React</h2>`をWelcomeコンポーネントとして作成してみよう。

まず、`src/Welcom.jsx`を作成する。
```diff
+ import React, { Component } from 'react';

+ class Welcome extends Component {
+   render() {
+     return (
+       <h2>Welcome to React</h2>
+     );
+   }
+ }

+ export default Welcome;
```
つづいて、`App.js`に`Wecome.jsx`を追加する。

```diff
+ import Welcome from './Welcome';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
-          <h2>Welcome to React</h2>
+          <Welcome/>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}
```  

エラーなく表示されていればOK!

### 1-2.Welcomeコンポーネントにpropsでnameを渡せるようにしてみよう

__実装内容__
- nameプロパティ(this.props.name)を取得できるようにして、  
`Welcom to React`の`React`の部分を変更出来るようにする。

先ほど作成した、`Welcome.jsx`に追記します。

```diff
- import React, {Component} from 'react';
+ import React, {PropTypes, Component} from 'react';

class Welcome extends Component {

  render() {
+   const {name} = this.props;
    return (
-      <h2>Welcome to React</h2>
+      <h2>Welcome to {name}</h2>
    );
  }
}

+ Welcome.propTypes = {
+  name: PropTypes.string
+ };

+ Welcome.defaultProps = {
+  name: 'React'
+ };

export default Welcome;

```




App.jsのWelcomeコンポーネントにnameプロパティを追加する。
```diff
// App.js
...
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
-          <Welcome/>
+          <Welcome name="React!!!!!!"/>
        </div>
        <p className="App-intro">
          To get started, edit
          <code>src/App.js</code>
          and save to reload.
        </p>
      </div>
    );
  }
...
```

## STEP2. State(状態)を学ぼう

### 2-2. 動的にWelcomeコンポーネントのnameを変更しよう

__実装内容__
-  App.jsにInputフィールドを追加し、変更内容をWelcomeコンポーネントのnameに反映させてみよう。

App.jsにinputを追加する。
```diff
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import Welcome from './Welcome';

class App extends Component {
  constructor(props) {
+    super(props);
+    this.state = {
+      name: ''
+    }
+    this._onChange = this._onChange.bind(this);
  }

+  _onChange(e) {
+    this.setState({name: e.target.value});
+  }

  render() {
+    const {name} = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
+          <Welcome name="React!!!!!!"/>
+          <Welcome name={name}/>
        </div>
+        <input value={name} onChange={this._onChange}/>
        <p className="App-intro">
          To get started, edit
          <code>src/App.js</code>
          and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

```

### 2-2. Buttonを実装してみよう。

__実装内容__
- name状態(state)を空にするClearボタンを実装してみよう。

```diff
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import Welcome from './Welcome';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
    this._onChange = this._onChange.bind(this);
+   this._onClear = this._onClear.bind(this);
  }

  _onChange(e) {
    this.setState({name: e.target.value});
  }

+  _onClear() {
+    this.setState({name: ''});
+  }

  render() {
    const {name} = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <Welcome name={name}/>
        </div>
        <input value={name} onChange={this._onChange}/>
+        <button onClick={this._onClear}>Clear</button>
        <p className="App-intro">
          To get started, edit
          <code>src/App.js</code>
          and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

```




## STEP3.ライフサイクルメソッドを使ってみよう

__実装内容__
- ライフサイクルメソッドの1つ`componentDidMount`を使用してロゴを3秒後に非表示にする処理を実装してみよう。

Logoコンポーネントを作成する。
__※ App.jsもLogoコンポーネントを使用するように修正する。__
```diff
import React, {Component} from 'react';
import logo from './logo.svg';

class Logo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShow: true
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({isShow: false})
    }, 3000);
  }

  render() {
    const {isShow} = this.state;
    return (<img
      src={logo}
      style={isShow
      ? {}
      : {
        display: 'none'
      }}
      className="App-logo"
      alt="logo"/>);
  }
}

export default Logo;

```

3秒後にロゴが非表示になればOK!
__※ サンプルは、`componentDidMount`のみなので、他のライフサイクルメソッドは自身で試して見て下さい。__

## STEP4.Tableを作成してみよう
別アプリを作成するか、App.jsのclassの中身を消しましょ!

__実装内容__
- ユーザーの情報をテーブルで一覧表示してみよう。
  - ユーザーは、id, name, age, scoreの情報を持ちます。
```
 {
    id: 1,
    name: 'bob',
    age: 22,
    score: 82
 }
```

そのままだと味気ないので、`public/index.html`にbootstrapを追加しよう。

```diff
// public/index.html
+  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
```

```diff
//App.js
import React, {Component} from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          id: 1,
          name: 'bob',
          age: 22,
          score: 82
        }, {
          id: 2,
          name: 'tom',
          age: 23,
          score: 70
        }, {
          id: 3,
          name: 'jan',
          age: 25,
          score: 90
        }
      ]
    }
    this._renderUser = this._renderUser.bind(this);
  }

  _renderUser(user) {
    return (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.age}</td>
        <td>{user.score}</td>
      </tr>
    )
  }

  render() {
    const {users} = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-8">
            <h1>Users</h1>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>name</th>
                  <th>age</th>
                  <th>score</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => this._renderUser(user))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

```

## 演習: TODOアプリを作ってみよう

ここまでを理解していれば作成出来るはず!
下記を要件を読んで作成してみよう。

- 登録データは、App.jsのstateで管理する。
- TODOの追加・削除が出来る事。
  - 削除は論理削除
- チェックボックスを配置して完了/未完了の切り替えが出来る事。
- ボタンで完了済み、未完了一覧の表示切り替えが出来る事

![](./TODO_App.gif)


## STEP5.Reduxを使ってみよう
__TODO 書く__
