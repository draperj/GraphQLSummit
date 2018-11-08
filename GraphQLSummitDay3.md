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

### TODO: Can Apollo Gateway be facing externally with internally facing GraphQL microservices? iTerm2