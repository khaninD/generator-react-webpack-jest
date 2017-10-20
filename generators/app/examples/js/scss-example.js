import React from 'react';
import ReactDOM from 'react-dom';
import styles from './main.scss';

class Table extends React.Component {
  render () {
    return <div className="table">
      <div calssName='row'>
        <div className='cell'>A0</div>
        <div className='cell'>B0</div>
      </div>
    </div>;
  }
}
ReactDOM.render(<Table />, document.getElementById('app'));