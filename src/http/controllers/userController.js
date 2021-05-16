/** @format */

var models = require("../../models");
const User = models.user;
const Lead = models.lead;

function userController() {
    var locals = {
        title: "Profile",
        active_profile: "true",
        description: "this is the homepage",
    };
    return {
        async index(req, res) {
            const leads = await Lead.findAll({
                where: {
                    userid: req.user.id,
                },
            });
            var rewards = 0;
            leads.map((lead) => {
                rewards = rewards + lead.reward;
            });
            User.update(
                {
                    rewards: rewards,
                },
                { where: { id: req.user.id } }
            )
                .then((err, data) => {
                    if (err) {
                        req.flash("error", "Something Went Wrong");
                        return res.render("profile");
                    }
                    res.render("profile");
                })
                .catch((err) => {
                    console.log(err);
                });
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
