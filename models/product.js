const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

const directory = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = callback => {
  fs.readFile(directory, (err, fileContent) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(directory, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
};
