'use strict';

var request = require('request');
var fs = require('fs');
var glob = require('glob');

function importFile(files, index) {
  if (index >= files.length) {
    return;
  }

  console.log('[debug] Performing bulk request for file ' + files[index]);

  request({
    method: 'POST',
    url: 'http://localhost:9200/enron/mail/_bulk?pretty',
    encoding: null,
    body: fs.readFileSync(files[index], 'utf8')
  }, function(error, request, body){
    if (error) {
      console.error('[error] Error when performing bulk request for file ' + files[index] + ':', error);
    }
    console.log('[debug] Bulk request for letter ' + files[index] + ' performed');
    setTimeout(importFile(files, index + 1));
  });
}

glob(process.cwd() + '/export/*.json', {}, function(err, files) {
  importFile(files, 0);
});