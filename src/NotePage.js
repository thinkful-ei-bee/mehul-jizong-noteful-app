import React from 'react';

import {Link} from 'react-router-dom';
import moment from 'moment';
import NotefulContext from './NotefulContext'
import PropTypes from 'prop-types';



class NotePage extends React.Component  {
      static contextType = NotefulContext;


  render(){
    const NOTE = this.context.store.notes.find(note =>{
       return note.id === this.props.match.params.id
      }
    )
    
    let date = moment(NOTE.modified).format('MM-DD-YYYY HH:MM:SS');
if(this.context.fromOrigin !== true){
    return (
      <ul className='note-page'>
          <li className='back-button'>
        <Link to={`/Folder/${NOTE.folderid}`}>Go Back</Link>
        </li>
          <li className='note-info'>
        <h2>{NOTE.name}</h2>
        <p>{date} </p>
        <p>{NOTE.content}</p>
        <button onClick={() => this.context.handleDelete(NOTE.id)}>Delete</button>
        </li>
      </ul>
    );
}
else{ 
  return (
    <ul>
        <li>
      <Link to={`/`}>Go Back</Link>
      </li>
        <li>
      <h2>{NOTE.name}</h2>
      <p>{date} </p>
      <p>{NOTE.content}</p>
      <button onClick={() => this.context.handleDelete(NOTE.id)}>Delete</button>
      </li>
    </ul>
  );

}
  }
}
NotePage.propTypes = {
  match: PropTypes.object
};
export default NotePage;