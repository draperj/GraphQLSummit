___
### Netflix - Convincing Backend Deelopers about GraphQL
___

* Promotes front-end and back-end to work together
* Iteration possible for APIs that was not previously possible
* Microservices allow small teams to move quickly
* GraphQL expresses all of what is possible for the client, not silos of specific possibilities
* Allows for evolution of the Schema, and the Schema be a collaborative effort between teams
* Schema stitchin allows teams to focus on their concerned area, but GQL allows the placing of these together in a single API/endpoint
* Common language of defining data between names

---
### Managing your Graph in Production
---

*  """  allows commenting within the GQL`` schema definition
* Apollo and VS Code plugin can hightlight for clients when there are issues with the Schema
* Apollo Engine provides Schema diffs, analytics into whether or not fields can be removed
* Operation Registry provides security to who can pull data from your Graph and analytics on who is accessing what
* James Baxley - @jbaxleyiii for help adopting GraphQL and Apollo

---
### Transforming Enterprises with GraphQL and Apollo
---

* Using GraphQL to talk to and merge together many systems, to massively simplify require applications for massaging and ingesting data
* Allowed incremental adoption
* increased developer productivity
* Essentially used as a data router/proxy, creating a universal API (or single source of truth)

---
### Gatsby + GraphQL
---

* data stored in GraphQL
* serve only optimized static content
* Gatsby ingests data, allows dev off of react and graphql, outputs static files to host on CDN
* Live code demo is React+Graphql (fe & be) run through single gatsby server

---
### Apollo - Schema composition
---

* Having one graph does not mean you have to have a monolithic schema
* Types should have seperated concerns, i.e. not containing fields that are other types

        type bar {
            field1: String
        }
        extend type foo {
            field2: [bar]
        }
* break up your schema by concern, not type
* Schema modularity, ApolloServer allows the importing of multiple schemas directly from the javascript file
* You can also extend off of the route query in sub-schemas
        
        extend type Query {
            hellwolrd(message:String)
        }
* You should avoid your client talking to multiple microservices, and rather use a "Gateway" GraphQL API
    * This could be achieved by a larger GraphQL server, or having multiple GraphQL sub APIs organized by a Gateway API using Schema sticking (remotely fetching and putting together the Schemas of the sub APIs)
* Design microservices with the overall schema in mind, not as isolated subschemas
* Composition should be driven by configuration, not be user code
* Apollo gateway can combine your GraphQL microservices with minimal actual GraphQL code/Schema stiching, abstracts it by just point gateway to URLs of the GraphQL microservices
    * Also handles the failing of one of the sub GraphQL microservices gracefully, returing only data from the microservices that are up, omits data that would have come from the down service
* One graphl, distributed execution
    * Build your main schema from microservices with more focused and specific schemas

---
### Apollo Client Caching in Depth
___

* No inherent caching for GraphQL due to calls being done via HTTP POST requests
* Caching needs to be done on the client
* Queries that are subsets of previous queries are very fast if already cached as data is already on the client
* GraphQL client caching should cover what REST caching does, but more 
* When mocking and working with client caching, more beneficial to have a static dataset than a dynamicly generated mock
* Client cachings value is more about creating a local version of your graph, and building it out over transactions
* Caching a graph locally can save on data duplication, for example by tracking if two objects reference the same sub object
* GraphQL caching can replace redux in the sense that between caching and reduce API calls given from GraphQL, you can allow your data graph to be your "data store"
*  Local cache is made up of flat data graph structures for specific queries (queries made for Dog A and Dog B would be cached seperately as flat data graph objects)
* Caching on structure rather than syntax of query, cache grows with data set not the number of queries performed
* apollo-cache-inmemory and apollo-cache-hermes (npm libraries)
    * hermes may return extranious fields due to optimization on cache objects being returned via reference
* Cacheing challenges: staleness, sameness (data duplication), creepiness (cached data being returned when it may be stale), worthwile-ness (is the cacheing of this data worth the extra cost)
* Initial reads are same as network calls, future reads come from local cache

___
### GraphQL without GraphQL
___
* GraphQL Principles
    * Hierarchical data
    * Product-centric
    * Strong Typing
    * Client Specified queries
    * Introspective 

* RouteQL - library for just query portion of GraphQL
* Apollo Link Rest

---
### Protect your GraphQL endpoint consumes from each other with Query Bounding
---
* AWS AppSync, provides enterprise security features: IAM, Cognito, OIDC, API keys
* Offer offline first applications
* React Native, Android, iOS, and Web clients
* Security, Availability, Scalability 
* Scaling 
    * when using subscriptions is difficult
    * execution cost directly porportional to query complexity 
* Bounding can be done by 
    * rate limiting (maybe use client/app key) 
    * depth check for query, reject queries that ask for too many nested objects
    * width check for query, rejects queries that ask for too many fields
    * resolver check for query, rejects queries that call too many resolvers
    * cost check for query, where fields are assigned a weight value that approximates to their computational cost, rejects queries that cost too much
    * Rather than flat out rejecting the query, you could also remove subqueries
    * Limit execution time (simple), can be done at the level of the query and resolvers
* howtographql on how to do bounding
* Multiple methods of bounding are required for scalable GraphQL APIs
* Monitoring use cases and how endpoints are used

* Read: semantics and complexity of GraphQL & when can we answer queries using result-bound data interfaces?
* <medium.com/open-graphql>

### TODO: Can Apollo Gateway be facing externally with internally facing GraphQL microservices? iTerm2, fakerql (fakerjs exposed via graphql)