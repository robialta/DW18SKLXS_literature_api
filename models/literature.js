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
                as: "user",
                foreignKey: {
                    name: "userId",
                },
            });
            Literature.belongsToMany(models.User, {
                as: "readers",
                through: {
                    model: "Bookmark",
                    as: "info",
                },
            });
        }
    }
    Literature.init(
        {
            title: DataTypes.STRING,
            publication: DataTypes.STRING,
            pages: DataTypes.STRING,
            isbn: DataTypes.STRING,
            file: DataTypes.STRING,
            status: DataTypes.STRING,
            userId: DataTypes.INTEGER,
            author: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Literature",
        }
    );
    return Literature;
};
