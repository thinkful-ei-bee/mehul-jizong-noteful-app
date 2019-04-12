import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import NotefulContext from './NotefulContext'

class Note extends React.Component {

  static contextType = NotefulContext;

  render() {
    let date = moment(this.props.modified).format('MM-DD-YYYY HH:MM:SS');
  
    return (
    
    <li key={this.props.noteId}>         
      <Link to={`/Note/${this.props.noteId}`}>
      {this.props.name}</Link>
      <button onClick={() => this.context.handleDelete(this.props.noteId)}>Delete</button>
      <p>{date}</p>
    </li>
   
  );
  }
}

export default Note;