import requests
import json

def get_obj(username, password, command, path, data = None, override = None):
    if not command in ["push", "getData", "delete"]:
        return False
    elif data and override != None:
        return {"username":username,"password":password,"command":command,"path":path,"data":data,"override":override}
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

    def push(self, path, data, override = True):
        obj = get_obj(self.username, self.password, "push", path, data, override)
        url = "http://" + self.host + ":" + str(self.port) + "/db?body=" + json.dumps(obj)
        return requests.get(url)

    def delete(self, path):
        obj = get_obj(self.username, self.password, "delete", path)
        url = "http://" + self.host + ":" + str(self.port) + "/db?body=" + json.dumps(obj)
        return requests.get(url)

    def checkpath(self, path):
        if self.get(path).text == "Path does not exist":
            return False
        else:
            return True