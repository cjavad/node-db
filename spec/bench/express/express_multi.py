from db_express import database
from timeit import timeit, default_timer



def a1():
    db1 = database("localhost", "3434", "admin", "password")
    db1.push("/1", "database 1")
    db1.get("/1") # returns database 1
    db1.delete("/1")
    
def a2():
    db2 = database("localhost", "3434", "admin", "password")
    db2.push("/2", "database 2")
    db2.get("/2") # returns database 2
    db2.delete("/2")

def a3():
    db3 = database("localhost", "3434", "admin", "password")
    db3.push("/3", "database 3")
    db3.get("/3") # returns database 3
    db3.delete("/3")

def a4():
    db4 = database("localhost", "3434", "admin", "password")
    db4.push("/4", "database 4")
    db4.get("/4") # returns database 4
    db4.delete("/4")
    
    
def a5():
    db5 = database("localhost", "3434", "admin", "password")
    db5.push("/5", "database 5")
    db5.get("/5") # returns database 5
    db5.delete("/5")


def main(num):
    for i in range(num):
        a1()
        a2()
        a3()
        a4()
        a5()

r = timeit("main(10)", "from __main__ import a1, a2, a3, a4, a5, main", timer=default_timer, number=100)
print(r)