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
  },
  delete(key, id){
    if (localStorage[this.map[key] + id].length) {
      delete localStorage[this.map[key] + id]
      return true
    }
    return false
  }
}

function createNote(){
  var map = LS.get('notesMap') || [];
  var id = map.length ? Math.max.apply(null, map)+1 : 1;
  map.push(id);
  LS.set('title', '', id);
  LS.set('body', '', id);
  LS.set('currentNoteId', id);
  LS.set('notesMap', map);
}

function deleteNote(id){
  LS.delete('title', id);
  LS.delete('body', id);
  let notesMap = LS.get('notesMap');
  notesMap.splice(notesMap.indexOf(id),1);
  LS.set('notesMap', notesMap);
  let newId = id>1 ? id-1 : id+1;
  LS.set('currentNoteId', newId)
  return newId
}

function initDataBase(){
  LS.set('notesMap', [1]);
  LS.set('title', 'What\'s this?', 1);
  LS.set('body', 'bdy of the first POST', 1);
  LS.set('currentNoteId', 1);
}

// ================================================

var App = React.createClass({
  getDefaultProps(){
    var firstVisit = LS.get('firstVisit') === null ? true : false;
    if (firstVisit === true) {
      initDataBase();
    }
  },
  getInitialState() {
    return {
      currentNoteId: LS.get('currentNoteId') || 1,
      notesMap: LS.get('notesMap'),
    }
  },
  currentNoteTitleChanged(title){
    this.setState({
      currentNoteTitle: title
    })
  },
  componentDidMount(){
    LS.set('firstVisit', false);
  },
  chooseNoteAction(id){
    LS.set('currentNoteId', id);
    this.setState({
      currentNoteId: +id
    })
  },
  createNote(){
    createNote();
    this.setState({
      currentNoteId: LS.get('currentNoteId'),
      notesMap: LS.get('notesMap'),
    })
  },
  deleteNoteHandler(id){
    this.setState({
      currentNoteId: id,
      notesMap: LS.get('notesMap'),
    })
  },
  render() {
    return (
      <div>
        <Editor
          currentNoteId={this.state.currentNoteId}
          currentNoteTitleChanged={this.currentNoteTitleChanged}
          deleteNoteHandler={this.deleteNoteHandler}
        />
        <List
          currentNoteId={this.state.currentNoteId}
          chooseNoteAction={this.chooseNoteAction}
          createNote={this.createNote}
          notesMap={this.state.notesMap}
        />
      </div>
    )
  }
});

var Editor = React.createClass({
  currentNoteTitleChanged(t){
    this.props.currentNoteTitleChanged(t)
  },
  deleteNote(){
    if (confirm('Are you sure to remove note?')) {
      let id = this.props.currentNoteId;
      this.deleteNoteHandler(deleteNote(id));
    }
  },
  deleteNoteHandler(id){
    this.props.deleteNoteHandler(id)
  },
  render() {
    var id = this.props.currentNoteId;
    var title = this.props.firstVisit ? 'Бодрый заголовок' : LS.get('title', id);
    var body = this.props.firstVisit ? 'Тело поста' : LS.get('body', id);
    // <img src={'http://cultofthepartyparrot.com/parrots/parrot.gif'} width="30px"/>
    return (
      <div className="editor">
        <EditorTitle
          currentNoteId={id}
          title={title}
          currentNoteTitleChanged={this.currentNoteTitleChanged}
        />
        <EditorBody currentNoteId={id} body={body}/>
        <button onClick={this.deleteNote}>Delete note</button>
      </div>
    )
  }
})

var EditorTitle = React.createClass({
  keyDownHandler(e){
    if (e.keyCode === 13) {
      e.preventDefault;
      document.querySelector('.editor-body').focus()
    }
  },
  keyUpHandler(e){
    LS.set('title', e.target.innerHTML, this.props.currentNoteId);
    this.props.currentNoteTitleChanged(e.target.innerHTML)
  },
  render() {
    return (
      <div
        className="editor-title"
        placeholder="Name your note"
        contentEditable
        onKeyUp={this.keyUpHandler}
        onKeyDown={this.keyDownHandler}
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
    return (
      <div
        className="editor-body"
        placeholder="Write your note..."
        contentEditable
        onKeyUp={this.keyUpHandler}
        dangerouslySetInnerHTML={{__html: this.props.body}}
      ></div>
    )
  }
})

var List = React.createClass({
  chooseNote(e){
    this.props.chooseNoteAction(e.target.dataset.id);
  },
  createNote(){
    this.props.createNote()
  },
  render(){
    var currId = this.props.currentNoteId;
    var notesMap = this.props.notesMap;
    var notes = [];
    if (notesMap) {
      notesMap.forEach((id) => {
        let title = LS.get('title', id);
        // U+1F601  U+1F567
        let symbolRange = ['1F300','1F3BF'];
        let symbolRangeNum = symbolRange.map((i)=>{return parseInt(i,16)});
        let randomNum = Math.floor(Math.random()*(symbolRangeNum[1]-symbolRangeNum[0]) + Math.min.apply(Math, symbolRangeNum));
        randomNum = randomNum.toString(16).toUpperCase();
        // let randomSymbol = `\\u${randomNum};`
        notes.push(
          <div
            className={currId === +id ? "list-item active" : "list-item"}
            data-id={id}
            onClick={this.chooseNote}
            key={id}
          >{title ? title : <span className="empty">No name</span>}</div>
        )
      })
    }
    return (
      <div className="list">
        {notes}
        <button className="list-new" onClick={this.createNote}>New note</button>
      </div>
    )
  }
})



ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
