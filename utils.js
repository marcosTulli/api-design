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
        let pie = JSON.parse(data).find((p) => String(p.id) === id);
        res(pie);
      }
    });
  },

  // Filter
  search: (file, searchObject, res, rej) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        rej(err);
      } else {
        let pies = JSON.parse(data);
        if (searchObject) {
          pies = pies.filter(
            (p) =>
              (searchObject.id ? p.id == searchObject.id : true) &&
              (searchObject.name ? p.name.toLowerCase().indexOf(searchObject.name.toLowerCase()) >= 0 : true)
          );
        }
        res(pies);
      }
    });
  },

  // Add
  insert: (file, newData, res, rej) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        rej(err);
      } else {
        let pies = JSON.parse(data);
        pies.push(newData);
        fs.writeFile(file, JSON.stringify(pies), (err) => {
          if (err) {
            rej(err);
          } else {
            res(newData);
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
        let pies = JSON.parse(data);
        let pie = pies.find((p) => String(p.id) === id);

        if (pie) {
          Object.assign(pie, newData);
          fs.writeFile(file, JSON.stringify(pies), (err) => {
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
        const item = items.findIndex((i) => String(i.id) === id);
        if (item !== -1) {
          items.splice(item, 1);
          fs.writeFile(file, JSON.stringify(items), (err) => {
            if (err) {
              rej(err);
            } else {
              res({ message: `Item with ID ${id} deleted` });
            }
          });
        } else {
          res({ message: `Item with ID ${id} not found` });
        }
      }
    });
  },
};

module.exports = utils;
