import React from 'react';
import NotefulContext from './NotefulContext'
import ValidationError from './ValidationError'
import PropTypes from 'prop-types';


class AddNote extends React.Component  {
    
  static contextType = NotefulContext;

  render () {
    return (
      <form className="Add-Note" onSubmit={this.props.handleAddNote}>
        <h2>Add Note</h2>
        <div className="note-hint">* required field</div>  

        <div className="form-group">
          <label htmlFor="note-name">Note Name *</label>
          <input type="text" className="add-note-name"
            name="note-name" id="note-name" onChange={e => this.props.updateNoteName(e.target.value)}/>
          <ValidationError hasError={!this.props.noteFormValid} message={this.props.validationMessages.noteName}/>  

        </div>

        <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select id='note-folder-select' name='note-folder-id'>
              
              {this.props.folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
          </div>

        <div className="note-hint">* required field</div>  
        <div className="form-group">
          <label htmlFor="note-content">Note Content *</label>
          <input type="text" className="add-note-content"
            name="note-content" id="note-content" onChange={e => this.props.updateNoteContent(e.target.value)}/>
          <ValidationError hasError={!this.props.noteFormValid} message={this.props.validationMessages.noteContent}/>  

        </div>
        <div className="registration__button__group">
        <button type="reset" className="cancel-button" onClick={this.props.handleCancelForm}>
            Cancel
        </button>
        <button type="submit" className="add-button">
            Add
        </button>
       </div>
      </form>
    )
  }
}

AddNote.propTypes = {
  handleCancelForm: PropTypes.func,
  handleAddNote: PropTypes.func,
  folderFormValid: PropTypes.bool,
  validationMessages: PropTypes.object,
  updateNoteName:PropTypes.func,
  updateNoteContent:PropTypes.func,
  folders:PropTypes.array
};


export default AddNote;