import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from '../../styles/main.scss';
import { loadImageAsync, setScript } from '../../js/utils';
import yeoMan_logo from '../../images/yeoman.png';
import webpack_logo from '../../images/webpack_logo.png';
import react_logo from '../../images/react_logo.png';
import jest_logo from '../../images/jest_logo.png';

class App extends Component {
  constructor() {
    super();
    this.state = {
      imagesLoad: false
    }
  }

  componentDidMount() {
    const images = [
      yeoMan_logo,
      webpack_logo,
      react_logo,
      jest_logo
    ];
    Promise.all(loadImageAsync(images)).then(images => this.setState({imagesLoad:true}));
    setScript('https://buttons.github.io/buttons.js');
  }

  render () {
    const {imagesLoad} = this.state;
    if (!imagesLoad) {
      return null;
    }
    return (
      <div>
        <div styleName='parent'>
          <div styleName='wrapper'>
            <div>
              <img styleName='yeoman_logo' src={ yeoMan_logo } alt='YeoMan_logo' />
              <h1>Hello world!</h1>
              <h2>If you are use this, give a star!</h2>
              <div styleName='github_logo_wrapper'>
                <a className="github-button"
                   href="https://github.com/khaninD/generator-react-webpack-jest"
                   data-icon="octicon-star" data-size="large"
                   aria-label="Star khaninD/generator-react-webpack-jest on GitHub">Star
                </a>
              </div>
            </div>

            <div>
              <div>
                <img styleName='' src={ webpack_logo } alt='Webpack_logo' />
                <h3>Webpack 3</h3>
              </div>

              <div>
                <img src={ react_logo } alt='React_logo' />
                <h3>React</h3>
              </div>

              <div>
                <img src={ jest_logo } alt='Jest_logo' />
                <h3>Jest</h3>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

App = CSSModules(App, styles);
export default App;