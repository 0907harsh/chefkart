/** @format */

module.exports = (sequelize, Sequelize) => {
    var Lead = sequelize.define("lead", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },

        name: {
            type: Sequelize.STRING,
            notEmpty: true,
        },

        userid: {
            type: Sequelize.INTEGER,
            notEmpty: true,
        },

        reward: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },

        status: {
            type: Sequelize.ENUM("New", "In-pipeline", "Successful", "Junk"),
            defaultValue: "New",
        },

        contact: {
            type: Sequelize.INTEGER,
            notEmpty: true,
        },
    });

    return Lead;
};
