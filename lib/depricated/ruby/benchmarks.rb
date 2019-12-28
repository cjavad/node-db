require 'benchmark'
require_relative "db"

dab = DB.new "localhost", 3434, "admin", "password"

#print out everything
def test(db)
    for i in (0..1000).to_a do
        path = "/" + i.to_s
        puts db.push(path, "HELLO WORLD")
        puts db.get(path)
        puts db.delete(path)
    end
end

#dont print
def no(db)
    for i in (0..1000).to_a do
        path = "/" + i.to_s
        db.push(path, "HELLO WORLD")
        db.get(path)
        db.delete(path)
    end
end

#only print db.get
def re(db)
    for i in (0..1000).to_a do
        path = "/" + i.to_s
        db.push(path, "HELLO WORLD")
        puts db.get(path)
        db.delete(path)
    end
end


a = Benchmark.measure { test(dab) } # ("write/read/gets with puts:")   
b = Benchmark.measure { no(dab) } # ("write/read/gets with no puts:")
c = Benchmark.measure { re(dab) } # ("write/read/gets with puts on DB.get:") 

f = File.new("bench.txt", "a")
f.write("write/read/gets with puts:")
f.write(a)
f.write("write/read/gets with no puts:")
f.write(b)
f.write("write/read/gets with puts on DB.get:")
f.write(c)
f.close()


=begin
with puts
=end