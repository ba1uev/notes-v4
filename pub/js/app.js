console.clear();
var LS = {
  map: {
    'title': 't_',
    'body': 'b_',
    'currentNoteId': 'currentNoteId',
    'notesMap': 'notesMap',
    'firstVisit': 'firstVisit'
  },
  get(key, id){
    var result = localStorage[this.map[key] + (id ? id : '')];
    if (result === undefined) return null
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
  // debugger;
  var map = LS.get('notesMap') || [];
  var id = map.length ? Math.max.apply(null, map)+1 : 1;
  map.push(id);
  LS.set('title', 'Новый пост вот', id);
  LS.set('body', 'Тело такого вот нового поста', id);
  LS.set('currentNoteId', id);
  LS.set('notesMap', map);
}

function initDataBase(){
  // debugger;
  LS.set('notesMap', [1]);
  LS.set('title', 'ПЕРВЫЙ ПОСТ', 1);
  LS.set('body', 'bdy of the first POST', 1);
  LS.set('currentNoteId', 1);
}


// ================================================

var App = React.createClass({
  getDefaultProps(){
    var firstVisit = LS.get('firstVisit') === null ? true : false;
    if (firstVisit === true) {
      console.log('first visit / generate post');
      initDataBase();
    }
  },
  getInitialState() {
    return {
      // notesTitles: localStorage.notesTitles || null,
      currentNoteId: LS.get('currentNoteId') || 1,
      // currentNoteTitle: LS.get(' '),
    }
  },
  currentNoteTitleChanged(title){
    console.log(title);
    this.setState({
      currentNoteTitle: title
    })
  },
  componentDidMount(){
    LS.set('firstVisit', false);
  },
  chooseNoteAction(id){
    // console.log(typeof note, note);
    LS.set('currentNoteId', id);
    this.setState({
      currentNoteId: +id
    })
  },
  createNote(){
    createNote();
    this.setState({
      currentNoteId: LS.get('currentNoteId')
    })
  },
  render() {
    return (
      <div>
        <Editor
          currentNoteId={this.state.currentNoteId}
          currentNoteTitleChanged={this.currentNoteTitleChanged}
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
  currentNoteTitleChanged(t){
    this.props.currentNoteTitleChanged(t)
  },
  render() {
    var id = this.props.currentNoteId;
    var title = this.props.firstVisit ? 'Бодрый заголовок' : LS.get('title', id);
    var body = this.props.firstVisit ? 'Тело поста' : LS.get('body', id);
    return (
      <div className="editor">
        <img src={'http://cultofthepartyparrot.com/parrots/parrot.gif'} width="30px"/>
        <EditorTitle
          currentNoteId={id}
          title={title}
          currentNoteTitleChanged={this.currentNoteTitleChanged}
        />
        <EditorBody currentNoteId={id} body={body}/>
      </div>
    )
  }
})

var EditorTitle = React.createClass({
  keyUpHandler(e){
    LS.set('title', e.target.innerHTML, this.props.currentNoteId);
    this.props.currentNoteTitleChanged(e.target.innerHTML)
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
    LS.set('body', e.target.innerHTML, this.props.currentNoteId);
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
    this.setState({
      notesMap: LS.get('notesMap')
    })
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
          >{title ? title : <span style={{color: 'gray'}}>Ноу Нейм ПОСТ</span>}</div>
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



ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
