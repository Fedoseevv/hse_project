# project-hse

Первоначальная установка
1. cd server -> npm i
2. cd client -> npm i
3. В корне папки server создать файл <code>.env</code> с содержимым:<br>
   <code>PORT=номер_порта<br>
   DB_NAME=имя_бд<br>
   DB_USER=имя_юзера<br>
   DB_PASSWORD=пароль_бд<br>
   DB_HOST=localhost<br>
   DB_PORT=5432<br>
   SECRET_KEY=my_secret</code><br>
Запуск
1. cd server -> npm run dev
2. cd client -> npm run start
