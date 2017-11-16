#include "tcp.hpp"
#include <iostream>

int main() {
    client c;
    c.conn("localhost", 3434);
    c.send_data("a a");
    std::cout << c.receive(1024) << '\n';
}