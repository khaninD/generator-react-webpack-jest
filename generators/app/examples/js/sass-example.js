import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.sass';
import { loadImageAsync } from './js/utils';
import yeoMan_logo from './images/yeoman.png';
import webpack_logo from './images/webpack_logo.png';
import react_logo from './images/react_logo.png';
import jest_logo from './images/jest_logo.png';

class App extends React.Component {
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
    const script = document.createElement('script');
    script.src = 'https://buttons.github.io/buttons.js';
    script.async = false;
    document.body.appendChild(script);
  }

  render () {
    const {imagesLoad} = this.state;
    if (!imagesLoad) {
      return null;
    }
    return (
      <div>
        <div className='parent'>
          <div className='wrapper'>
            <div className='yeoman-wrapper'>
              <img className='yeoman_logo' src={ yeoMan_logo } alt='YeoMan_logo' />
              <h1>Hello world!</h1>
              <h2>If you are use this, give a star!</h2>
              <div className='github_logo_wrapper'>
                <a className="github-button"
                   href="https://github.com/khaninD/generator-react-webpack-jest"
                   data-icon="octicon-star" data-size="large"
                   aria-label="Star khaninD/generator-react-webpack-jest on GitHub">Star
                </a>
              </div>
            </div>

            <div className='logos_wrapper'>
              <div className='logos_weapper__webpack'>
                <img className='logos_wrapper__webpack_logo' src={ webpack_logo } alt='Webpack_logo' />
                <h3>Webpack 3</h3>
              </div>

              <div className='logos_wrapper__react'>
                <img className='logos_wrapper__react_logo' src={ react_logo } alt='React_logo' />
                <h3>React</h3>
              </div>

              <div className='logos_wrapper__jest'>
                <img className='logos_wrapper__jest_logo' src={ jest_logo } alt='Jest_logo' />
                <h3>Jest</h3>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));