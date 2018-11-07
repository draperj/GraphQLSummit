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
    

### TODO: UI validation with Happo, Codegen?