module.exports = ( type, ms ) => {
    if( type == 0 ) {
        let ms_ = ms.toString();
        ms_ = ms_.split('');
        if( ms_.length == 3 ) {
            return ms+'ms';
        } else {
            if( ms_.length == 4 ) {
                return `${ms_[0]}s`
            } else {
                if( ms_.length == 5 ) {
                    return `${ms_[0]}${ms_[1]}s`
                } else {
                    if( ms_.length == 6 ) {
                        return `${ms_[0]}.${ms_[1]}m`
                    } else {
                        return ms+'ms';
                    }
                }
            }
        }
    }
}