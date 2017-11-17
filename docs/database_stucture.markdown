## Database Structure

this database is build around a fork of node-json-db
which uses unix-like paths to access data in form of json (objects)

what is does is it takes a path "/path/to/data" splits it up into an
array ["path", "to", "data"] and uses the array to access the data.

the database it self is just a simple json file (working on multiple databases here)
like this

```json
{
  object:{
    string:"string",
    number:121,
    or:"integer",
    float:1.23
  },
  array:[
    "1",
    2,
    3.3
  ]
}
```

and can be accessed like this

```
get /object/string => "string"

get /object/float => 1.23

get /array[2] => 2

push /path {object:{hallo:false}} => "OK"

get /path/object/hallo => false
```
