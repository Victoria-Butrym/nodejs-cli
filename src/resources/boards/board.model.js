const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'board', columns = [new Column()] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

class Column {
  constructor({ id = uuid(), title = 'column', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = { Board, Column };
