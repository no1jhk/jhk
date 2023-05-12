var host_cofig = {
  host: 'ftp 주소',
  port: '21',
  username: '아이디',
  password: '비번'
};
var serve_path = [ 
  '/jhk/',
];
var local_path = [
  "./root/",
];

module.exports = {
  host         : host_cofig,
  serve_path   : serve_path, 
  local_path   : local_path 
}