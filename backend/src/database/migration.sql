CREATE DATABASE IF NOT EXISTS caminhodaforca;

USE caminhodaforca;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE streaks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    current_streak INT DEFAULT 0,
    best_streak INT DEFAULT 0,
    last_checkin_date DATE,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE demon_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    demon VARCHAR(50),
    log_date DATE,
    status ENUM('resisted', 'failed', 'skipped') NOT NULL,
    xp INT,

    UNIQUE KEY unique_log (user_id, demon, log_date),

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE mental_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    log_date DATE,
    state ENUM('focused', 'distracted', 'anxious', 'relaxed'),
    blocker ENUM('fear', 'insecurity', 'laziness', 'distraction'),

    UNIQUE KEY unique_log (user_id, log_date),

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE goals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(150),
    description TEXT,
    progress INT DEFAULT 0,
    status ENUM('active', 'completed') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE xp_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    amount INT,
    source VARCHAR(50), -- checkin, demon, mental, goal
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

SELECT * FROM demon_logs;
SELECT * FROM mental_logs;
SELECT * FROM goals;
SELECT * FROM xp_logs;