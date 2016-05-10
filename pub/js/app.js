console.clear();
var LS = {
  map: {
    'title': 't_',
    'body': 'b_',
    'currentNoteId': 'currentNoteId',
    'notesMap': 'notesMap'
  },
  get(key, id){
    var result = localStorage[this.map[key] + (id ? id : '')] || null;
    if (result === null) return false
    if (key === 'notesMap') {
      return result.split(',').map((item) => {
        return parseInt(item)
      })
    }
    if (key === 'currentNoteId') {
      return parseInt(result)
    }
    return result
  },
  set(key, value, id){
    localStorage[this.map[key] + (id ? id : '')] = value
  }
}

function createNote(){
  var map = LS.get('notesMap');
  var id = map ? Math.max.apply(null, map)+1 : 1;
  LS.set('title', 'Новый пост вот', id);
  LS.set('body', 'Тело такого вот нового поста', id);
  LS.set('currentNoteId', id);
  LS.set('notesMap', map.push(id));
  return id;
}


// ================================================

var App = React.createClass({
  getInitialState() {
    return {
      // notesTitles: localStorage.notesTitles || null;
      currentNoteId: LS.get('currentNoteId') || 1
    }
  },
  chooseNoteAction(id){
    // console.log(typeof note, note);
    LS.set('currentNoteId', id);
    this.setState({
      currentNoteId: +id
    })
  },
  createNote(){
    this.setState({
      currentNoteId: createNote()
    })
  },
  render() {
    return (
      <div>
        <Editor
          currentNoteId={this.state.currentNoteId}
        />
        <List
          currentNoteId={this.state.currentNoteId}
          chooseNoteAction={this.chooseNoteAction}
          createNote={this.createNote}
        />
      </div>
    )
  }
});

var Editor = React.createClass({
  render() {
    var id = this.props.currentNoteId;
    var title = LS.get('title', id) || 'Бодрый заголовок';
    var body = LS.get('body', id) || 'Тело поста';
    return (
      <div className="editor">
        <img src={'http://cultofthepartyparrot.com/parrots/parrot.gif'} width="30px"/>
        <EditorTitle title={title}/>
        <EditorBody body={body}/>
      </div>
    )
  }
})

var EditorTitle = React.createClass({
  keyUpHandler(e){
    LS.set('title', e.target.innerHTML);
  },
  render() {
    // var title = this.props.title;
    return (
      <div
        className="editor-title"
        contentEditable
        onKeyUp={this.keyUpHandler}
        dangerouslySetInnerHTML={{__html: this.props.title}}
      ></div>
    )
  }
})

var EditorBody = React.createClass({
  keyUpHandler(e){
    LS.set('body', e.target.innerHTML);
  },
  render() {
    // var body = localStorage.body || 'Тело поста';
    return (
      <div
        className="editor-body"
        contentEditable
        onKeyUp={this.keyUpHandler}
        dangerouslySetInnerHTML={{__html: this.props.body}}
      ></div>
    )
  }
})

var List = React.createClass({
  getInitialState(){
    return {
      notesMap: LS.get('notesMap')
    }
  },
  chooseNote(e){
    this.props.chooseNoteAction(e.target.dataset.id);
  },
  createNote(){
    this.props.createNote()
  },
  render(){
    var currId = this.props.currentNoteId;
    var notesMap = this.state.notesMap;
    var notes = [];
    if (notesMap) {
      notesMap.forEach((id) => {
        let title = LS.get('title', id);
        notes.push(
          <div
            className={currId === +id ? "list-item active" : "list-item"}
            data-id={id}
            onClick={this.chooseNote}
            key={id}
          >{title}</div>
        )
      })
    }
    return (
      <div className="list">
        {notes}
        <button onClick={this.createNote}>New note</button>
      </div>
    )
  }
})


// -------- UTILS ----------
// -------------------------


ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
