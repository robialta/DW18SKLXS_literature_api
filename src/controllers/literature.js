const { Op } = require("sequelize");
const { User, Literature, sequelize } = require("../../models");

// exports.getBooksAproved = async (req, res) => {
//     try {
//         const books = await Book.findAll({
//             where: { status: "Aproved" },
//             attributes: [
//                 "id",
//                 "title",
//                 "publication",
//                 "pages",
//                 "ISBN",
//                 "aboutBook",
//                 "file",
//                 "status",
//                 "cover",
//             ],
//             include: [
//                 {
//                     model: User,
//                     as: "user",
//                     attributes: [
//                         "id",
//                         "fullName",
//                         "email",
//                         "phone",
//                         "address",
//                         "gender",
//                     ],
//                 },
//                 {
//                     model: Category,
//                     as: "category",
//                     attributes: ["id", "name"],
//                 },
//             ],
//         });
//         res.send({
//             message: "Successfully geting books",
//             data: {
//                 books,
//             },
//         });
//     } catch (error) {
//         console.log(error);
//         res.send({
//             message: `Error geting book ${error}`,
//         });
//     }
// };
exports.getLiteratures = async (req, res) => {
    try {
        const literatures = await Literature.findAll({
            attributes: [
                "id",
                "title",
                "publication",
                "pages",
                "ISBN",

                "file",
                "status",
            ],
            include: [
                {
                    model: User,
                    as: "author",
                    attributes: [
                        "id",
                        "fullName",
                        "email",
                        "phone",
                        "address",
                        "gender",
                    ],
                },
            ],
        });
        res.send({
            message: "Successfully geting literatures",
            data: {
                literatures,
            },
        });
    } catch (error) {
        console.log(error);
        res.send({
            message: `Error geting literatures ${error}`,
        });
    }
};

exports.detailLiterature = async (req, res) => {
    try {
        const { id } = req.params;
        const detailedliterature = await Literature.findOne({
            where: {
                id,
            },
            attributes: [
                "id",
                "title",
                "publication",
                "pages",
                "ISBN",
                "file",
                "status",
            ],
            include: [
                {
                    model: User,
                    as: "author",
                    attributes: [
                        "id",
                        "fullName",
                        "email",
                        "phone",
                        "address",
                        "gender",
                    ],
                },
            ],
        });
        res.send({
            message: "Successfully get detail literature",
            data: detailedliterature,
        });
    } catch (error) {
        console.log(error);
        res.send({
            message: `Error get detail book ${error}`,
        });
    }
};

exports.addLiterature = async (req, res) => {
    try {
        const body = req.body;
        body.status = "Waiting to be verified";
        await Literature.create(body);
        res.status(200).send({
            message: "Successfully adding literature",
            data: body,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: `Error adding literature ${error}`,
        });
    }
};

exports.searchLiterature = async (req, res) => {
    try {
        const { title, public_year } = req.query;

        const literatureFound = await Literature.findAll({
            where: {
                // title: sequelize.where(
                //     sequelize.fn("LOWER", sequelize.col("title")),
                //     "LIKE",
                //     "%" + title + "%"
                // ),
                [Op.or]: [
                    {
                        title: {
                            [Op.like]: `%${title}%`,
                        },
                    },
                    {
                        publication: {
                            [Op.like]: `%${public_year}%`,
                        },
                    },
                ],
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            include: [
                {
                    model: User,
                    as: "author",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                },
            ],
        });
        res.send({
            message: "Success",
            data: literatureFound,
        });
    } catch (err) {
        console.log(err);
        res.status(400).send({
            message: `${err}`,
        });
    }
};

// exports.updateBook = async (req, res) => {
//     try {
//         const body = req.body;
//         const { id } = req.params;
//         await Book.update(body, {
//             where: {
//                 id,
//             },
//         });
//         res.status(200).send({
//             message: "Successfully updating book",
//             data: body,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(400).send({
//             message: `Error updating book ${error}`,
//         });
//     }
// };

// exports.deleteBook = async (req, res) => {
//     try {
//         const { id } = req.params;
//         await Book.destroy({
//             where: {
//                 id,
//             },
//         });
//         res.send({
//             message: "Successfully deleting book",
//             data: {
//                 id,
//             },
//         });
//     } catch (error) {
//         console.log(error);
//         res.send({
//             message: `Error deleting book ${error}`,
//         });
//     }
// };

exports.myLiteratures = async (req, res) => {
    const { id } = req.params;
    try {
        const myLiteratures = await Literature.findAll({
            where: {
                userId: id,
            },
            attributes: [
                "id",
                "title",
                "publication",
                "pages",
                "ISBN",

                "file",
                "status",
            ],
            include: [
                {
                    model: User,
                    as: "author",
                    attributes: [
                        "id",
                        "fullName",
                        "email",
                        "phone",
                        "address",
                        "gender",
                    ],
                },
            ],
        });
        res.status(200).send({
            message: "Succesfully load my books",
            data: myLiteratures,
        });
    } catch (error) {
        console.log(error);
        res.send({
            message: `Error ${error}`,
        });
    }
};
