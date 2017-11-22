import timeit
from db import db

dba = db("localhost", 3434, "admin", "password")

def run():
    for i in range(1000):
        path = "/" + str(i)
        print(dba.push(path, "HELLO WORLD!"))
        print(dba.get(path))
        print(dba.delete(path))

print(timeit.timeit("run()", setup="from __main__ import run", number=1))

"""
BENCHMARKS:

3.047855800999969
3.5085566739999194
"""