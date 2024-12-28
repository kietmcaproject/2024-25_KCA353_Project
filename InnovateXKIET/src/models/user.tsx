import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    forgetPasswordToken: string;
    forgetPasswordTokenExpiry: Date;
    verifyToken: string;
    verifyTokenExpiry: Date;
    image: string;  // URL or base64 encoded image
    dept: string;   // Department the user belongs to
    Posts: mongoose.Schema.Types.ObjectId[];  // Number of posts the user has created
    following: mongoose.Schema.Types.ObjectId[];  // Users the user is following
    UpvotedPost: mongoose.Schema.Types.ObjectId[];
    followers: mongoose.Schema.Types.ObjectId[];  // Users following the user
    createdAt: Date;
    contibutionPoint: number;
    isVerified: boolean;
    isAdmin: boolean;
    requestsMade: mongoose.Schema.Types.ObjectId[];
    requestsReceived: mongoose.Schema.Types.ObjectId[];
    experiences: IExperience[];
    registerNumber: string;
    degree: String;
    batch: Number;
    college: String;
}

interface IExperience {
    company: string;
    role: string;
    duration: string;
    description: string;
}

const ExperienceSchema = new Schema<IExperience>({
    company: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
})

const userSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: [true, "Please enter a username"]
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        validate: {
            validator: function (v: string) {
                return /^[\w\.-]+@kiet\.edu$/.test(v);  // Email format xyz.kiet.edu
            },
            message: 'Email must be in the format xyz.kiet.edu',
        },
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Password should be at least 6 characters long"],
    },
    image: {
        type: String
    },
    dept: {
        type: String,
        // required: true,
        enum: ['MCA', 'Computer Science', 'Civil', 'Mechanical', 'Electrical'],
    },
    UpvotedPost: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    contibutionPoint: {
        type: Number,
    },
    Posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    requestsMade: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request'
    }],
    requestsReceived: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request'
    }],
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    registerNumber: {
        type: String
    },
    batch: {
        type: String
    },
    college: {
        type: String
    },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
    experiences: [ExperienceSchema],
});

// const User = mongoose.models.Post || mongoose.model<IUser>('Post', userSchema);
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
