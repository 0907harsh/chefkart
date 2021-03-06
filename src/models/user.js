/** @format */

module.exports = (sequelize, Sequelize) => {
    var User = sequelize.define("user", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },

        firstname: {
            type: Sequelize.STRING,
            notEmpty: true,
        },

        lastname: {
            type: Sequelize.STRING,
            notEmpty: true,
        },

        username: {
            type: Sequelize.TEXT,
        },

        rewards: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },

        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true,
            },
        },

        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        last_login: {
            type: Sequelize.DATE,
        },

        age: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },

        status: {
            type: Sequelize.ENUM("active", "inactive"),
            defaultValue: "active",
        },
    });

    return User;
};
