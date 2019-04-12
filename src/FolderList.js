import React from 'react';
import Folder from './Folder'
import NotefulContext from './NotefulContext'
import {NavLink} from 'react-router-dom';


class FolderList extends React.Component  {

  static contextType = NotefulContext;

  render() {
    let folders = this.context.store.folders.map(folder =>{
      return <Folder 
        key={folder.id}
        folderid={folder.id} 
        folderName= {folder.name} />
    })
      
    return (
      <ul className='folderList'>
        {folders}
        <li key={'add-folder-key'} className ='folderItem'>         
        <NavLink onClick={() =>this.context.changeOrigin(false)} to={`/AddFolder`}>
        Add Folder</NavLink>
      </li>
      </ul>
    );
  }
}

export default FolderList;