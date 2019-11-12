module.exports.home = function (req, res) {
    return res.render('home', {
        title: "Home"
    })
}
module.exports.display = function (req, res) {
    var x = req.body.message;
    console.log(x)
    return res.render('display', {
        message: x
    });
}