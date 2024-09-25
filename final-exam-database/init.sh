mongoimport --collection users --file ./data/users.json --jsonArray --uri "mongodb://mongo-db:27017"
mongoimport --collection posts --file ./data/posts.json --jsonArray --uri "mongodb://mongo-db:27017"
mongoimport --collection comments --file ./data/comments.json --jsonArray --uri "mongodb://mongo-db:27017"