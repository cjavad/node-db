import json
import socket
import time # not really nessesary if not using timeout function

# set timeout till -1 to disable timeout on receive 
def receive(sockd, buffer = 4096, timeout = 2):
    # make sure a timeout is required
    if timeout < 0:
        return sockd.recv(buffer).decode("utf-8") # single line of code needed to make it work in theory
    
    # make socket non blocking
    sockd.setblocking(0)

    # total data partwise in an array
    total_data = []
    data = ''

    # beginning time
    begin = time.time()
    while True:
        # if you got some data, then break after timeout
        if total_data and time.time()-begin > timeout:
            break

        # if you got no data at all, wait a little longer, twice the timeout
        elif time.time()-begin > timeout * 2:
            break

        # receive some data from db
        try:
            data = sockd.recv(buffer)
            if data:
                total_data.append(data.decode("utf-8")) # decoding by default.
                # change the beginning time for measurement
                begin = time.time()
            else:
                # sleep for sometime to indicate a gap
                time.sleep(0.1 if timeout > 0.1 else timeout) # just making sure that the gap is smaller than timeout
        except:
            pass

    # join all parts to make final string
    return ''.join(total_data)

class db:
    def __init__(self, host, port, username, password, buffer=1024, timeout = -1): # timeout disabled by default
        self.buffer = buffer
        self.timeout = timeout
        self.socket = socket.create_connection((host, port))
        self.socket.send(bytes(json.dumps({"command": "login", "username": username, "password": password}), "utf-8"))

    def get(self, path):
        obj = bytes(json.dumps({"command": "getData", "path": path}), "utf-8")
        self.socket.send(obj)
        d = receive(self.socket, self.buffer, self.timeout)
        try:
            data = json.loads(d)
            return data
        except:
            return d

    def push(self, path, data, override=False):
        obj = bytes(json.dumps(
            {"command": "push", "path": path, "data": data, "last": override}), "utf-8")
        self.socket.send(obj)
        return receive(self.socket, self.buffer, self.timeout)

    def delete(self, path):
        obj = bytes(json.dumps({"command": "delete", "path": path}), "utf-8")
        self.socket.send(obj)
        return receive(self.socket, self.buffer, self.timeout)

    def find(self, path, query):
        obj = bytes(json.dumps(
            {"command": "find", "path": path, "data": query}), "utf-8")
        self.socket.send(obj)
        return receive(self.socket, self.buffer, self.timeout)

    def find_one(self, path, query):
        obj = bytes(json.dumps(
            {"command": "find", "path": path, "data": query}), "utf-8")
        self.socket.send(obj)
        return receive(self.socket, self.buffer, self.timeout)

    def use(self, database, override=False):
        obj = bytes(json.dumps({"command": "use", "data": database, "last":override}))
        self.socket.send(obj)
        return receive(self.socket, self.buffer, self.timeout)
