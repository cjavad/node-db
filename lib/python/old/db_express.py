import requests
import json


def get_obj(username, password, command, path, data = None, override = None):
    if not command in ["push", "getData", "delete", "find"]:
        return False
    elif data and override != None:
        return {"username":username,"password":password,"command":command,"path":path,"data":data,"override":override}
    else:
        return {"username":username,"password":password,"command":command,"path":path}


class db_express:
    def __init__(self, host, port,username, password):
        self.host = host
        self.port = port
        self.username = username
        self.password = password
        true = True
        false = False
        check = self.req("http://" + host + ":"+ str(port) + "/cp?user="+username + "&pass="+password)
        print(check)
    
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