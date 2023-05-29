import { Request, Response } from "express";
import {
  getFunc,
  deleteFunc,
  getOneFunc,
  insertFunc,
  updateFunc,
} from "../models/animals.model";

//ANIMAL INTERFACE
interface IAnimal {
  animal_id?: string;
  title: string;
  color: string;
  price: string;
}

//GET CONTROLLER
const animalsGetController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const Animals = await getFunc();
  res.render("animals.ejs", { title: "Animals Home Page", animals: Animals });
};

//GETONE CONTROLLER
const animalGetOneController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { animal_id } = req.params;
  const foundAnimal = await getOneFunc(animal_id);
  res.status(200).json([foundAnimal]);
};

//POST CONTROLLER
const animalPostController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { title, color, price } = req.body;
    const Animals = await getFunc();
    const foundAnimal: object = Animals.find((a: IAnimal) => a.title === title);
    if (foundAnimal) {
      console.log("Animal already exists!");
    } else {
      await insertFunc(title, color, price);
      res.status(200).json({ msg: "Inserted" });
    }
  } catch (error) {
    console.log(`Internal server error at ${error}`);
    res.status(500).json({ msg: "Internal server Error" });
  }
};

//UPDATE CONTROLLER
const animalUpdateController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { title, color, price } = req.body;
    const { animal_id } = req.params;
    const Animals = await getFunc();
    const foundAnimal = Animals.find((a: IAnimal) => a.animal_id === animal_id);

    if (!foundAnimal) {
      console.log("Animal not found!");
      return res.status(404).json({ msg: "Animal not found" });
    }

    const updatedAnimal: IAnimal = {
      animal_id: animal_id || foundAnimal.animal_id,
      title: title || foundAnimal.title,
      color: color || foundAnimal.color,
      price: price || foundAnimal.price,
    };

    const result = await updateFunc(
      updatedAnimal.animal_id,
      updatedAnimal.title,
      updatedAnimal.color,
      updatedAnimal.price
    );
    console.log(result);

    res.status(200).json({ msg: "Updated!", animal: updatedAnimal });
  } catch (error) {
    console.log(`Internal server error at ${error}`);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

//DELETE CONTROLLER
const animalDeleteController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { animal_id } = req.params;
    const foundAnimalById = await getOneFunc(animal_id);
    if (!foundAnimalById) {
      console.log("Animal not found!");
      res.status(404).json({ msg: "Animal not found!" });
    } else {
      await deleteFunc(animal_id);
      res.status(200).json({ msg: "Deleted!" });
    }
  } catch (error) {
    console.log(`Internal server error at ${error}`);
    res.status(500).json("Internal Server Error!");
  }
};

export {
  animalsGetController,
  animalDeleteController,
  animalUpdateController,
  animalGetOneController,
  animalPostController,
};
