import React from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import styles from './styles/main.scss';

class Table extends React.Component {
  render () {
    return <div styleName='table'>
      <div>
        <div styleName='cell'>A0</div>
        <div styleName='cell'>B0</div>
      </div>
    </div>;
  }
}

Table = CSSModules(Table, styles);
ReactDOM.render(<Table />, document.getElementById('app'));