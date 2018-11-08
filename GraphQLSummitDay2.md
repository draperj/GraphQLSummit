___
### Keynote
___
* Apollo - Doing GraphQL Right
* 21% of NodeJS devs are using GraphQL
* REST is Procedural, wrote procedure/function calls for a narrow/specific purpose
* Leads to tightly coupled backend and frontend
* GraphQL is Declarative, where app/client defines data requirement
* Leads to less code for serving data, consistent performance 
* FE team is waiting on BE team for endpoints w/ Rest, GraphQL allows joining of data from existing endpoints/data repos
* GraphQL easily architected as a MicroService
* GraphQL can be an abstraction layer between many other data services/repos
* Allows central management to secure your entire API (as it uses a singular /graphql endpoint)
* Apollo provides change management around schema changes, that can be integrated into CI/CD
* Best practices:
    * Integrity - One Graph of all your data (Data Schema defined for all data in a single source)
    * Integrity - Federated Implementation
    * Integrity - Track the Schema in a registy (i.e. track via version controlling)
    * Agility - Abstract Schema, Oriented Around Product Needs (Frontend defined backend), build pieces of schema only when it is needed
    * Agility - Use an Agile Approach to Schema Development
    * Agility - Iteratively Improve Performance, premature optimization is the root of all evil
    * Agility - Use GraphQL Metadtata to Empower Developers
    * Operations - Access and Demand control, who can do what, how many queries can you send
    * Operations - Structured Logging, allows transparent and strongly typed logging tools
    * Operations - Separate the GraphQL Layer from the Service Layer, where Service layers are not closely coupled to GraphQL
---
Apollo Platform 
    
* Apollo client (native/web)
* Apollo server (nodejs backend)
* Apollo CLI, IDE plugins, Chrome Devtools
* Schema Registry, allows tracking of changes to schema
* Client registry, Operation registry, Trace warehouse (structured logging)
* Data graph access control
* Schema change control
* GraphQL gateway and query execution engine, allows distributing load over many microservices

---
* Apollo engine's CI/CD integration can allow transparency into what queries from clients you may have broken with a schema change
* Federated Execution - Apollo Gateway, creates a query plan driven by service definition files 
* Schema Valid, Access control, analytics $49/m, Enterprise offered Distributed Execution and Production SLAs per contact basis
* James demoing Apollo products, Peggy - noon Apollo client state management, Martin distributed execution

___
### Adam Neary - GraphQL at AirBNB
___

* Used throughout web, ios and android for data layer
* API response determines layout of client, as client and API use the same data graph. Data responses are specific to frontend data requirements (ex: avatar, bio, name for an author)
* Allows components to have embedded queries specific to their needs (this is adventageous for server rendered pages)
* Live demo of adjusting GraphQL schema for server, and implementing in frontend using design pattern of front-end defined data schemas/models

---
### Netflix - Microservices and GraphQL
---
* Netflix dev culture. Freedom and Responsibility. Informed Captains (team leads). Highly aligned, Loosely coupled (dev teams)
* Speaker from Content engineering, helping to create content to be delivered via streaming service
* Challenges
    * Many langues in their development environment
    * Many many microserves (REST based)
    * Security infrastrcutre (see netflix security youtube channel)
    * How to run scalable services in the cloud (AWS)
    * All distracting from delivering data to the application
    * How to make new requests compatible with the commitments teams have already made, and developer mindshare on data delivery?
    * Creating integrations between data and teams that previously did not exist
    * GraphQL enables a data network (or graph) to begin to build a utility to serve data from many sources, to distribute to applications to consume 
    * swagger-to-graphql (yarax on github.com), translator tool
    * DB servers (graphile.org)
    * graphql_grpc - generating a graphql schema from a grpc service
        * ruby based tool to allows ruby backend services to talk with GraphQL and generating the schema for GraphQL based on the service

---
### Convincing your Org about GraphQL
---
* 1 API for multiple clients
* Frontend iterations without backend changes (if the backend is structured with the right data schema at the start)
* Easy to onboard engieers to using GraphQL as all data available from the API is very explicit and easy to explore
* Ecosystem to support GraphQL is great (Apollo, Prisma)
* Scaling efficiently: get only what you need (small payloads), get everything you need (avoid roundtrips to API), unifies services+microservices+third party services
* Stability
    * adding features will not break existing clients
    * self documenting APIs
    * Apollo provides deep analytics and insights on every request
* Risks of using GraphQL
    * hard to hire experienced graphql devs (hire good javascript devs, train for graphql) 
    * more tooling (platform still maturing for enterprise scale)
    * query complexity
    * rate limiting, caching
* Current state after implementing GraphQL
    *doubled users and improved performance
    *minimized downtime
    * devs can now focus on more front-end app based features rather than writing backends
* Novvum helped create their GraphQL backend

---
### TV2 Denmark - Destined to Fail
---
* Embracing failure in GraphQL
* GraphQL API gateway runnin ong Apollo Server 1 using Dataloader (facebook)
* Web, iOS, Android, Apple TV, Android TV, Google Cast all using GraphQL
* 12m queries average/day
* GraphQL service is talking to many REST APIs
* Common GraphQL Failures
    * unexpected response from underlying services
    * reponse is too transparent (exposing errors and information about internal services to the client)
    * slow response from services (network or server latency)
* Improving failures
    * graceful degradation
    * wrap your errors (log debug info but show the user bare minimum info)
    * Mock your dependencies (ensure you handle edge cases from 3rd party services when developing)
* Circuit breaker design for fetching data
    * Design allows for a number of failures before server closes access to the underlying service that is failing
    * The server will allow a single request through then in a OPEN state to recheck if service still down, if it is the server keeps the state OPEN, if it suceeds server goes back into CLOSE state
    * This design helps limit failures of an underlying service, to reduce network traffic if a service is nonresponsive (talking to a down service over and over even though your server knows it is down)

---
### Github - Schema Design
---
* 200+ engineers work w/ GraphQL
* Public and Internal Schema + Enterprise
* Graphql is atype system to express posibilities
* Declarative for clients
* Best way to mititgate breakines changes we dont know about yet
* Build APIs that are easier to reason about (easier to use)

Misconceptions about Schemas/Types
* GQL is rarely just a layer over your database in complex applications
* GQL schema does not and should not match your REST API format
* Does not have to map your UI 1 to 1

Real Power
* Model interface to our core domain
* Let go of coupling to database schema
* Be experts to our domain (our content/data)
* API first design, built by the product team for the feature/app

Guiding Principles of Schema Design
* Less nullable, tell the client what is required of them
* Provide behaviour fields that answer a question of a client use case 
* Atomicity vs Granularity (everything for fields vs use case specific fields)
* Netflix: Client optimized API adapters (article)
* Client must always defined exactly what it needs, no select all
* Dont be afraid to add new use cases
* Embrace the different use cases and clients
* Prefer highly optimized fields over generic/smart fields
*instead of having 

        user(id: ID, login: String) User
    have 
        
        user(id: ID!) User 
        user(login: String!) User
* GraphQL Doctor can help review changes to the schema and advise on best practices
* By not having a Select *, you now know exactly how your GraphQL API is used down to individual fields
* Built analytics on specific fields, their related type and app to place in analytics DB
    * Exposed via slack bot, where devs can ask the bot the usage of a specific field

---
### Shopify - Battled Hardened API patterns from two years in production
---
* API Patterns team 
    * establishing patterns and best practices for APIs
* Started using GraphQL to power mobile apps (iOS and Android)
* 10 to 20 PRs for GraphQL a day and rising
* <github.com/shopify/graphql-design-tutorial>
* Modern app development: speed and cornering and exploritory
    * dont shy away from change or trying new things
    * subject to rapid course correction
* API design should support the app to change as much as it is needed
    * easy to add, hard to change or remove
    * design choises stick around
    * strive for magic balance of not over-engineering but not oversimplifying
    * OR dont paint yourself into a corner, build only what's needed today
    * Strive to get it right the first time
* APIs cant always forward-think their way out
* Additions are easy, but some changes requires evolition
* GraphQL allows you to create new data shapes with new names from their sources
* Providing  IDs in GQL is an antipattern, just return the object with the query
* GraphQL offers an opportunity to remove magic strings, and instead use defined ENUM values

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
1. Mutatrions should provide user/business level errors via an 'errors' field on the mutation payload. 
1. Most payload fields for a mutation should be nullable

---
### Apollo - Testing GraphQL
---
* Purpose of testong
    * Safety of prod code
    * Documentation
* Testing Clients
    * react-testing-library usesful for react testing
* Testing Servers
    * Resolvers are just functions
    * apollo-server-testing for integration testing

---
### Supercharge your Schema with custom Directives 
---
* Ryan Chenkie Node Consultant
* Schema Directive: provide a way to describe alternate runtime execution and type validation behavior in a GraphQL document
* Built in directives @skip and @include for queries
* On schemas @deprecated
* ex custom directive:

        foo:String @mydirective(with: "some val")
* Uses for custom directives: localization, authentication, access control, string formatting, caching, perform async work
* SchemaDirectiveVisitor class from Apollo, visitFieldDefinition or visitObject as functions under this class
*Definition in schema

        directive @replace(replacement: String) on FIELD_DEFINITION
    Also requires defined override in SchemaDirectiveVisitor, and being pased into schema
* Using context for Authorization
* Schema directives aren't the only option, middleware allows execution of things like auth before resolvers run
    * graphql-middleware

### TODO: UI validation with Happo, Codegen?, Netflix: Client optimized API adapters (article), GraphQL Doctor for CI <https://github.com/cap-collectif/graphql-doctor>

### Contacts
Apollo 
* Marc Berman - Sales
* Michael Watson - Tech Rep