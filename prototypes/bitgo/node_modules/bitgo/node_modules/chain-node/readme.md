# chain-node

The Official Node.js SDK for Chain's Bitcoin API

## Install

```bash
$ npm install chain-node
```

## Quick Start

```js
var chain = require('chain-node');
chain.getAddress('17x23dNjXJLzGMev6R63uyRhMWP1VHawKc', function(err, resp) {
  console.log('balance='+resp['balance']);
});
```

## Documentation

The Chain API Documentation is available at [https://chain.com/docs/node](https://chain.com/docs/node)

## Publishing Nodule Package

```bash
$ npm publish
$ git tag 0.0.X
$ git push origin master --tags
```
