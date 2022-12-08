const exec = require('child_process').exec;

function log(cmd) {
  exec('echo '+cmd, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout.split('\n').join(''));
  });
}

function error(er) {
  log("\033[0;31m! Error: \033[0m"+er)
}

function ok(msg) {
  log("\033[0;32m% Ok: \033[0m"+msg)
}

function debug(msg) {
  log("\033[1;33m? Debug: \033[0m"+msg)
}

function warn(msg) {
  log("\033[1;33m§ Alert: \033[0m"+msg)
}

function warn(msg) {
  log("\033[1;33m~ Alert: \033[0m"+msg)
}

function shellCommand(msg) {
  log("\033[0;34m$ "+msg+"\033[0m")
}


module.exports.log = log;
module.exports.error = error;
module.exports.ok = ok;
module.exports.warn = warn;
module.exports.debug = debug;
module.exports.shellCommand = shellCommand;