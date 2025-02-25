-- Step 1: Create the database
CREATE DATABASE scancard_db;

-- Step 2: Connect to the database
\c scancard_db;

-- Step 3: Create a dedicated user
CREATE USER scancard_user WITH PASSWORD 'password';

-- Step 4: Grant privileges to the user
GRANT ALL PRIVILEGES ON DATABASE scancard_db TO scancard_user;

-- Step 5: Create the Users table
CREATE TABLE Users (
    Id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Use UUID for primary key
    Username VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    PasswordHash TEXT NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Step 6: Add unique constraints for Username and Email
CREATE UNIQUE INDEX idx_Users_Username ON Users (Username);
CREATE UNIQUE INDEX idx_Users_Email ON Users (Email);

-- Step 7: Create the BusinessCards table
CREATE TABLE BusinessCards (
    Id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Use UUID for primary key
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Phone VARCHAR(20),
    Company VARCHAR(100),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UserId UUID NOT NULL,
    CONSTRAINT fk_User FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
);

-- Step 8: Add an index for UserId (improves query performance)
CREATE INDEX idx_BusinessCards_UserId ON BusinessCards (UserId);

-- Step 9: Grant privileges to the user on tables
GRANT ALL PRIVILEGES ON TABLE Users TO scancard_user;
GRANT ALL PRIVILEGES ON TABLE BusinessCards TO scancard_user;

-- Step 10: Verify tables
\dt