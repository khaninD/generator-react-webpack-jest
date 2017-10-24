import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles/main.less';

class Table extends React.Component {
  render () {
    return <div className="table">
      <div className='row'>
        <div className='cell'>A0</div>
        <div className='cell'>B0</div>
      </div>
    </div>;
  }
}
ReactDOM.render(<Table />, document.getElementById('app'));