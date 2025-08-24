import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
    minlength: 3,
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 3,
    // don’t return password by default
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
},
  {
    timestamps: true,
  });

// now create model 
export const Users = mongoose.model("user", userSchema);


// Sessions table
const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // foreign key
    ref: "user",                          // references users collection
    required: true,
  },

  valid: {
    type: Boolean,
    default: true,
    required: true,
  },

  userAgent: {
    type: String,
  },

  ip: {
    type: String,
  },
}, { timestamps: true }); // adds createdAt & updatedAt

export const Session = mongoose.model("Session", sessionSchema);

userSchema.pre("findOneAndDelete", async function (next) {
  const doc = await this.model.findOne(this.getFilter());
  if (doc) {
    await Session.deleteMany({ userId: doc._id });
  }
  next();
});

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  title: { type: String, required: true }, // e.g. "Resume for Internship"
  createdAt: { type: Date, default: Date.now },
  fileUrl: { type: String }, // link to generated PDF stored locally or on cloud
});

export const Resume = mongoose.model("Resume", resumeSchema);
