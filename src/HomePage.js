import React from 'react';
import {Link} from 'react-router-dom';
import NotefulContext from './NotefulContext'

class HomePage extends React.Component {
  
  static contextType = NotefulContext;

  render(){  
    
  return (
    <h1>
      <Link to='/' onClick={() => this.context.changeOrigin(true)}>Noteful</Link>
    </h1>
  );
}
}
export default HomePage;