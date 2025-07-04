function success(data=[], message='Succès') {
    return {
        status: 'success',
        message,
        data,
        errors: [],
    };
}

function error(errors=[], message='Erreur') {
    return {
        status: 'error',
        message,
        data: [],
        errors
    };
}

module.exports = {
    success, error
};
