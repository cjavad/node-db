It might have been important to describe the innerworkings of the network communication with node-db.

To create a session you first initilize a socket connection to the database.
To login to the database you send the following json data as string data:

```json
{
    "command":"login",
    "username":username,
    "password":password
}
```

After that nothing is returned, the only way to check if you have successfully logged in, is to try communicating with the db.