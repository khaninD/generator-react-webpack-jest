module.exports = () => {
  return {
    rules: [
      {
        test: /\.js?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: false
            }
          }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            modules: false
          }
        }, {
          loader: 'sass-loader'
        }]
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader",
          options: {
            modules: false
          }
        }, {
          loader: "less-loader"
        }]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  }
};