drop table if exists books;
create table books(
    id SERIAL PRIMARY KEY,
    title VARCHAR(45) UNIQUE NOT NULL,
    author VARCHAR(45)
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
);

-- Create a trigger function
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.modified_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger that runs this function
CREATE TRIGGER set_modified_timestamp
BEFORE UPDATE ON books
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- covers for books
drop table if exists covers;
create table covers(
    id SERIAL PRIMARY KEY,
    book_id INT REFERENCES books(id),
    cover_image BYTEA,
);