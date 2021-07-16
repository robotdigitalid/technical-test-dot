# Technical Test DOT

### 1. Buatlah sample project dengan ketentuan
    a. Menggunakan rabbitMQ untuk handle input. 
    b. Menggunakan library axios dengan ketentuan semua method terpakai  (GET, POST, PUT, PATCH, DELETE) menggunakan api berikut https://jsonplaceholder.typicode.com/
    c. Menyimpan data dari api ke database menggunakan ORM (sequelize).
    d. Petunjuk pengerjaan bisa di cek pada gambar berikut https://drive.google.com/file/d/1vvow1xfBG-PTex8UEUjcpU_SE_A_q3YI/view?usp=sharing

### 2. Buatlah video demo dari aplikasi yang sudah dibuat. Setelah penjelasan aplikasi, silahkan jelaskan terkait soal nomor 1.

### Setup Project

1. Run rabbitmq and database
   ```
   docker-compose up -d
   ```

2. Build App
   ```
   npm run build
   ```
   
3. Start the projects
   ```
   npm start
   ```
   
4. Publish rabbitmq message
   ```
   node publisher.js "{\"path\":\"/posts\",\"method\":\"GET\"}"
   node publisher.js "{\"path\":\"/posts\",\"method\":\"GET\",\"params\":{\"id\":1}}"
   node publisher.js "{\"path\":\"/comments\",\"method\":\"GET\",\"params\":{\"id\":1}}"
   node publisher.js "{\"path\":\"/posts\",\"method\":\"POST\",\"body\":{\"userId\":1,\"title\":\"Test\",\"body\":\"test\"}}"
   node publisher.js "{\"path\":\"/posts\",\"method\":\"PUT\",\"params\":{\"id\":1},\"body\":{\"id\":1,\"userId\":1,\"title\":\"Test\",\"body\":\"test\"}}"
   node publisher.js "{\"path\":\"/posts\",\"method\":\"PATCH\",\"params\":{\"id\":1},\"body\":{\"title\":\"Test\",\"body\":\"test\"}}"
   node publisher.js "{\"path\":\"/posts\",\"method\":\"DELETE\",\"params\":{\"id\":1}}"
   ```

