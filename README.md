# node-db
A nosql database written in node (Using a fork of [node-json-db](https://github.com/Belphemur/node-json-db/blob/master/LICENSE))
using unix-like paths

example:
```python
#!bin/python3
from __init__ import db_socket as database #python database lib

db = database("localhost", "3434", "admin", "password")
#push to database
db.push("/path/with/object", {"key":"Hello"})

print(db.get("/").text) # prints {"path":{"with":{"object":{"key":"Hello"}}}}

print(db.get("/path/to/object/key").text) #prints Hello

db.delete("/") #deletes hole database

print(db.get("/").text) #prints {}

```

### License

MIT License

Copyright (c) 2017 Javad Shafique

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
