# Pizza App
This is an api for a blogg app

---

## Requirements
1.	Users should have a first_name, last_name, email, password, (you can add other attributes you want to store about the user)
2.	A user should be able to sign up and sign in into the blog app
3.	Use JWT as authentication strategy and expire the token after 1 hour
4.	A blog can be in two states; draft and published
5.	Logged in and not logged in users should be able to get a list of published blogs created
6.	Logged in and not logged in users should be able to to get a published blog
7.	Logged in users should be able to create a blog.
8.	When a blog is created, it is in draft state
9.	The owner of the blog should be able to update the state of the blog to published
10.	 The owner of a blog should be able to edit the blog in draft or published state
11.	 The owner of the blog should be able to delete the blog in draft or published state
12.	The owner of the blog should be able to get a list of their blogs. 
a.	The endpoint should be paginated
b.	It should be filterable by state
13.	Blogs created should have title, description, tags, author, timestamp, state, read_count, reading_time and body.
14.	The list of blogs endpoint that can be accessed by both logged in and not logged in users should be paginated, 
a.	default it to 20 blogs per page. 
b.	It should also be searchable by author, title and tags.
c.	It should also be orderable by read_count, reading_time and timestamp
15.	When a single blog is requested, the api should return the user information(the author) with the blog. The read_count of the blog too should be updated by 1
16.	Come up with any algorithm for calculating the reading_time of the blog.
17.	Write tests for all endpoints

Note:
The owner of the blog should be logged in to perform actions
Use the MVC pattern

---
## Setup
- Install NodeJS, mongodb
- pull this repo
- update env with example.env
- run `npm run start:dev`

---
## Base URL
- 


## Models
---
blogModel - defining the schema for the blog output
userModel - deines the schema for the users accessing the blog


### User
use - they should have a unique email, first_name, last_name to access the blog


### Blog
|



## APIs
---

### Signup User

- Route: /signup
- Method: POST
- Body: 
```
{
  "email": "doe@example.com",
  "password": "Password1",
  "firstname": "Ali",
  "lastname": "Abu",
}
```

- Responses

Success
```
{
    message: 'Signup successful',
    user: {
        "email": "doe@example.com",
        "password": "Password1",
        "firstname": "jon",
        "lastname": "doe",
        "username": 'jon_doe",
    }
}
```
---
### Login User

- Route: /login
- Method: POST
- Body: 
```
{
  "password": "Password1",
  "username": 'jon_doe",
}
```

- Responses

Success
```
{
    message: 'Login successful',
    token: 'sjlkafjkldsfjsd'
}
```

---
### Create Blog

- Route: /orders
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
    items: [{ name: 'chicken pizza', price: 900, size: 'm', quantity: 1}]
}
```

- Responses

Success
```
```
---
### Get Blog

- Route: /orders/:id
- Method: GET
- Header
    - Authorization: Bearer {token}
- Responses

### Get Blogs


## Contributor
- Rasheed Olayanju