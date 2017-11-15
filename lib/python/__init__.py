import requests
import json
import socket

def get_obj(username, password, command, path, data = None, override = None):
    if not command in ["push", "getData", "delete", "find"]:
        return False
    elif data and override != None:
        return {"username":username,"password":password,"command":command,"path":path,"data":data,"override":override}
    else:
        return {"username":username,"password":password,"command":command,"path":path}


class db_socket:
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

    def find(self, path, query):
        obj = bytes(json.dumps(get_obj(self.username, self.password, "find", path, query, False)), "utf-8")
        self.socket.send(obj)
        return self.socket.recv(self.buffer).decode("utf-8")

    def push(self, path, data, override = False):
        obj = bytes(json.dumps(get_obj(self.username, self.password, "push", path, data, override)), "utf-8")
        self.socket.send(obj)
        return self.socket.recv(self.buffer).decode("utf-8")

    def delete(self, path):
        obj = bytes(json.dumps(get_obj(self.username, self.password, "delete", path)), "utf-8")
        self.socket.send(obj)
        return self.socket.recv(self.buffer).decode("utf-8")

    def checkpath(self, path):
        if self.get(path) == "PATH_ERR":
            return False
        else:
            return True

class db_express:
    def __init__(self, host, port,username, password):
        self.host = host
        self.port = port
        self.username = username
        self.password = password
    
    def req(self, url):
        return requests.get(url).text


    def get(self, path):
        obj = get_obj(self.username, self.password, "getData", path)
        url = "http://" + self.host + ":" + str(self.port) + "/db?body=" + json.dumps(obj)
        return self.req(url)

    def push(self, path, data, override = True):
        obj = get_obj(self.username, self.password, "push", path, data, override)
        url = "http://" + self.host + ":" + str(self.port) + "/db?body=" + json.dumps(obj)
        return self.req(url)

    def find(self, path, query):
        obj = get_obj(self.username, self.password, "find", path, query, False)
        url = "http://" + self.host + ":" + str(self.port) + "/db?body=" + json.dumps(obj)
        return self.req(url)

    def delete(self, path):
        obj = get_obj(self.username, self.password, "delete", path)
        url = "http://" + self.host + ":" + str(self.port) + "/db?body=" + json.dumps(obj)
        return self.req(url)

    def checkpath(self, path):
        if self.get(path) == "Path does not exist":
            return False
        else:
            return True