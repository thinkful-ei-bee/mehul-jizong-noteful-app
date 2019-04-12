import React from 'react';
import NotefulContext from './NotefulContext'
import ValidationError from './ValidationError'
import PropTypes from 'prop-types';


class AddFolder extends React.Component  {
    
  static contextType = NotefulContext;

  render () {
    return (
      <form className="registration" onSubmit={this.props.handleAddFolder} >
        <h2>Add Folder</h2>
        <div className="folder-hint">* required field</div>  
        <div className="form-group">
          <label htmlFor="folder-name">Folder Name *</label>
          <input type="text" className="add-folder"
            name="folder-name" id="folder-name" onChange={e => this.props.updateFolderName(e.target.value)}/>
            <ValidationError hasError={!this.props.folderFormValid} message={this.props.validationMessages.folderName}/>  
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

AddFolder.propTypes = {
    handleCancelForm: PropTypes.func,
    handleAddFolder: PropTypes.func,
    folderFormValid: PropTypes.bool,
    validationMessages: PropTypes.object,
    updateFolderName:PropTypes.func,
  };

export default AddFolder;