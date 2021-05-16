/** @format */

var models = require("../../models");
const User = models.user;

function userController() {
    var locals = {
        title: "Profile",
        active_profile: "true",
        description: "this is the homepage",
    };
    return {
        async index(req, res) {
            res.render("profile", { locals });
        },
        updateProfile(req, res) {
            User.update(
                {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    username: req.body.username,
                    age: req.body.age,
                    email: req.body.email,
                },
                { where: { id: req.body.userId } }
            )
                .then((err, data) => {
                    if (err) {
                        req.flash("error", "Something Went Wrong");
                        return res.redirect("/profile");
                    }
                    res.redirect("/profile");
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    };
}

module.exports = userController;
