import { Router } from "express";
const router = Router();
import {
  animalsGetController,
  animalDeleteController,
  animalGetOneController,
  animalPostController,
  animalUpdateController,
} from "../controllers/animals.controller";

router.get("/", animalsGetController);
router.get("/:animal_id", animalGetOneController);
router.post("/addAnimal", animalPostController);
router.delete("/deleteAnimal/:animal_id", animalDeleteController);
router.post("/updateAnimal/:animal_id", animalUpdateController);

export default router;
