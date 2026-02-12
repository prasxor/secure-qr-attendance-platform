use pythonDatabase;

select id,name,email,password_hash from users;

use secure_attendance_system;

USE secure_attendance_system;
DROP TABLE alembic_version;

show tables;

DESCRIBE profiles;

UPDATE users set is_admin=1 where email = 'test@example.com';

select * from users;
select * from attendance;
select * from profiles;

DESCRIBE attendance;