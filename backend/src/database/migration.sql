CREATE DATABASE IF NOT EXISTS caminhodaforca;

USE caminhodaforca;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

insert into users values (default, 'Gustavo', 'vieira.gusan@gmail.com', 'Gustavo@IamEZ123', default);

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
    status ENUM('resistiu', 'falhou', 'pulou') NOT NULL,
    xp INT,

    UNIQUE KEY unique_log (user_id, demon, log_date),

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE mental_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    log_date DATE,
    state ENUM('focado', 'distraido', 'ansioso', 'relaxado'),
    blocker ENUM('medo', 'inseguranca', 'preguica', 'distracao', 'luxuria'),

    UNIQUE KEY unique_log (user_id, log_date),

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE goals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(150),
    description TEXT,
    progress INT DEFAULT 0,
    status ENUM('ativo', 'completo') DEFAULT 'ativo',
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

-- SELECT * FROM demon_logs;
-- SELECT * FROM mental_logs;
-- SELECT * FROM xp_logs;

insert into mental_logs (user_id, state, blocker, log_date) values ( 1, 'relaxado', null, '2026-04-24');
insert into mental_logs (user_id, state, blocker, log_date) values ( 1, 'relaxado', null, '2026-04-25');
insert into mental_logs (user_id, state, blocker, log_date) values ( 1, 'focado', null, '2026-04-26');
insert into mental_logs (user_id, state, blocker, log_date) values ( 1, 'ansioso', 'luxuria', '2026-04-27');
insert into mental_logs (user_id, state, blocker, log_date) values ( 1, 'ansioso', 'luxuria', '2026-04-28');
insert into mental_logs (user_id, state, blocker, log_date) values ( 1, 'ansioso', 'preguica', '2026-04-29');
insert into mental_logs (user_id, state, blocker, log_date) values ( 1, 'distraido', 'distracao', '2026-04-30');
insert into xp_logs (user_id, amount, source) values ( 1, 10, 'mental');
insert into xp_logs (user_id, amount, source) values ( 1, 10, 'mental');
insert into xp_logs (user_id, amount, source) values ( 1, 10, 'mental');
insert into xp_logs (user_id, amount, source) values ( 1, 10, 'mental');
insert into xp_logs (user_id, amount, source) values ( 1, 10, 'mental');
insert into xp_logs (user_id, amount, source) values ( 1, 10, 'mental');
insert into xp_logs (user_id, amount, source) values ( 1, 10, 'mental');

-- SELECT blocker, COUNT(blocker) as quantidade_blocker FROM mental_logs WHERE user_id = 1 AND blocker IS NOT NULL AND log_date >= CURDATE() - INTERVAL 7 DAY GROUP BY blocker ORDER BY quantidade_blocker DESC;
-- SELECT state, COUNT(state) as quantidade_state FROM mental_logs WHERE user_id = 1 AND log_date >= CURDATE() - INTERVAL 7 DAY GROUP BY state ORDER BY quantidade_state DESC LIMIT 1;

/* 
SELECT state, log_date 
FROM mental_logs 
WHERE user_id = 1
ORDER BY log_date DESC;
*/

-- SELECT (SELECT state FROM mental_logs WHERE user_id = 1 ORDER BY log_date DESC LIMIT 1) as state, (SELECT blocker FROM mental_logs WHERE user_id = 1 ORDER BY log_date DESC LIMIT 1) as blocker, (SELECT COUNT(*) FROM mental_logs WHERE user_id = 1 AND log_date >= CURDATE() - INTERVAL 7 DAY) as consistencia;

-- SELECT PARA CALCULAR XP

-- SELECT SUM(amount) FROM xp_logs WHERE user_id = ?;

-- drop database caminhodaforca;