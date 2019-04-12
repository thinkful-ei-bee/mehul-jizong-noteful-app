import React from 'react';
import {Route} from 'react-router-dom'
import HomePage from './HomePage'
import FolderList from './FolderList'
import NoteList from './NoteList'
import NotePage from './NotePage'
import './App.css';
import NotefulContext from './NotefulContext'
import {withRouter} from 'react-router-dom';
import AddFolder from './AddFolder'
import AddNote from './AddNote'
import NoteError from './NotefulError'
import FolderError from './FolderError'
import {BASE_URL,API_KEY} from './config';

class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      folderName: '',
      noteName:'',
      noteContent:'',
      folderNameValid: false,
      noteNameValid: false,
      noteContentValid: false,
      noteFormValid: false,
      folderFormValid: false,
      STORE: {
        folders: [],
        notes: []
      },
      fromOrigin: true,
      validationMessages: {
        folderName: '',
        noteName: '',
        noteContent: ''
      }
    }
  }

  updateFolderName = (folderName) => {
    this.setState({folderName}, () => {this.validateFolderName(folderName)});
  }

  updateNoteName = (noteName) => {
    this.setState({noteName}, () => {this.validateNoteName(noteName)});
  }

  updateNoteContent = (noteContent) => {
    this.setState({noteContent}, () => {this.validateNoteContent(noteContent)});
  }


  validateNoteName(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    if(fieldValue.length === 0) {
      fieldErrors.noteName = 'Name is required';
      hasError = true;
    } else {
      if (fieldValue.length < 3) {
        fieldErrors.noteName = 'Name must be at least 3 characters long';
        hasError = true;
      } else {
        fieldErrors.noteName = '';
        hasError = false;
      }
    }

    this.setState({
      validationMessages: fieldErrors,
      noteNameValid: !hasError
    }, this.noteFormValid);

  }

  validateNoteContent(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    if(fieldValue.length === 0) {
      fieldErrors.noteContent = 'Content is required';
      hasError = true;
    } else {
      if (fieldValue.length < 3) {
        fieldErrors.noteContent = 'Content must be at least 3 characters long';
        hasError = true;
      } else {
        fieldErrors.noteContent = '';
        hasError = false;
      }
    }

    this.setState({
      validationMessages: fieldErrors,
      noteContentValid: !hasError
    }, this.noteFormValid);

  }

  noteFormValid() {
    this.setState({
      noteFormValid: this.state.noteNameValid && this.state.noteContentValid 
    });
  }

  


  validateFolderName(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    if(fieldValue.length === 0) {
      fieldErrors.folderName = 'Name is required';
      hasError = true;
    } else {
      if (fieldValue.length < 3) {
        fieldErrors.folderName = 'Name must be at least 3 characters long';
        hasError = true;
      } else {
        fieldErrors.folderName = '';
        hasError = false;
      }
    }

    this.setState({
      validationMessages: fieldErrors,
      folderNameValid: !hasError
    }, this.folderFormValid);

  }

  folderFormValid() {
    this.setState({
      folderFormValid: this.state.folderNameValid
    });
  }

  handleAddFolder = (event)=>{
    event.preventDefault();
    let newFolder = {
      name: event.target['folder-name'].value
    }

    if(this.state.folderFormValid){

      fetch(`${BASE_URL}/folders`, {
        method: 'POST',
        headers: { 
          'Authorization': 'Bearer ' + API_KEY,
          'content-type': 'application/json' }, 
        body:JSON.stringify(newFolder)
        })
        .then(res => res.json())
        .then(folder => this.setState({
          STORE:{
            folders: [
            ...this.state.STORE.folders,
            folder],
            notes:[...this.state.STORE.notes],
          }
        },() => this.props.history.push('/'))
          )
        ;
        
    }
  }

  
  handleAddNote = (event)=>{
    event.preventDefault();
    let newNote = {
      name: event.target['note-name'].value,
      content:event.target['note-content'].value,
      folderId: event.target['note-folder-id'].value,
      modified: new Date(),
    }

    if(this.state.noteFormValid){

      fetch(`${BASE_URL}/notes`, {
        method: 'POST',
        headers: { 
          'Authorization': 'Bearer ' + API_KEY,
          'content-type': 'application/json' }, 
        body:JSON.stringify(newNote)
        })
        .then(res => res.json())
        .then(note =>  this.setState({
          STORE:{
            notes: [
            ...this.state.STORE.notes,
            note],
            folders:[...this.state.STORE.folders],
          }
        },() => this.props.history.push('/'))
          );
        
    }
    
  }

  
  handleDelete = (noteId) => {

    fetch(`${BASE_URL}/notes/${noteId}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': 'Bearer ' + API_KEY,
        'content-type': 'application/json' }, 
      })
      .then (res => {
        if (res.ok) {
          this.props.history.push('/');
          const newNotes = this.state.STORE.notes.filter(note => note.id !== noteId);
          this.setState({
            STORE: {
              notes: newNotes,
              folders: [...this.state.STORE.folders]
            }
          })
        }
      });
  }

  componentDidMount() {
    let folders;
    let notes;


    fetch(`${BASE_URL}/folders`,
    {
      method: 'GET',
      headers: { 
        'Authorization': 'Bearer ' + API_KEY,
        'content-type': 'application/json' }, 
      }
    )
      .then (res => res.json())
      .then (res => {folders = res})
      .then (
        fetch(`${BASE_URL}/notes`,
        {
          method: 'GET',
          headers: { 
            'Authorization': 'Bearer ' + API_KEY,
            'content-type': 'application/json' }, 
          }
        )
        .then (res => res.json())
        .then (res => {notes = res})
        .then (res => 
          this.setState({
            STORE: {
              folders: folders,
              notes: notes
            }
          })
          )
      )
      
  }

   changeOrigin = (boolean) => {
    if(this.state.fromOrigin!==boolean){
      this.setState({
      fromOrigin:boolean
    });
  }
  }

  handleCancelForm = () =>{
    this.props.history.goBack();
  }

  render(){
  return (

    <NotefulContext.Provider value={{ store: this.state.STORE, fromOrigin:this.state.fromOrigin, changeOrigin:this.changeOrigin,
    handleDelete: this.handleDelete }}>
    <main className='App'>

    <section>
     <Route path='/' render={() => <HomePage />} />
     <Route exact path='/' render={() => <FolderList />}/>
     <Route exact path='/' render={() => <NoteList />}  />
    </section>

    <section>
     <Route path='/Folder/:id' render={() => <FolderList />} />
     <Route path='/Folder/:id' render={(props) => <NoteList match={props.match}  />}  />
    </section>

    <section>
      <Route path='/Note/:id' render={(props) => <NotePage match={props.match}  />} />
    </section>
    <FolderError>
    <section>
      <Route path='/AddFolder' render={() => <AddFolder handleCancelForm = {this.handleCancelForm} handleAddFolder={this.handleAddFolder} folderFormValid={this.state.folderFormValid} validationMessages={this.state.validationMessages} updateFolderName={this.updateFolderName} />} />
    </section>
    </FolderError>

    <NoteError>
    <section>
      <Route path='/AddNote' render={() => <AddNote folders ={this.state.STORE.folders} handleCancelForm = {this.handleCancelForm} handleAddNote={this.handleAddNote} noteFormValid={this.state.noteFormValid} validationMessages={this.state.validationMessages} updateNoteName={this.updateNoteName} updateNoteContent ={this.updateNoteContent} />} />
    </section>
    </NoteError>

    </main>
   </NotefulContext.Provider>


  );
  }
}

export default withRouter(App);