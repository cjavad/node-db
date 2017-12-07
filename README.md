# WARNING
### Do not use code in branch 
### It's under development use
### release/release-1.0.0.zip
### python libary is also used
### for testing so you can't use
### that either

## node-db
A nosql database written in node (Using a fork of [node-json-db](https://github.com/Belphemur/node-json-db/blob/master/LICENSE))
using unix-like paths which aims to create a simple to use fast and secure database.

example in python:
```python
#!bin/python3
from __init__ import db_socket as database #python database lib

db = database("localhost", 3434, "admin", "password")
#push to database
db.push("/path/with/object", {"key":"Hello"})

print(db.get("/").text) # prints {"path":{"with":{"object":{"key":"Hello"}}}}

print(db.get("/path/to/object/key").text) #prints Hello

db.delete("/") #deletes hole database

print(db.get("/").text) #prints {}

```
or maybe c++?:
```c++
#include <iostream>
#include "db.hpp"

using namespace std;

int main(){
    db database("localhost", 3434, "admin", "password");
    cout << database.getData("/") << endl;
}
```
heck even php:
```php
<?php
include "db.php";

database = new db("localhost", 3434, "admin", "password");
echo database->get("/");
?>
```
or ruby?:
```ruby
require "db.rb"

db = DB.new "localhost", 3434, "admin", "password"
puts db.get("/")
```

You get the point, my goal is to create an fast, awsome to use secure database with an easy api for quick hobby projects that need a database but not as complex as lets say mongodb. i choose to build an NoSql document based database based on JSON which is quite a standard (see my [stackoverflow](https://stackoverflow.com/users/8157440/javadsm?tab=profile) profile for the joke).

## License

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

### NOTICE

This software product is owned by Javad Shafique only and cannot be owned/created by
anyone els
