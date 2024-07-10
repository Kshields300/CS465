/* GET about view */
const aboutvar = (req, res) => {
    res.render('about', {title: 'Travlr Getaways'});
};

module.exports = {
    aboutvar
}