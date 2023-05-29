CREATE DATABASE tester;
CREATE TABLE animals(
    animal_id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR NOT NULL,
    color VARCHAR NOT NULL,
    price VARCHAR NOT NULL
);

INSERT INTO animals(
    title,
    color,
    price
) VALUES (
    'Cow',
    'black-white',
    '670$'
);


