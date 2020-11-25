"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Collection extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Collection.belongsTo(models.Literature, {
                foreignKey: {
                    name: "literatureId",
                },
                as: "literature",
            });
            Collection.belongsTo(models.User, {
                foreignKey: {
                    name: "userId",
                },
                as: "user",
            });
        }
    }
    Collection.init(
        {
            literatureId: DataTypes.INTEGER,
            userId: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Collection",
        }
    );
    return Collection;
};
