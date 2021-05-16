/** @format */

function homeController() {
    var locals = {
        title: "Homepage",
        active_home: "true",
        description: "this is the homepage",
    };
    return {
        async index(req, res) {
            res.render("home", { locals });
        },
    };
}

module.exports = homeController;
