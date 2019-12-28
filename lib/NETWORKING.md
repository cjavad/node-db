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
You can send commands using the following format

```json
{
    "command": "getData" || "push" || "delete" || "find" || "use", // one of these frickers
    "path":"/mypath[0]/shiz",
    "data":"Really only used for the push/find/use commands for different things",
    "last": true || false // to override or not.
}
```

**NOTE**: Might wanna put the login user/pass under data to standardize this shit, maybe later.