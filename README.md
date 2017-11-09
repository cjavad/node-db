# node-db
A nosql database written in node (Insperation from the npm module node-json-db and based on the json-db-api)
using unix-like paths

example:
```python
#!bin/python3
import requests
   
auth_key = "weiwfe0eiwd0i0exw0ei20e2i0ei0ei0weiw0eiw0ei"

json_obj = {
    "key":auth_key,
    "command":"push", #can be push, getData or delete 
    "path":"/unix/like/path",
    "data":["an array", {"type":"object"}],
    "overide": False 
}
url =  "http://localhost:8080/endpoint?body=" + json_obj
r = requests.get(url)
print(r.text) #response
```