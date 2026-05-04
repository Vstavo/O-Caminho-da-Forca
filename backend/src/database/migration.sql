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
    demon ENUM('distracao', 'procrastinacao', 'prazerVazio', 'conforto', 'dispersao'),
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_update DATE,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE goals_metrics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    goal_id INT UNIQUE,

    total_progress INT DEFAULT 30,
    progress_points INT DEFAULT 1,
    progress INT DEFAULT 0,

    status ENUM('ativo', 'completo') DEFAULT 'ativo',

    FOREIGN KEY (goal_id) REFERENCES goals(id) ON DELETE CASCADE
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

insert into streaks (user_id, current_streak, best_streak, last_checkin_date) values ( 1, 1, 1, '2026-04-24');
insert into streaks (user_id, current_streak, best_streak, last_checkin_date) values ( 1, 2, 2, '2026-04-25')
ON DUPLICATE KEY UPDATE
	current_streak = VALUES(current_streak),
	best_streak = VALUES(best_streak),
	last_checkin_date = VALUES(last_checkin_date);
insert into streaks (user_id, current_streak, best_streak, last_checkin_date) values ( 1, 3, 3, '2026-04-26')
ON DUPLICATE KEY UPDATE
	current_streak = VALUES(current_streak),
	best_streak = VALUES(best_streak),
	last_checkin_date = VALUES(last_checkin_date);
insert into streaks (user_id, current_streak, best_streak, last_checkin_date) values ( 1, 4, 4, '2026-04-27')
ON DUPLICATE KEY UPDATE
	current_streak = VALUES(current_streak),
	best_streak = VALUES(best_streak),
	last_checkin_date = VALUES(last_checkin_date);
insert into streaks (user_id, current_streak, best_streak, last_checkin_date) values ( 1, 5, 5, '2026-04-28')
ON DUPLICATE KEY UPDATE
	current_streak = VALUES(current_streak),
	best_streak = VALUES(best_streak),
	last_checkin_date = VALUES(last_checkin_date);
insert into streaks (user_id, current_streak, best_streak, last_checkin_date) values ( 1, 6, 6, '2026-04-29')
ON DUPLICATE KEY UPDATE
	current_streak = VALUES(current_streak),
	best_streak = VALUES(best_streak),
	last_checkin_date = VALUES(last_checkin_date);
insert into streaks (user_id, current_streak, best_streak, last_checkin_date) values ( 1, 7, 7, '2026-04-30')
ON DUPLICATE KEY UPDATE
	current_streak = VALUES(current_streak),
	best_streak = VALUES(best_streak),
	last_checkin_date = VALUES(last_checkin_date);

insert into xp_logs (user_id, amount, source) values ( 1, 10, 'mental');
insert into xp_logs (user_id, amount, source) values ( 1, 10, 'mental');
insert into xp_logs (user_id, amount, source) values ( 1, 10, 'mental');
insert into xp_logs (user_id, amount, source) values ( 1, 10, 'mental');
insert into xp_logs (user_id, amount, source) values ( 1, 10, 'mental');
insert into xp_logs (user_id, amount, source) values ( 1, 10, 'mental');
insert into xp_logs (user_id, amount, source) values ( 1, 10, 'mental');
insert into xp_logs (user_id, amount, source) values ( 1, 10, 'streak');
insert into xp_logs (user_id, amount, source) values ( 1, 10, 'streak');
insert into xp_logs (user_id, amount, source) values ( 1, 15, 'streak');
insert into xp_logs (user_id, amount, source) values ( 1, 10, 'streak');
insert into xp_logs (user_id, amount, source) values ( 1, 10, 'streak');
insert into xp_logs (user_id, amount, source) values ( 1, 15, 'streak');
insert into xp_logs (user_id, amount, source) values ( 1, 10, 'streak');

insert into demon_logs (user_id, demon, log_date, status, xp) values (1, 'prazerVazio', '2026-04-24', 'resistiu', 15);
insert into demon_logs (user_id, demon, log_date, status, xp) values (1, 'distracao', '2026-04-25', 'resistiu', 15);
insert into demon_logs (user_id, demon, log_date, status, xp) values (1, 'prazerVazio', '2026-04-26', 'falhou', -10);
insert into demon_logs (user_id, demon, log_date, status, xp) values (1, 'conforto', '2026-04-27', 'resistiu', 15);
insert into demon_logs (user_id, demon, log_date, status, xp) values (1, 'preguica', '2026-04-28', 'pulou', 0);
insert into demon_logs (user_id, demon, log_date, status, xp) values (1, 'dispersao', '2026-04-29', 'resistiu', 15);
insert into demon_logs (user_id, demon, log_date, status, xp) values (1, 'procrastinacao', '2026-04-30', 'resistiu', 15);

insert into xp_logs (user_id, amount, source) values (1, 15, 'demon');
insert into xp_logs (user_id, amount, source) values (1, 15, 'demon');
insert into xp_logs (user_id, amount, source) values (1, -10, 'demon');
insert into xp_logs (user_id, amount, source) values (1, 15, 'demon');
insert into xp_logs (user_id, amount, source) values (1, 0, 'demon');
insert into xp_logs (user_id, amount, source) values (1, 15, 'demon');
insert into xp_logs (user_id, amount, source) values (1, 15, 'demon');

insert into goals (user_id, title, description, created_at, last_update) values (1, 'Meditar 30 minutos', 'Fazer meditação diária de 30 minutos', '2026-04-24', '2026-04-30');
insert into goals (user_id, title, description, created_at, last_update) values (1, 'Exercícios físicos', 'Fazer exercícios 3x por semana', '2026-04-25', '2026-04-30');
insert into goals (user_id, title, description, created_at, last_update) values (1, 'Ler um livro', 'Ler 1 livro em 30 dias', '2026-04-26', '2026-04-30');

insert into goals_metrics (goal_id, total_progress, progress_points, progress, status) values (1, 30, 1, 7, 'ativo');
insert into goals_metrics (goal_id, total_progress, progress_points, progress, status) values (2, 30, 1, 5, 'ativo');
insert into goals_metrics (goal_id, total_progress, progress_points, progress, status) values (3, 30, 1, 30, 'completo');

insert into xp_logs (user_id, amount, source) values (1, 30, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 30, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 30, 'goal');

insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');

insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');

insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 15, 'goal');
insert into xp_logs (user_id, amount, source) values (1, 50, 'goal');

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