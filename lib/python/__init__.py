import json
import socket

def get_obj(username, password, command, path, data = None, override = None):
    if not command in ["push", "getData", "delete", "find", "find_one"]:
        return False
    elif data and override != None:
        return {"username":username,"password":password,"command":command,"path":path,"data":data,"override":override}
    else:
        return {"username":username,"password":password,"command":command,"path":path}


class db:
    def __init__(self, host, port, username, password, buffer = 1024):
        self.username = username
        self.password = password
        self.buffer = buffer
        self.socket = socket.create_connection((host, port))

    def get(self, path):
        obj = bytes(json.dumps(get_obj(self.username, self.password, "getData", path)), "utf-8")
        self.socket.send(obj)
        d = self.socket.recv(self.buffer).decode("utf-8")
        try:
            data = json.loads(d)
            return data
        except:
            return d

    def push(self, path, data, override = False):
        obj = bytes(json.dumps(get_obj(self.username, self.password, "push", path, data, override)), "utf-8")
        self.socket.send(obj)
        return self.socket.recv(self.buffer).decode("utf-8")

    def delete(self, path):
        obj = bytes(json.dumps(get_obj(self.username, self.password, "delete", path)), "utf-8")
        self.socket.send(obj)
        return self.socket.recv(self.buffer).decode("utf-8")

    def find(self, path, query):
        obj = bytes(json.dumps(get_obj(self.username, self.password, "find", path, query, False)), "utf-8")
        self.socket.send(obj);
        return self.socket.recv(self.buffer).decode("utf-8")

    def find_one(self, path, query):
        obj = bytes(json.dumps(get_obj(self.username, self.password, "find_one", path, query, False)), "utf-8")
        self.socket.send(obj);
        return self.socket.recv(self.buffer).decode("utf-8")

    def checkpath(self, path):
        if self.get(path) == "PATH_ERR":
            return False
        else:
            return True
