module.exports = function(funcs_) {
    return new Promise(function(resolve, reject) {
        res = { data: funcs_.value() }
        let funcs = funcs_;
        funcs.find = async function (key, value) {
            return new Promise(async (resolve, reject) => {
                const { data } = res;
                const arguments = [];
                data.forEach((item, index) => {
                    if( item[key] ) {
                        if( item[key] == value ) {
                            arguments.push(item)
                        }
                    }
                    if( index == ( data.length - 1 ) ) {
                        if( arguments.length == 1 ) {
                            resolve(arguments[0])
                        } else if( arguments.length > 1 ) {
                            resolve(arguments)
                        } else {
                            if( arguments.length < 1 ) {
                                resolve(null)
                            }
                        }
                    }
                })
            })
        };
        resolve(funcs)
    })
}