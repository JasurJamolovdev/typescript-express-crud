import { fetchData } from "../utils/connectionPG";

const getQuery: string = `
    SELECT * FROM animals
`;

const insertQuery: string = `
    INSERT INTO animals(
        title,
        color,
        price
    ) VALUES ($1, $2, $3)
`;

const updateQuery: string = `
    UPDATE animals SET title = $1, color = $2, price = $3 WHERE animal_id = $4
`;

const deleteQuery: string = `
    DELETE FROM animals WHERE animal_id = $1
`;

const getFunc = async (): Promise<any> => {
  const result = await fetchData(getQuery);
  return result;
};

const getOneFunc = async (animal_id: string): Promise<any> => {
  const result = await fetchData(getQuery);
  const animalById: object = result.find((a: any) => a.animal_id === animal_id);
  return animalById;
};

const insertFunc = async (...params: any[]): Promise<any> => {
  let [title, color, price] = params;
  return await fetchData(insertQuery, title, color, price);
};

const updateFunc = async (...params: any[]): Promise<any> => {
  let [animal_id, title, color, price] = params;
  return await fetchData(updateQuery, title, color, price, animal_id);
};

const deleteFunc = async (animal_id: string): Promise<any> => {
  return await fetchData(deleteQuery, animal_id);
};

export { getFunc, getOneFunc, insertFunc, updateFunc, deleteFunc };
