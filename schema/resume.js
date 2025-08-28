import mongoose from "mongoose";

const ResumeSaveSchema = new mongoose.Schema(
  {
    name: String,
    tag: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",   // usually capitalized to match your User model name
      required: true
    },
    data: {
      html: { type: String, required: true },
      templateId: { type: String, required: true }
    },
    pdf: {
      type: Buffer, // binary PDF stored directly in Mongo
      required: true
    }
  },
  { timestamps: true }  // ✅ must be second argument
);




const ResumeSave = mongoose.model("ResumeSave", ResumeSaveSchema);

export default ResumeSave;