#!bin/env python3
from timeit import timeit, default_timer
from db_express import database

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


time = timeit("main()", "from __main__ import main, write, read, delete, db", timer=default_timer, number=amount)
print(time)