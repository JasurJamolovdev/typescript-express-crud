"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.animalPostController = exports.animalGetOneController = exports.animalUpdateController = exports.animalDeleteController = exports.animalsGetController = void 0;
const animals_model_1 = require("../models/animals.model");
//GET CONTROLLER
const animalsGetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Animals = yield (0, animals_model_1.getFunc)();
    res.render("animals.ejs", { title: "Animals Home Page", animals: Animals });
});
exports.animalsGetController = animalsGetController;
//GETONE CONTROLLER
const animalGetOneController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { animal_id } = req.params;
    const foundAnimal = yield (0, animals_model_1.getOneFunc)(animal_id);
    res.status(200).json([foundAnimal]);
});
exports.animalGetOneController = animalGetOneController;
//POST CONTROLLER
const animalPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, color, price } = req.body;
        const Animals = yield (0, animals_model_1.getFunc)();
        const foundAnimal = Animals.find((a) => a.title === title);
        if (foundAnimal) {
            console.log("Animal already exists!");
        }
        else {
            yield (0, animals_model_1.insertFunc)(title, color, price);
            res.status(200).json({ msg: "Inserted" });
        }
    }
    catch (error) {
        console.log(`Internal server error at ${error}`);
        res.status(500).json({ msg: "Internal server Error" });
    }
});
exports.animalPostController = animalPostController;
//UPDATE CONTROLLER
const animalUpdateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, color, price } = req.body;
        const { animal_id } = req.params;
        const Animals = yield (0, animals_model_1.getFunc)();
        const foundAnimal = Animals.find((a) => a.animal_id === animal_id);
        if (!foundAnimal) {
            console.log("Animal not found!");
            return res.status(404).json({ msg: "Animal not found" });
        }
        const updatedAnimal = {
            animal_id: animal_id || foundAnimal.animal_id,
            title: title || foundAnimal.title,
            color: color || foundAnimal.color,
            price: price || foundAnimal.price,
        };
        const result = yield (0, animals_model_1.updateFunc)(updatedAnimal.animal_id, updatedAnimal.title, updatedAnimal.color, updatedAnimal.price);
        console.log(result);
        res.status(200).json({ msg: "Updated!", animal: updatedAnimal });
    }
    catch (error) {
        console.log(`Internal server error at ${error}`);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});
exports.animalUpdateController = animalUpdateController;
//DELETE CONTROLLER
const animalDeleteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { animal_id } = req.params;
        const foundAnimalById = yield (0, animals_model_1.getOneFunc)(animal_id);
        if (!foundAnimalById) {
            console.log("Animal not found!");
            res.status(404).json({ msg: "Animal not found!" });
        }
        else {
            yield (0, animals_model_1.deleteFunc)(animal_id);
            res.status(200).json({ msg: "Deleted!" });
        }
    }
    catch (error) {
        console.log(`Internal server error at ${error}`);
        res.status(500).json("Internal Server Error!");
    }
});
exports.animalDeleteController = animalDeleteController;
