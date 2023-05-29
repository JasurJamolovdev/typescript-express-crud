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
exports.deleteFunc = exports.updateFunc = exports.insertFunc = exports.getOneFunc = exports.getFunc = void 0;
const connectionPG_1 = require("../utils/connectionPG");
const getQuery = `
    SELECT * FROM animals
`;
const insertQuery = `
    INSERT INTO animals(
        title,
        color,
        price
    ) VALUES ($1, $2, $3)
`;
const updateQuery = `
    UPDATE animals SET title = $1, color = $2, price = $3 WHERE animal_id = $4
`;
const deleteQuery = `
    DELETE FROM animals WHERE animal_id = $1
`;
const getFunc = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, connectionPG_1.fetchData)(getQuery);
    return result;
});
exports.getFunc = getFunc;
const getOneFunc = (animal_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, connectionPG_1.fetchData)(getQuery);
    const animalById = result.find((a) => a.animal_id === animal_id);
    return animalById;
});
exports.getOneFunc = getOneFunc;
const insertFunc = (...params) => __awaiter(void 0, void 0, void 0, function* () {
    let [title, color, price] = params;
    return yield (0, connectionPG_1.fetchData)(insertQuery, title, color, price);
});
exports.insertFunc = insertFunc;
const updateFunc = (...params) => __awaiter(void 0, void 0, void 0, function* () {
    let [animal_id, title, color, price] = params;
    return yield (0, connectionPG_1.fetchData)(updateQuery, title, color, price, animal_id);
});
exports.updateFunc = updateFunc;
const deleteFunc = (animal_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, connectionPG_1.fetchData)(deleteQuery, animal_id);
});
exports.deleteFunc = deleteFunc;
