import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles/main.css';

class Table extends React.Component {
  render () {
    return <div styleName='table'>
      <div styleName='row'>
        <div styleName='cell'>A0</div>
        <div styleName='cell'>B0</div>
      </div>
    </div>;
  }
}

ReactDOM.render(<Table />, document.getElementById('app'));