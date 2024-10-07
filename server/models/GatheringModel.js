import mongoose from "mongoose";

const gatheringSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: [{ type: mongoose.Schema.ObjectId, ref: "users", required: true }],
  admin: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
  messages: [
    { type: mongoose.Schema.ObjectId, ref: "messages", required: false },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

gatheringSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

gatheringSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const Gathering = mongoose.model("gatherings", gatheringSchema);
export default Gathering;
