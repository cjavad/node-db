# node-db
A nosql database written in node (Using a fork of [node-json-db](https://github.com/Belphemur/node-json-db/blob/master/LICENSE))
using unix-like paths

example:
```python
#!bin/python3
from dblib import database #python database lib

db = database("localhost", "3434", "admin", "password")
#push to database
db.push("/path/with/object", {"key":"Hello"})

print(db.get("/").text) # prints {"path":{"with":{"object":{"key":"Hello"}}}}

print(db.get("/path/to/object/key").text) #prints Hello

db.delete("/") #deletes hole database

print(db.get("/").text) #prints {}
```