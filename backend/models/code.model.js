import mongoose from "mongoose";

const codeSchema = new mongoose.Schema(
  {
    code: {type: String, required: true},
    language: {type: String, required: true},
    theme: {type: String, default: "light"},
  }
);

const Code = mongoose.model("Code", codeSchema);

export default Code;