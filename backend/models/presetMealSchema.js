import mongoose from 'mongoose'

const PresetMealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    calories: {
        type: Number,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

const PresetMeal = mongoose.model('PresetMeal', PresetMealSchema)

export default PresetMeal