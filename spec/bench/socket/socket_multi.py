from db_socket import database
from timeit import timeit

db1 = database("localhost", "3434", "admin", "password")
db2 = database("localhost", "3434", "admin", "password")
db3 = database("localhost", "3434", "admin", "password")
db4 = database("localhost", "3434", "admin", "password")
db5 = database("localhost", "3434", "admin", "password")

def 1():
    db1.push("/1", "database 1")
    db1.get("/1") # returns database 1
    db1.delete("/1")
    
def 2():
    db2.push("/2", "database 2")
    db2.get("/2") # returns database 2
    db2.delete("/2")


def 3():
    db1.push("/3", "database 3")
    db1.get("/3") # returns database 3
    db1.delete("/3")

def 4():
    db1.push("/4", "database 4")
    db1.get("/4") # returns database 4
    db1.delete("/4")
    
    
def 5():
    db1.push("/5", "database 5")
    db1.get("/5") # returns database 5
    db1.delete("/5")
    