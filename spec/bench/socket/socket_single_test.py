#!bin/env python3
from timeit import timeit, default_timer
from db_socket import database

amount = 10000

db = database("localhost", "3434", "admin", "password")

def write():
    db.push("/path", "random string that is a bunch of text")

def read():
    db.get("/path")

def delete():
    db.delete("/path")


def main():
    write()
    read()
    delete()

#THIS OVERRIDES OLD DATA SO INCONCLUSIVE
'''
print("write")
w = timeit("write()", "from __main__ import write, db", number=10, timer=default_timer)
print(10*amount, w)
print("read")
r = timeit("read()", "from __main__ import read, db", number=10, timer=default_timer)
print(10*amount, r)
print("delete")
d = timeit("delete()", "from __main__ import delete, db", number=10, timer=default_timer)
print(10*amount, d)
#CLEAR DATABASE
db.delete("/")
'''

time = timeit("main()", "from __main__ import main, write, read, delete, db", timer=default_timer, number=amount)
print(time)