### GraphQL Basics
* REST is Procedural, wrote procedure/function calls for a narrow/specific purpose
* Leads to tightly coupled backend and frontend
* GraphQL is Declarative, where app/client defines data requirement
* Leads to less code for serving data, consistent performance 
* GET is to query{}
* PUT/POST is to mutation{}
* Query variables are placed in the BODY of HTTP communications, written in JSON format

* 5 scalar types: Int, FLoat, String, Boolean, ID
Ex:

	type Photo {
	      id: ID!
	      name: String!
	      url: String!
	      description: String
	      rating: Float
	      private: Boolean!
	}

### Relationships between Data
* One to one
Ex:     

		type Photo { 
			postedBy: User! 
		}

  	
* One to many
Ex:

	   type User {
	   		postedPhotos: [Photo!]!
		}

* Many to many
Ex:

		type Student {
		      schedule: [Course!]!
		}
		type Course {
		      students: [Student!]!
		}

* Through Types
Ex:

		type City {
		     name: String!
		     connections: [Connection!]!
		}
		 
		type Connection {
		     distance: Int!
		     to: City!
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
Ex:
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

### GraphQL Architecture
* GraphQL easily architected as a MicroService
* GraphQL expresses all of what is possible for the client, not silos of specific possibilities
* GraphQL can be an abstraction layer between many other data services/repos
    * Scaling efficiently: get only what you need (small payloads), get everything you need (avoid roundtrips to API), unifies services
    * Stability: adding features will not break existing clients, self documenting APIs
* Iteration possible for APIs that was not previously possible
* Microservices allow small teams to move quickly
* Allows central management to secure your entire API (as it uses a singular /graphql endpoint)
* GQL schema does not and should not match your REST API format
* Does not have to map your UI 1 to 1
* Model interface to our core domain
* Let go of coupling to database schema
* Be experts to our domain (our content/data)
* API first design, built by the product team for the feature/app
* Prefer highly optimized fields over generic/smart fields
Ex: 
        user(id: ID, login: String) User
have 
        
        user(id: ID!) User 
        user(login: String!) User
* Best practices:
    * Integrity - One Graph of all your data (Data Schema defined for all data in a single source)
    * Integrity - Federated Implementation (centrally defined)
    * Integrity - Track the Schema in a registy (i.e. track via version controlling)
    * Agility - Abstract Schema, Oriented Around Product Needs (Frontend defined backend), build pieces of schema only when it is needed
    * Agility - Use an Agile Approach to Schema Development
    * Agility - Iteratively Improve Performance, premature optimization is the root of all evil
    * Agility - Use GraphQL Metadtata to Empower Developers
    * Operations - Access and Demand control, who can do what, how many queries can you send
    * Operations - Structured Logging, allows transparent and strongly typed logging tools
    * Operations - Separate the GraphQL Layer from the Service Layer, where Service layers are not closely coupled to GraphQL

### Schema Design
Patterns for Schema Design
1. Never expose implementation details in your API design
1. It's easier to add elements than to remove them
1. Group closely-related fields together into their own type
1. Look forward to the future. Can you envision a time when a list field might need to be paginated
1. Use object references instead of ID fields.
1. Choose field names based on what makes sense, not based on the implementation or what it was called in a legacy API
1. Use enums for fields which can only take a specific set of values
1. The API should provide business logic, not just data. Complex calculations should be performed on the server, rather than the client
1. Use a payload that as a return type (updated object, as well as metadata about the related object)
1. Mutations should provide user/business level errors via an 'errors' field on the mutation payload. 
1. Most payload fields for a mutation should be nullable

### Caching
* No inherent caching for GraphQL due to calls being done via HTTP POST requests
* Caching needs to be done on the client
* Queries that are subsets of previous queries are very fast if already cached as data is already on the client
* GraphQL client caching should cover what REST caching does, but more 
    * Client cachings value is more about creating a local version of your graph, and building it out over transactions 
*  Local cache is made up of flat data graph structures for specific queries (queries made for Dog A and Dog B would be cached seperately as flat data graph objects)

### Use Case Examples
* TV2 Denmark
    * 12m queries average/day
    * GraphQL service is talking to many REST APIs
* Netflix (Internal tooling)
    * Many langues in their development environment
    * Many many microserves (REST based)
    * Security infrastrcutre (see netflix security youtube channel)
    * How to run scalable services in the cloud (AWS)
    * GraphQL is being used to tie together their services in a microservice
* GitHub
    * 200+ engineers work w/ GraphQL
    * Public and Internal Schema + Enterprise
    * Graphql is a type system to express posibilities
    * Declarative for clients
    * Best way to mititgate breakines changes we dont know about yet
    * Build APIs that are easier to reason about (easier to use)
* Shopify
    * Started using GraphQL to power mobile apps (iOS and Android)
    * 10 to 20 PRs for GraphQL a day and rising

### Apollo
* Apollo provides change management around schema changes, that can be integrated into CI/CD
* Products
    * Apollo client (native/web)
    * Apollo server (nodejs backend)
    * Apollo CLI, IDE plugins, Chrome Devtools
    * Schema Registry, allows tracking of changes to schema
    * Client registry (auth?), Operation registry (access control), Trace warehouse (structured logging)
    * Data graph access control
    * Schema change control
    * GraphQL gateway and query execution engine, allows distributing load over many microservices
    
### AWS AppSync
* AWS AppSync, provides enterprise security features: IAM, Cognito, OIDC, API keys
* Offer offline first applications
* React Native, Android, iOS, and Web clients
* Focuces on Security, Availability, Scalability 