/** @format */
//Models
const { Op } = require("sequelize");
var models = require("../../models");
const Lead = models.lead;

function leadController() {
    var locals = {
        title: "Cart Page",
        active_cart: "active",
        description: "this is the homepage",
    };
    return {
        async index(req, res) {
            const leads = await Lead.findAll({
                where: {
                    userid: req.user.id,
                },
            });
            // console.log(leads);
            if (req.xhr) {
                // console.log('hi')
                return res.json(leads);
            }
            return res.render("leads", { leads });
        },
        async leadFilter(req, res) {
            console.log(req.body.start_date, req.body.end_date);
            const startedDate = new Date(req.body.start_date + " 00:00:00");
            const endDate = new Date(req.body.end_date + " 00:00:00");
            const leads = await Lead.findAll({
                where: {
                    createdAt: { [Op.between]: [startedDate, endDate] },
                    userId: req.user.id,
                },
            });
            console.log(leads);
            return res.render("leads", { leads });
        },
        addLead(req, res) {
            var data = {
                name: req.body.name,
                userid: req.body.userid,
                status: req.body.status,
                contact: req.body.contact,
            };
            console.log(data);
            Lead.create(data)
                .then(function (newLead, created) {
                    if (!newLead) {
                        req.flash("error", "Something Went Wrong");
                        return res.redirect("/");
                    }
                    return res.redirect("/login");
                })
                .catch((err) => {
                    return res.redirect("/login");
                });
        },
        updateLeadStatus(req, res) {
            Lead.update(
                { status: req.body.status },
                { where: { id: req.body.leadId } }
            )
                .then((err, data) => {
                    if (err) {
                        req.flash("error", "Something Went Wrong");
                        return res.redirect("/lead");
                    }
                    res.redirect("/lead");
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        removeLead(req, res) {
            Lead.destroy({ where: { id: req.body.leadId } })
                .then((err, data) => {
                    if (err) {
                        req.flash("error", "Something Went Wrong");
                        return res.redirect("/lead");
                    }
                    res.redirect("/lead");
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    };
}

module.exports = leadController;
