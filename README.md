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

## Cloc Results 15/11/2017 (%day, %month, %year)
```
      16 text files.
      16 unique files.
       3 files ignored.

CLOC v 1.74  T=0.41 s (31.6 files/s, 2267.5 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
JavaScript                      11            128            174            625
Markdown                         1              1              0              3
JSON                             1              0              0              1
-------------------------------------------------------------------------------
SUM:                            13            129            174            629
-------------------------------------------------------------------------------
```