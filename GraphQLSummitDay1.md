### Bootcamp
<https://github.com/moonhighway/graphql-summit>
<http://slides.com/moonhighway/graphql-workshop>

* Moonhighway - first certified Apollo trainers
* Aliasing of queries for data
    *  personFive:person(personID: 5) {}
* View all available fields or schema
    * central + space
* Enums can be used within queries even for updating objects

* GET is to query{}
* PUT/POST is to mutation{}
* Query variables are placed in the BODY of HTTP communications, written in JSON format
* Query strings for GraphQL are turned into an array of tokens are parsed and transformed by using spaces as breakpoints (Lexing)
    * Lexing is performed on the client as well as the syntax
    * Then transformed into AST, abstract syntax tree
    * AST can be modified to return extra fields (like performance meta data), that is returned with each query

###Schema Definition Language
5 scalar types: Int, FLoat, String, Boolean, ID
Ex:

	type Photo {
	      id: ID!
	      name: String!
	      url: String!
	      description: String
	      rating: Float
	      private: Boolean!
	}

Root query defines list of queries available for API

Lists can be fully nullable, nonnullable list, or nonnullable list with nonnullable items
Ex:

		photos: [Photo]
		
		photos: [Photo]!
		
		photos: [Photo!]!	

Enums are supported

###Relationships between Data
One to one

Ex:     

		type Photo { 
			postedBy: User! 
		}

  	
One to many

Ex:

	   type User {
	   		postedPhotos: [Photo!]!
		}

Many to many
Ex

		type Student {
		      schedule: [Course!]!
		}
		type Course {
		      students: [Student!]!
		}

Through Types

Ex:


		type City {
		     name: String!
		     connections: [Connection!]!
		}
		 
		type Connection {
		     distance: Int!
		     to: City!
		}
There are root Mutations as well

Subscriptions allow for real time updating of data

#### Union Types
Ex:

Schema
 
		type Schedule {
		    agenda: [AgendaItem!]!
		}
		union AgendaItem = StudyGroup | Workout
		query {
		    agenda {
		        ...on Workout {
		           name
		           reps
		       }
		        ...on StudyGroup {
		           name
		           subject
		           students
		       }
		  }
		}

Query

		query {		
		    agenda {
		        ...on Workout {
		           name
		           reps
		       }
		        ...on StudyGroup {
		           name
		           subject
		           students
		       }
		  }
		}


### Fragments 
Custom defined objects that can be embedded within queries

Ex:


		query {
		  agenda {
		    ...WorkoutFields
		    ...on StudyGroup {
		      students
		      subject
		    }
		  }
		}
		fragment WorkoutFields on Workout {
		  name
		  reps
		}


### Interfaces
Schema

			interface ScheduleItem {
			    name: String!
			    start: Int
			    end: Int
			}

			type StudyGroup implements ScheduleItem {
			      name: String!
			      start: Int
			      end: Int
			      students: Int!
			}

### Query and Mutation
There is no actualy difference between Query or Mutation for GraphQL, they are just organisation structures

### GraphQL VS Rest
Network layer remains very similiar, as these are still HTTP calls
Ex CURL to GraphQL Server

	curl -X POST \ -H "Content-Type: application/json" \ --data '{ "query": "{allLifts{name}}" }' \ http://localhost:4000/graphql




### TODO: Lookup
* Prisma or Apollo Code Gen to generate code for schema
* Reach out to Apollo again due to Sales transition (James will be in NYC next week Weds to Fri)
* Michael Sharer - Walmart, Project Franklin
* <https://astexplorer.net/>