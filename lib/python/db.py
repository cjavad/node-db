import json
import socket

def get_obj(username, password, command, path, data = None, override = None):
    return "depreicated"

class db:
    def __init__(self, host, port, username, password, buffer = 1024):
        self.buffer = buffer
        self.socket = socket.create_connection((host, port))
        self.socket.send(bytes(json.dumps({"command":"login","username":username, "password":password}), "utf-8"))

    def get(self, path):
        obj = bytes(json.dumps({"command":"getData", "path":path}), "utf-8")
        self.socket.send(obj)
        d = self.socket.recv(self.buffer).decode("utf-8")
        try:
            data = json.loads(d)
            return data
        except:
            return d

    def push(self, path, data, override = False):
        obj = bytes(json.dumps({"command":"push", "path":path, "data":data, "last":override}), "utf-8")
        self.socket.send(obj)
        return self.socket.recv(self.buffer).decode("utf-8")

    def delete(self, path):
        obj = bytes(json.dumps({"command":"delete", "path":path}), "utf-8")
        self.socket.send(obj)
        return self.socket.recv(self.buffer).decode("utf-8")

    def find(self, path, query):
        obj = bytes(json.dumps({"command":"find", "path":path, "data":query}), "utf-8")
        self.socket.send(obj)
        return self.socket.recv(self.buffer).decode("utf-8")

    def find_one(self, path, query):
        obj = bytes(json.dumps({"command":"find", "path":path, "data":query}), "utf-8")
        self.socket.send(obj);
        return self.socket.recv(self.buffer).decode("utf-8")

    def use(self, database):
        obj = bytes(json.dumps({"command":"use", "data":database, "last":""}))