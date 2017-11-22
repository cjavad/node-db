#include <iostream>
#include "db.hpp"

using namespace std;

void single_tests(Db dba){
    for (size_t i = 0; i < 1000; i++)
    {
        std::string path = "/" + std::to_string(i);
        std::cout << dba.push(path, "\"RANDOM DATAT\"", "false") << std::endl;
        std::cout << dba.get(path) << std::endl;
        std::cout << dba.remove(path) << std::endl;
    }
}


int main(){
    Db database("localhost", 3434, "admin", "password");
    single_tests(database);
    return 0;
}

/* 1000 write/read/delete with time ./bench
real    0m2.861s
user    0m0.062s
sys     0m0.101s
*/

/* 10000 write/read/delete with time ./bencht
real    0m2.732s
user    0m0.060s
sys     0m0.099s
*/