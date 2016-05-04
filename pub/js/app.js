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
    return (
      <div className="editor">
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
    var title = localStorage.title || null;
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
    var body = localStorage.body || null;
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
