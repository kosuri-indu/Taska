const Box = require("../models/box.js");
const data = require("./data.js").data;

const initDB = async () => {
    await Box.deleteMany({});
    data.forEach(async (box) => {
        let newBox = new Box({
            title: box.title,
            tasks: box.elements
        });
        await newBox.save();
    });
    console.log("data was initialized");
};

module.exports = initDB; 