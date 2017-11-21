#include <iostream>
#include "db.hpp"

using namespace std;

int main(){
    Db database("localhost", 3434, "admin", "password");
    cout << database.getData("/") << endl;
    return 0;
}