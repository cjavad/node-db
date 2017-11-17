import requests
from __init__ import get_obj

#Legacy support
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
        obj = get_obj(self.username, self.password, "find", path, data, False)
        url = "http://" + self.host + ":" + str(self.port) + "/db?body=" + json.dumps(obj)
        return self.req(url)

    def find_one(self, path, query):
        obj = get_obj(self.username, self.password, "find_one", path, data, False)
        url = "http://" + self.host + ":" + str(self.port) + "/db?body=" + json.dumps(obj)
        return self.req(url)

    def delete(self, path):
        obj = get_obj(self.username, self.password, "delete", path)
        url = "http://" + self.host + ":" + str(self.port) + "/db?body=" + json.dumps(obj)
        return self.req(url)

    def checkpath(self, path):
        if self.get(path) == "PATH_ERR":
            return False
        else:
            return True
