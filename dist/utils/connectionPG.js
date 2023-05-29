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
exports.fetchData = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Jasuruzmir404',
    database: 'tester',
    port: 5432
});
const fetchData = (query, ...params) => __awaiter(void 0, void 0, void 0, function* () {
    let client = null;
    try {
        client = yield pool.connect();
        const result = yield pool.query(query, params);
        return result.rows;
    }
    catch (error) {
        console.log(error);
    }
    finally {
        if (client) {
            client.release();
        }
    }
});
exports.fetchData = fetchData;
