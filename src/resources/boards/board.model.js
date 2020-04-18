const uuid = require('uuid');
const mongoose = require('mongoose');

// class Board {
//   constructor({ id = uuid(), title = 'board', columns = [new Column()] } = {}) {
//     this.id = id;
//     this.title = title;
//     this.columns = columns;
//   }
// }

// class Column {
//   constructor({ id = uuid(), title = 'column', order = 0 } = {}) {
//     this.id = id;
//     this.title = title;
//     this.order = order;
//   }
// }

const boardSchema = new mongoose.Schema(
  {
    title: String,
    columns: [
      {
        title: String,
        order: Number
      }
    ],
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

boardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};
const Board = mongoose.model('Board', boardSchema);
module.exports = Board;
