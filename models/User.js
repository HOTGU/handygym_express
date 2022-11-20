import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
    nickname: String,
    avatarUrl: String,
    password: String,
    email: String,
    email_verified: Boolean,
    socialId: Number,
    socialType: String,
});

// UserSchema.plugin(passportLocalMongoose, {
//     usernameField: "email",
// });

const User = mongoose.model("User", UserSchema);
export default User;
