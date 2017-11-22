#include <iostream>

#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>

#include <netinet/tcp.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <netinet/in.h>
#include <netdb.h>

//define buffer size
#define BUFFER_SIZE 1024
//using a shortcut to std::string
typedef std::string string;

/*
Connect to socket
*/
int socket_connect_to(const char *host, in_port_t port){
	struct hostent *hp;
	struct sockaddr_in addr;
	int on = 1, sock;

	if((hp = gethostbyname(host)) == NULL){
		herror("gethostbyname");
		exit(1);
	}
	bcopy(hp->h_addr, &addr.sin_addr, hp->h_length);
	addr.sin_port = htons(port);
	addr.sin_family = AF_INET;
	sock = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);
	setsockopt(sock, IPPROTO_TCP, TCP_NODELAY, (const char *)&on, sizeof(int));

	if(sock == -1){
		perror("setsockopt");
		exit(1);
	}

	if(connect(sock, (struct sockaddr *)&addr, sizeof(struct sockaddr_in)) == -1){
		perror("connect");
		exit(1);

	}
	return sock;
}


/*
works that what it takes when you  choose json
you will need to escape strings in data
*/
string get_obj(string username, string password, string command, string path, string data, string override = "false")
{
  //create long json string hmm...
  string base = "{\"username\":\""; //delare base and add username base
  base += username; //add username
  base += "\",\"password\":\""; //password base
  base += password; //add password
  base += "\", \"command\":\""; //command base
  base += command; //add command
  base += "\", \"path\":\""; //path base
  base += path; //add path
  base += "\", \"data\":"; //data base
  base += data; //add data
  base += ",\"override\":"; //override base
  base += override; //add override
  base += "}"; //add ending charecter
  return base; //return base
};


string send_and_recv(int sock, string data)
{
  string out;
  char buffer[BUFFER_SIZE];
  write(sock, data.c_str(), strlen(data.c_str()));
  bzero(buffer, BUFFER_SIZE);
  read(sock, buffer, BUFFER_SIZE - 1);
  out = buffer;
  return out;
}
class Db {
    string username, password;
    int socket;
  public:
    Db(string host, int port, string user, string pass);
    string get(string path);
    string push(string path, string data, string override);
    string remove(string path);
    string find(string path, string query);
    string find_one(string path, string query);
    string use(string database);
};


Db::Db (string host, int port, string user, string pass){
  socket = socket_connect_to(host.c_str(), port);
  username = user;
  password = pass;
}

string Db::get(string path){
  string json1 = get_obj(username, password, "getData", path, "\"\"", "false");
  return send_and_recv(socket, json1);
};

string Db::remove(string path){
  string json2 = get_obj(username, password, "delete", path, "\"\"", "false");
  return send_and_recv(socket, json2);
};

string Db::find(string path, string query){
  string json3 = get_obj(username, password, "find", path, query, "false");
  return send_and_recv(socket, json3);
};

string Db::find_one(string path, string query){
  string json4 = get_obj(username, password, "find_one", path, query, "false");
  return send_and_recv(socket, json4);
};

string Db::use(string database){
  string json5 = get_obj(username, password, "use", "/", database, "false");
  return send_and_recv(socket, json5);
};


string Db::push(string path, string data, string override = "false"){
  string json6 = get_obj(username, password, "push", path, data, override);
  return send_and_recv(socket, json6);
};
