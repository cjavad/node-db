#include "db.hpp"
#include <iostream>
#include <stdio.h>



int main(){
  Db database("localhost", 3434, "admin", "password");
  std::cout << database.get("/") << std::endl;
  std::cout << database.push("/hej", "\"Goddag\"") << std::endl;
  std::cout << database.get("/hej") << std::endl;
  std::cout << database.get("/") << std::endl;
}

/*
#define BUFFER_SIZE 1024

int main() {
  char buffer[BUFFER_SIZE];
  std::string data = "{\"username\":\"admin\", \"password\":\"password\", \"command\":\"getData\", \"path\":\"/\"}";
  std::string out;
  int sock = socket_connect("localhost", 3434);
  write(sock, data.c_str(), strlen(data.c_str()));
  bzero(buffer, BUFFER_SIZE);
  while(read(sock, buffer, BUFFER_SIZE - 1) != 0){
    out += buffer;
		bzero(buffer, BUFFER_SIZE);
	}
  printf("%s\n", out.c_str());
}
*/
