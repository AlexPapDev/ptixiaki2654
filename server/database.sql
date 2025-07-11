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
  profileimageurl TEXT,
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
  name_noaccents VARCHAR(255) NOT NULL,
  name_greeklish VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  address JSONB NOT NULL,
  latitude	DECIMAL(9, 6),
  longitude	DECIMAL(9, 6),
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) NOT NULL DEFAULT 'pending',
  approved_by INT REFERENCES Users(userId) NULL,
  created_by INT REFERENCES Users(userId) NULL,
  createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE MonumentImages (
  monumentimageid SERIAL PRIMARY KEY,
  monumentId INT NOT NULL REFERENCES Monuments(monumentId) ON DELETE CASCADE,
  imageurl TEXT NOT NULL,
  ismain BOOLEAN DEFAULT FALSE,
  createdat TIMESTAMP DEFAULT now()
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
  updatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_public BOOLEAN DEFAULT FALSE
);

CREATE TABLE ListMonuments (
  listId INT NOT NULL REFERENCES Lists(listId) ON DELETE CASCADE,
  monumentId INT NOT NULL REFERENCES Monuments(monumentId) ON DELETE CASCADE,
  PRIMARY KEY (listId, monumentId)
);

CREATE TABLE categories (
  categoryid SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE monumentcategories (
  monumentId INT REFERENCES Monuments(monumentId) ON DELETE CASCADE,
  categoryid INT REFERENCES categories(categoryid) ON DELETE CASCADE,
  PRIMARY KEY (monumentId, categoryid)
);

CREATE TABLE monumenthours (
  id SERIAL PRIMARY KEY,
  monumentId INT REFERENCES Monuments(monumentId) ON DELETE CASCADE,
  day_of_week smallint,
  open_time time without time zone,
  close_time time without time zone,
  is_open_24_hours boolean DEFAULT false,
  is_closed boolean DEFAULT false,
  CONSTRAINT monumenthours_day_of_week_check CHECK (day_of_week >= 0 AND day_of_week <= 6)
)



CREATE TABLE FollowedLists (
  followerId INT NOT NULL REFERENCES Users(userId) ON DELETE CASCADE,
  listId INT NOT NULL REFERENCES Lists(listId) ON DELETE CASCADE,
  followedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (followerId, listId)
);

CREATE TABLE Eras (
  eraid SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  eradescription TEXT,
  eraOrder INT NOT NULL
);

CREATE TABLE monumenteradetails (
  id SERIAL PRIMARY KEY,
  monumentId INT REFERENCES Monuments(monumentId) ON DELETE CASCADE,
  eraid INT REFERENCES Eras(eraid) ON DELETE CASCADE,
  eramonumentdescription TEXT
)

INSERT INTO categories (name) VALUES 
('Byzantine'), ('Roman'), ('Christian'), ('Ottoman'), ('Jewish'), ('Neoclassical'), ('Contemporary'), ('UNESCO Heritage'), ('Commercial'), ('Religious');