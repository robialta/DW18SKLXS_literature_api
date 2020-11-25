const { User, Literature, Collection } = require("../../models");

exports.collection = async (req, res) => {
    try {
        const { id } = req.params;
        const collections = await User.findOne({
            where: {
                id,
            },
            include: {
                model: Literature,
                as: "collections",
                through: {
                    model: Collection,
                },
                include: {
                    model: User,
                    as: "user",
                },
            },
        });

        res.send({
            message: "Success",
            data: collections.collections,
        });
    } catch (err) {
        console.log(err);
        res.status(400).send({
            message: `Error ${err}`,
        });
    }
};

exports.addCollection = async (req, res) => {
    try {
        const body = req.body;
        await Collection.create(body);

        res.send({
            message: "Success",
            data: body,
        });
    } catch (err) {
        console.log(err);
        res.status(400).send({
            message: `Error ${err}`,
        });
    }
};
