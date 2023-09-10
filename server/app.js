import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import cors from "cors";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
// graphql modules
import query from "./graphql/resolver/query.js";
import mutations from "./graphql/resolver/mutation.js";
import expressFileUpload from 'express-fileupload'
import schema from "./graphql/schema.js";
import mongoose, { connect } from "mongoose";
import { DB, PORT } from "./config/variables.js";
import fileUpload from "./util/fileupload.js";


//
const app = express();
const httpServer = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


// set appolo server
const server = new ApolloServer({
  typeDefs:schema,
  resolvers:{...query,...mutations},
});

//file uplading api
app.post("/file-upload", expressFileUpload(), fileUpload)


const startServer=async () => {
  await server.start();

  app.use(
    "/graphql",
    cors(),
    bodyParser.json({ limit: "50mb" }),

    expressMiddleware(server, {
      context:async ({ req, res }) => ({ req, res })
    })
  );

  // Modified server startup
  await new Promise((resolve) => httpServer.listen({ port: PORT ?? 8000 }, resolve));
  console.log(` Server ready at http://localhost:${PORT}/graphql`);
};


// CONNECT TO DATABASE
mongoose.set('strictQuery', true)
mongoose.pluralize(null)
connect(DB)
    .then(startServer)
    .catch((err) => {
        console.log("Not connected to db")
        console.log(err)
    })