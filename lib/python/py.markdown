used as following

``` python
#!bin/python3
from dblib import database
#connect to database

host = "localhost"
port = "3434" #can be int
username = "admin"
password = "login"

db = database(host, port, username, password)

db.push("/path", {"object":{"dict":"yes"}}) #sets /path/object/dict to yes

print(db.get("/path/object/dict").text) #returns "yes"

db.delete("/path") #delete all children

print(db.get("/").text) #returns {}
```