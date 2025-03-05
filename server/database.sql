CREATE DATABASE monuma

CREATE ROLE normal_user;
CREATE ROLE ambassador;
CREATE ROLE admin;

CREATE TABLE Users (
  userId SERIAL PRIMARY KEY,
  firstname VARCHAR(255),
  lastname VARCHAR(255),
  hashedpassword VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  profilePicture TEXT,
  createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  role VARCHAR(20) CHECK (role IN ('normal_user', 'ambassador', 'admin')) NOT NULL,
  otp VARCHAR(6),
  otpexpiry TIMESTAMP
);

-- ALTER TABLE users 
-- ADD COLUMN role VARCHAR(20) CHECK (role IN ('normal_user', 'ambassador', 'admin')) NOT NULL DEFAULT 'normal_user';

CREATE TABLE Monuments (
  monumentId SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  address JSONB NOT NULL,
  latitude	DECIMAL(9, 6),
  longitude	DECIMAL(9, 6),
  createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Comments (
  commentId SERIAL PRIMARY KEY,
  userId INT NOT NULL REFERENCES Users(userId) ON DELETE CASCADE,
  monumentId INT NOT NULL REFERENCES Monuments(monumentId) ON DELETE CASCADE,
  commentText VARCHAR(500),
  createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Lists (
  listId SERIAL PRIMARY KEY,
  userId INT NOT NULL REFERENCES Users(userId) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ListMonuments (
  listId INT NOT NULL REFERENCES Lists(listId) ON DELETE CASCADE,
  monumentId INT NOT NULL REFERENCES Monuments(monumentId) ON DELETE CASCADE,
  PRIMARY KEY (listId, monumentId)
);