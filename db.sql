CREATE DATABASE finonexDb;

\c finonexDb

CREATE TABLE users_revenue (
    user_id SERIAL PRIMARY KEY,
    price NUMERIC NOT NULL,
);

-- INSERT INTO clothes_stock (clothes_name, price, cost, colour, sex, clothes_size, stock_level)
-- VALUES ('Red T-shirt', 1.99, 0.99, 'red', 'male', 'small', 100);