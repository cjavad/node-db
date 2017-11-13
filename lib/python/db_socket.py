import socket
import json

def get_obj(username, password, command, path, data = None, override = None):
    if not command in ["push", "getData", "delete", "find"]:
        return False
    elif data and override != None:
        return {"username":username,"password":password,"command":command,"path":path,"data":data,"override":override}
    else:
        return {"username":username,"password":password,"command":command,"path":path}

class database:
    def __init__(self, host, port, username, password):
        self.username = username
        self.password = password
        self.socket = socket.create_connection((host, port))
    
    def get(self, path):
        obj = bytes(json.dumps(get_obj(self.username, self.password, "getData", path)), "utf-8")
        self.socket.send(obj)
        d = self.socket.recv(1024).decode("utf-8")
        try:
            data = json.loads(d)
            return data
        except:
            return d

    def find(self, path, query):
        obj = bytes(json.dumps(get_obj(self.username, self.password, "find", path, query, False)), "utf-8")
        self.socket.send(obj)
        return self.socket.recv(1024).decode("utf-8")

    def push(self, path, data, override = False):
        obj = bytes(json.dumps(get_obj(self.username, self.password, "push", path, data, override)), "utf-8")
        self.socket.send(obj)
        return self.socket.recv(1024).decode("utf-8")

    def delete(self, path):
        obj = bytes(json.dumps(get_obj(self.username, self.password, "delete", path)), "utf-8")
        self.socket.send(obj)
        return self.socket.recv(1024).decode("utf-8")

    def checkpath(self, path):
        if self.get(path) == "Path does not exist":
            return False
        else:
            return True