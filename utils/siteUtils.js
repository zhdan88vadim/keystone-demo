
module.exports = {
    getUrlTitle: getUrlTitle,
    getCategoryTitle: getCategoryTitle,
    getFileNameFromPath: getFileNameFromPath
};

function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getUrlTitle(url, defaultTitle) {
    var title = getParameterByName('title', url);

    return  title ? title : defaultTitle;

}

function getFileNameFromPath(path) {
    return decodeURIComponent(path.replace(/^.*[\\\/]/, ''));
}

function getCategoryTitle(categories, defaultTitle) {

    if (categories && categories.length) {
        return title = categories[0].title + ' - ' + defaultTitle;
    }

    return  defaultTitle;
}