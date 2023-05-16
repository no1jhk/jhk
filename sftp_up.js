/*
  참조경로 : sftp_dir_path.js
  실행방법 : node sftp_dir.js
*/
'use strict';
const path = require('path');
const fs = require('fs');
const SftpClient = require('ssh2-sftp-client'); 
const dotenvPath = path.join(__dirname, '..', '.env');
const loadVar  = require('./sftp_dir_path');
const config   = loadVar.host;
const server   = loadVar.serve_path;
const local    = loadVar.local_path;
// require('dotenv').config({path: dotenvPath});
 

async function upload() {
  const client = new SftpClient();
 
  try {
    await client.connect(config);
    client.on('upload', info => {
      console.log(`Listener: Uploaded  ${info.source}`);
    });
    let rslt;
    for ( var i = 0 ; i <= local.length ; i++ ){
      // 로컬홀더 마지막요소를 생성
      //console.log( local[i] , " : " , local[i].split('/').slice(-2)[0] );
      rslt += await client.uploadDir( path.join(__dirname, local[i]) , server[0] + local[i].split('/').slice(-2)[0] );
    }    
    return rslt;
  } finally {
    client.end();
  }
}
upload()
  .then(msg => {
    console.log(msg);
  })
  .catch(err => {
    console.log(`main error: ${err.message}`);
  });