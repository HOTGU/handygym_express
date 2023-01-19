import mongoose from "mongoose";

const GymSchema = mongoose.Schema(
    {
        name: String,
        address: String,
        location: String,
        photos: [String],
        title: String,
        description: String,
        yearRound: String,
        oneday: String,
        onedayPay: String,
        like_users: [String],
        comments: [String],
        creator: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
        views: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

const Gym = mongoose.model("Gym", GymSchema);

export default Gym;
