import mongoose from "mongoose";

const mockUserSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  displayName: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
});

export const MockUser = mongoose.model("MockUser", mockUserSchema);
