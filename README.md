Books Directory
===

## Introduce
Book directory is an api that allows users to react with Database and practice CRUD  (Create, Read, Update, Delete) operations on books and book authors and search for book by name and author name.

User story
---

```gherkin=
Admin: 
  as admin i can add author in database 
  as admin i can see all authors in database
  as admin i can show author information 
  as admin i can edit author information
  as admin i can delete author from database 
  as admin i can add Book in database 
  as admin i can see all Book in database
  as admin i can show Book information 
  as admin i can edit Book information
  as admin i can delete Book from database

User: 
  as user i can see all Book in database
  as user i can show Book information 
  as user i can search for book by name
  as user i can search for book by author name

```

## instalation

```
 $ git clone https://github.com/devstm/Books-Directory.git
 $ cd Books-Directory
 $ npm install
```
### setup database 
```
create database named book_directory by using any mySql tool

 $ npx sequelize-cli db:migrate
 $ npm run dev
```

End Points
---
```javascript=
GET   /api/v1/authors;
GET   /api/v1/authors/:id;
GET   /api/v1/search;
GET   /api/v1/books;
GET   /api/v1/book/:id;
GET   /api/v1/book;
GET   /api/v1/authorsBooks;
POST  /api/v1/book;
POST  /api/v1/create;
PUT   /api/v1/authors/:id;
PUT   /api/v1/book/:id;
DELET /api/v1/authors/:id;
DELET /api/v1/book/:id;


```


## Database Scheme 
![](https://i.imgur.com/9NLa270.png)
