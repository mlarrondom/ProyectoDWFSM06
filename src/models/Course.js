const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
    {
        courseCode: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        credits: {
            type: Number,
            required: true,
            min: 1,
        },
        area: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

courseSchema.index({ courseCode: 1 }, { unique: true });

module.exports = mongoose.model('Course', courseSchema);
