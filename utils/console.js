function error(er) {
  console.log("\033[0;31m! Error: \033[0m"+er)
}

function ok(msg) {
  console.log("\033[0;32m% Ok: \033[0m"+msg)
}

function debug(msg) {
  console.log("\033[1;33m? Debug: \033[0m"+msg)
}

function warn(msg) {
  console.log("\033[1;33m~ Alert: \033[0m"+msg)
}

function shellCommand(msg) {
  console.log("\033[0;34m$ "+msg+"\033[0m")
}

function message(msg) {
  console.log("\033[0;35m# Fsdb: \033[0m"+msg)
}


module.exports.error = error;
module.exports.ok = ok;
module.exports.warn = warn;
module.exports.debug = debug;
module.exports.message = message;
module.exports.shellCommand = shellCommand;