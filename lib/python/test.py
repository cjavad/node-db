#!bin/python3
from dblib import database
#connect to database

host = "localhost"
port = "3434" #can be int
username = "admin"
password = "password"

db = database(host, port, username, password)

for i in range(1000):
    print(i)
    db.push("/" + str(i), {"object":{"dict":"yes"}}) #sets /path/object/dict to yes
