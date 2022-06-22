module.exports = function pagingFooter(currentPage, pageCount) {
    return {
        margin: [0, 0, 10, 50],
        columns: [{
            text: [{
                text: `Page ${currentPage.toString()} of ${pageCount}`,
                fontSize: 10,
            }],
            alignment: 'right'
        }]
    };
};