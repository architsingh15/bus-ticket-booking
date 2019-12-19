# bus-ticket-booking
A bus ticket booking api server build on express.js with MongoDB as the backend. 

Hosted on heroku on the url: https://mighty-retreat-96950.herokuapp.com
Example API: https://mighty-retreat-96950.herokuapp.com/api/tickets/open

**API docs:**

**POST '/api/ticket'**
* *Create a ticket in tickets collection and corresponding user in user collection with seat_number*
* *All of the attributes are required*
* payload: 
* {
    "seat_number": 1, -> possible values 1 to 40
    "passenger": { -> passenger details
        "name": "John Doe",
        "sex": "M",
        "age": 65,
        "phone": "9123003689", -> has to be unique in the whole user collection, hence, primary key for users
        "email": "whereandhow@gmail.com"
    }
}
* returns:
200: if success, returns object that was saved
404: if fails returns error in this format {message:"error in string"}

**PUT '/api/ticket/:ticket_id'**
* *Edit the ticket details and/or the passenger details*
* *All the attributes are optional*
* payload: 
* {
    "is_booked": true, -> can be true or false
    "passenger": {
        "name": "Doosra John Doe",
        "sex": "M",
        "age": 135,
        "phone": "1223123123",
        "email": "whyandwhen@gmail.com"
    }
}
* returns:
200: if success, returns object that was saved
404: if fails returns error in this format {message:"error in string"}

**GET /api/ticket/:ticket_id**
* *Get the status of the ticket based on the ticket_id passed in URL*
* returns:
200: if success, returns object that was saved
404: if fails returns error in this format {message:"error in string"}

**GET /api/tickets/open**
* *Get a list of tickets which have is_booked: false, that is, are open*
* returns:
200: if success, returns object that was saved
404: if fails returns error in this format {message:"error in string"}

**GET /api/tickets/closed**
* *Get a list of tickets which have is_booked: true, that is, are closed*
* returns:
200: if success, returns object that was saved
404: if fails returns error in this format {message:"error in string"}

**GET /api/ticket/details/:ticket_id**
* *Get the user details of the ticket based on the ticket_id passed*
* returns:
200: if success, returns object that was saved
404: if fails returns error in this format {message:"error in string"}

**POST /api/tickets/reset**
* *Open all the tickets that are in the DB*
* *sets is_booked:false in all documents in tickets collection*
* payload:
* {
	"username": "admin",
	"password": "password"
}

* returns:
200: if success, returns object that was saved
404: if fails returns error in this format {message:"error in string"}

**MongoDB schema**
* *Ticket document*
{
  "_id": {
    "$oid": "5dfaa42e141c423ce7f54f99"
  },
  "is_booked": false,
  "date": {
    "$date": {
      "$numberLong": "1576707116951"
    }
  },
  "seat_number": {
    "$numberInt": "3"
  },
  "passenger": {
    "$oid": "5dfa70e1c171c3412314d48d"
  }
}
* *User document*
{
  "_id": {
    "$oid": "5dfa70e1c171c3412314d48d"
  },
  "name": "RK Singh",
  "sex": "M",
  "age": {
    "$numberInt": "64"
  },
  "phone": "1223123123",
  "email": "rksingh@gmail.com"
}
* user can be accessed via the ticket.passenger._id

**Packages used**:
* "bcrypt": "^3.0.7" -> used for hashing and storing comparing passwords
* "body-parser": "^1.19.0" -> middleware used for parsing the req.body as a json
* "dotenv": "^8.2.0" -> to set process environment variables
* "express": "^4.17.1" -> for API building blocks
* "joi": "^14.3.1" -> Input validation middleware
* "mongoose": "^5.8.1" -> MongoDB ORM
* "mongoose-unique-validator": "^2.0.3" -> used for maintaining unique phone number among user documents among the whole of the user collection
