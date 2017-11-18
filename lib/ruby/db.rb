require "socket"
require "json"


def get_obj(username, password, command, path, data = false, override = false)
    if data == false
        return JSON.generate({username:username, password:password, command:command, path:path})
    else
        return JSON.generate({username:username, password:password, command:command, path:path, data:data, override:override})
    end
end

class DB
    def initialize(host, port, username, password, buffer = 2048)
        @username = username
        @password = password
        @buffer = buffer
        @socket = TCPSocket.new host, port
    end

    def get(path)
        obj = get_obj @username, @password, "getData", path
        @socket.send obj, 0
        return JSON.parse(@socket.recv(@buffer))
    end

    def delete(path)
        obj = get_obj @username, @password, "delete", path
        @socket.send obj, 0
        return @socket.recv(@buffer).to_s
    end

    def push(path, data, override = false)
        obj = get_obj @username, @password, "push", path, data, override
        @socket.send obj, 0
        return @socket.recv(@buffer).to_s
    end

    def find(path, query)
        obj = get_obj @username, @password, "find", path, query, false
        @socket.send obj, 0
        return JSON.parse(@socket.recv(@buffer))
    end

    def find_one(path, query)
        obj = get_obj @username, @password, "find_one", path, query, false
        @socket.send obj, 0
        return JSON.parse(@socket.recv(@buffer))
    end
    
    def use(database)
        obj = get_obj @username, @password, "use", false, database, false
        @socket.send obj, 0
        return JSON.parse(@socket.recv(@buffer))
    end
end

#tests
'''
d = DB.new "localhost", 3434, "admin", "password"
puts d.get("/")
puts d.delete("/path")
puts d.get("/")
puts d.push("/path/with/data", "Hello WOrld")
puts d.get("/path")
'''
