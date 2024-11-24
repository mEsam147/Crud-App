import Crud from "../models/crud.model.js";
export const GetAllCrudData = async (req, res) => {
  try {
    const crudData = await Crud.find({}).populate({
      path: "author",
      select: "-password",
    });
    if (crudData.length === 0 && !crudData) {
      return res.status(404).json({ message: "No crud data found" });
    }
    res.json(crudData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getCrudDataById = async (req, res) => {
  const { id: crudId } = req.params;
  try {
    const crudData = await Crud.findById(crudId);
    if (!crudData) {
      return res
        .status(404)
        .json({ message: "No crud data found with that ID" });
    }
    res.json(crudData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const createCrudData = async (req, res) => {
  const { title, author, pages, genre } = req.body;
  if (!title || !pages || !genre)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const currentUser = req.user._id;
    const newCrudData = new Crud({ title, author: currentUser, pages, genre });
    await newCrudData.save();
    res.status(201).json(newCrudData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateCrudData = async (req, res) => {
  try {
    const { id: crudId } = req.params;
    const { title, author, pages, genre } = req.body;
    if (!title || !pages || !genre)
      return res.status(400).json({ message: "All fields are required" });

    const updatedCrudData = await Crud.findByIdAndUpdate(
      { _id: crudId },
      {
        $set: { title, author, pages, genre },
        new: true,
      }
    );
    if (!updatedCrudData)
      return res
        .status(404)
        .json({ message: "No crud data found with that ID" });
    res.json(updatedCrudData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteCrudData = async (req, res) => {
  const { id: crudId } = req.params;
  try {
    const crudData = await Crud.findOneAndDelete(crudId);
    if (!crudData) {
      return res
        .status(404)
        .json({ message: "No crud data found with that ID" });
    }

    res.json({ message: "Crud data deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
