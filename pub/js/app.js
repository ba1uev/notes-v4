var App = React.createClass({
  getInitialState() {
    return {

    }
  },
  render() {
    // var ls = localStorage;
    return (
      <Editor/>
    )
  }
});


var Editor = React.createClass({
  render() {
    // <img src={'http://cultofthepartyparrot.com/parrots/rightparrot.gif'} width="30px"/>
    return (
      <div className="editor">
        <img src={'http://cultofthepartyparrot.com/parrots/parrot.gif'} width="30px"/>
        <img src={'http://cultofthepartyparrot.com/parrots/parrot.gif'} width="30px"/>
        <img src={'http://cultofthepartyparrot.com/parrots/parrot.gif'} width="30px"/>
        <EditorTitle />
        <EditorBody />
      </div>
    )
  }
})

var EditorTitle = React.createClass({
  keyUpHandler(e){
    localStorage.title = e.target.innerHTML
  },
  render() {
    var title = localStorage.title || 'Бодрый заголовок';
    return (
      <div
        className="editor-title"
        contentEditable
        onKeyUp={this.keyUpHandler}
        dangerouslySetInnerHTML={{__html: title}}
        ></div>
    )
  }
})

var EditorBody = React.createClass({
  keyUpHandler(e){
    localStorage.body = e.target.innerHTML
  },
  render() {
    var body = localStorage.body || 'Тело поста';
    return (
      <div
        className="editor-body"
        contentEditable
        onKeyUp={this.keyUpHandler}
        dangerouslySetInnerHTML={{__html: body}}
        ></div>
    )
  }
})



ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
