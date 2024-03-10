const mongoose = require('mongoose');

const boxSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tasks: {
        type: [
            {
                name: String,
                checked: {
                    type: Boolean,
                    default: false
                }
            }
        ],
        default: []
    }
});

const Box = mongoose.model('Box', boxSchema);

module.exports = Box;