import React, { Component } from 'react';
import Radium from 'radium';
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
    document.body.style.background = 'linear-gradient(to right, white, rgba(236, 238, 242, 1), rgba(224, 228, 234, 1))';
    Promise.all(loadImageAsync(images)).then(images => this.setState({imagesLoad:true}));
    setScript('https://buttons.github.io/buttons.js');
  }

  getStyles() {
    return {
      parent: {
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center'
      },
      wrapper: {
        textAlign: 'center',
        fontFamily: 'Roboto, sans-serif'
      },
      'yeoman_logo': {
        width: '120px'
      },
      'github_logo_wrapper': {
        padding: '20px'
      },

      'logos_wrapper': {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'baseline'
      },

      'logos_img': {
        width: '90px'
      }
    }
  }

  render () {
    const {imagesLoad} = this.state;
    if (!imagesLoad) {
      return null;
    }
    const {parent, wrapper, yeoman_logo, github_logo_wrapper, logos_wrapper, logos_img} = this.getStyles();

    return (
      <div>
        <div style={ parent }>
          <div style = { wrapper }>
            <div className='yeoman-wrapper'>
              <img style={ yeoman_logo } src={ yeoMan_logo } alt='YeoMan_logo' />
              <h1>Hello world!</h1>
              <h2>If you are use this, give a star!</h2>
              <div style= { github_logo_wrapper }>
                <a className="github-button"
                   href="https://github.com/khaninD/generator-react-webpack-jest"
                   data-icon="octicon-star" data-size="large"
                   aria-label="Star khaninD/generator-react-webpack-jest on GitHub">Star
                </a>
              </div>
            </div>

            <div style={ logos_wrapper }>
              <div>
                <img style={ logos_img } src={ webpack_logo } alt='Webpack_logo' />
                <h3>Webpack 3</h3>
              </div>

              <div>
                <img style={ logos_img } src={ react_logo } alt='React_logo' />
                <h3>React</h3>
              </div>

              <div>
                <img style={ logos_img } src={ jest_logo } alt='Jest_logo' />
                <h3>Jest</h3>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

App = Radium(App);
export default App;