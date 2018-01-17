const fs = require('fs');
const path = require('path');

module.exports = (apiRoutes) => {
  // API routes
  fs.readdirSync(__dirname + '/api/').forEach((file) => {
    require(`./api/${file.substr(0, file.indexOf('.'))}`)(apiRoutes);
  });
};
