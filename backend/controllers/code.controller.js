import Code from "../models/code.model.js";

export const getCode = async (req, res) => {
  try {
    const codeId = req.params.id;
    const code = await Code.findById(codeId);
    res.status(200).json(code);

  } catch (error) {
    console.log("Error getting code: ", error);
    res.status(500).json({ message: "Server error" });
  }
}

export const shareCode = async (req, res) => {
  try {
    const { code, language, theme } = req.body;
    const newCode = new Code({ code, language, theme });
    await newCode.save();
    res.status(201).json({ message: "Code shared successfully" });
  } catch (error) {
    console.log("Error sharing code: ", error);
    res.status(500).json({ message: "Server error" });
  }
};