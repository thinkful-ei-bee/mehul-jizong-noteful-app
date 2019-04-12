import React from 'react';
import Note from './Note'
import NotefulContext from './NotefulContext'
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';



class NoteList extends React.Component  {
    
  static contextType = NotefulContext;

  render(){
    let NOTES =null;
    if(this.props.match !== undefined){
     NOTES = this.context.store.notes.filter(note =>{
       return note.folderid === this.props.match.params.id
      }
    )
    }
    else{
      NOTES = this.context.store.notes;
    }

     let newnotes =  NOTES.map(note => {
        return <Note noteId = {note.id} 
          key={note.id}
          modified = {note.modified} 
          name= {note.name}
           />
      })
    return (
      <ul className="noteList">
        {newnotes}
        <li key={'add-note-key'} className ='noteList'>         
        <NavLink onClick={() =>this.context.changeOrigin(false)} to={`/AddNote`}>
        Add Note</NavLink>
      </li>

      </ul>
    );
  }
}

NoteList.propTypes = {
  match: PropTypes.object
};

export default NoteList;