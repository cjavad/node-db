require 'benchmark'
require_relative "db"

dab = DB.new "localhost", 3434, "admin", "password"

def puts(string)
    #do not output to console
    #just take performance
end

def test(db)
    for i in (0..1000).to_a do
        path = "/" + i.to_s
        puts db.push(path, "HELLO WORLD")
        puts db.get(path)
        puts db.delete(path)
    end
end


def no(db)
    for i in (0..1000).to_a do
        path = "/" + i.to_s
        db.push(path, "HELLO WORLD")
        db.get(path)
        db.delete(path)
    end
end

def re(db)
    for i in (0..1000).to_a do
        path = "/" + i.to_s
        db.push(path, "HELLO WORLD")
        puts db.get(path)
        db.delete(path)
    end
end

n = 50000
Benchmark.bm(1) do |x|
  x.report("write/read/gets with puts:")   { test(dab) }
  x.report("write/read/gets with no puts:") { no(dab) }
  x.report("write/read/gets with puts on DB.get:") { re(dab) }
end

=begin
with puts
=end