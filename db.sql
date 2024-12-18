
CREATE TABLE IF NOT EXISTS users_revenue (
    user_id VARCHAR (50) PRIMARY KEY,
    revenue NUMERIC
);

-- SELECT * FROM users_revenue;

INSERT INTO users_revenue (user_id, revenue)
VALUES 
  ('user1', 0),
  ('user2', 0);

