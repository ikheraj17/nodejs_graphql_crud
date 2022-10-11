const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require("@prisma/client")

// let links = [{
//     id: 'link-0',
//     url: 'www.howtographql.com',
//     description: ' Fullstack tutorial for GraphQL'
// }]

//2
const resolvers = {
    Query: {
        info: () => `This is the API for the Hackernews Clone`,
        feed: () => links,
        oneLink: (parent, args) => {
            const { todoId } = args;
            for(var j = 0; j < links.length; j++) {
                if(links[j].id ===  todoId) {
                    return links[j]
                }
            }
            return "Nothing found"
        }
    },
    Mutation: {
        post: (parent, args) => {
            let idCount = links.length

            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        },
        delete: (parent, args) => {
            let toDelete = args.id
            for(var i=0; i < links.length; i ++) {
                if(links[i].id === toDelete){
                  links.splice(i, 1); 
                  let ok = Boolean(links[i]);
                  return { ok }
                }
            }
            return "what"
        },
        update: (parent, args) => {
            let newDescrip = args.description;
            let newUrl = args.url;
            let findThis = args.todoId;
            for(var i = 0; i < links.length; i ++) {
                if(newUrl || newDescrip && links[i].id === findThis) {
                    if(newUrl && !newDescrip) {
                        links[i].url = newUrl;
                    }
                    else if (newUrl && newDescrip) {
                        links[i].url = newUrl;
                        links[i].description = newDescrip;
                    } else if(!newUrl && newDescrip) {
                        links[i].description = newDescrip; 
                    }
                    return links[i];
                }
            }
        }
    },
}

//3
const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
})

server
    .listen()
    .then(({url}) => {
        console.log(`Server is running on ${url}`)
    })