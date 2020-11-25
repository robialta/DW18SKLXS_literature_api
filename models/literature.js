"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Literature extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Literature.belongsTo(models.User, {
                foreignKey: {
                    name: "userId",
                },
                as: "user",
            });
            Literature.hasMany(models.Collection, {
                foreignKey: "literatureId",
                as: "library",
            });
        }
    }
    Literature.init(
        {
            title: DataTypes.STRING,
            publication: DataTypes.STRING,
            isbn: DataTypes.STRING,
            pages: DataTypes.STRING,
            author: DataTypes.STRING,
            userId: DataTypes.INTEGER,
            status: DataTypes.STRING,
            file: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Literature",
        }
    );
    return Literature;
};
