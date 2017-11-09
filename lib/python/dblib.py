import requests
import json

def get_obj(username, password, command, path, data = None, overide = None):
    if not command in ["push", "getData", "delete"]:
        return False
    elif data and overide != None:
        return {"username":username,"password":password,"command":command,"path":path,"data":data,"overide":overide}
    else:
        return {"username":username,"password":password,"command":command,"path":path}



class database:
    def __init__(self, host, port,username, password):
        self.host = host
        self.port = port
        self.username = username
        self.password = password

    def get(self, path):
        obj = get_obj(self.username, self.password, "getData", path)
        url = "http://" + self.host + ":" + str(self.port) + "/db?body=" + json.dumps(obj)
        return requests.get(url)

    def push(self, path, data, overide = True):
        obj = get_obj(self.username, self.password, "push", path, data, overide)
        url = "http://" + self.host + ":" + str(self.port) + "/db?body=" + json.dumps(obj)
        return requests.get(url)

    def delete(self, path):
        obj = get_obj(self.username, self.password, "delete", path)
        url = "http://" + self.host + ":" + str(self.port) + "/db?body=" + json.dumps(obj)
        return requests.get(url)

