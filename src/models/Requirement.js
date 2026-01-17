const mongoose = require('mongoose');

const requirementSchema = new mongoose.Schema(
    {
        trajectoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Trajectory',
            required: true,
        },
        group: {
            type: Number,
            required: true,
            enum: [1, 2, 3],
        },
        condition: {
            type: String,
            required: true,
            enum: ['Y', 'O'],
        },
        type: {
            type: String,
            required: true,
            enum: ['CREDITS', 'COURSE'],
        },
        // Para COURSE
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            default: null,
        },
        // Para CREDITS
        creditsRequired: {
            type: Number,
            default: null,
        },
    },
    { timestamps: true }
);

// Evita duplicados: mismo curso repetido dentro de una trayectoria (cuando es COURSE)
requirementSchema.index(
    { trajectoryId: 1, courseId: 1 },
    { unique: true, partialFilterExpression: { courseId: { $type: 'objectId' } } }
);

module.exports = mongoose.model('Requirement', requirementSchema);
