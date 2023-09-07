let fs = require('fs');

let utils = {
  // Get all
  get: (file, res, rej) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        rej(err);
      } else {
        res(JSON.parse(data));
      }
    });
  },

  // Get one
  getById: (file, id, res, rej) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        rej(err);
      } else {
        let item = JSON.parse(data).find((p) => String(p.id) === id);
        res(item);
      }
    });
  },

  // Filter
  search: (file, searchObject, res, rej) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        rej(err);
      } else {
        let items = JSON.parse(data);
        if (searchObject) {
          items = items.filter(
            (p) =>
              (searchObject.id ? p.id == searchObject.id : true) &&
              (searchObject.name ? p.name.toLowerCase().indexOf(searchObject.name.toLowerCase()) >= 0 : true)
          );
        }
        res(items);
      }
    });
  },

  // Add
  insert: (file, newEntry, res, rej) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        rej(err);
      } else {
        const db = JSON.parse(data);
        const newId = String(db.length + 1);
        newEntry.id = newId;
        db.push(newEntry);
        fs.writeFile(file, JSON.stringify(db), (err) => {
          if (err) {
            rej(err);
          } else {
            res(newEntry);
          }
        });
      }
    });
  },

  // Patch
  update: (file, newData, id, res, rej) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        rej(err);
      } else {
        let items = JSON.parse(data);
        let item = items.find((p) => String(p.id) === id);
        if (item) {
          Object.assign(item, newData);
          fs.writeFile(file, JSON.stringify(items), (err) => {
            if (err) {
              rej(err);
            } else {
              res(newData);
            }
          });
        }
      }
    });
  },

  delete: (file, id, res, rej) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        rej(err);
      } else {
        let items = JSON.parse(data);
        let item = items.find((i) => String(i.id) === id);
        const updatedItems = items.filter((i) => i.id !== item.id);
        fs.writeFile(file, JSON.stringify(updatedItems), (err) => {
          if (err) {
            rej(err);
          } else {
            res({ message: `Item with ID ${id} deleted` });
          }
        });
      }
    });
  },
};

module.exports = utils;
