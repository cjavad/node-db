#include <stdio.h>
#include "header.h"

#define BUFFER_SIZE 1024

int main(int argc, char *argv[]){
	int fd;
  char data[] = "{\"username\":\"admin\", \"password\":\"password\", \"command\":\"getData\", \"path\":\"/\"}";
	char buffer[BUFFER_SIZE];

	if(argc < 3){
		fprintf(stderr, "Usage: %s <hostname> <port>\n", argv[0]);
		exit(1);
	}

  printf("1 \n");
	fd = socket_connect(argv[1], atoi(argv[2]));
  printf("2 \n");

	write(fd, data, strlen(data)); // write(fd, char[]*, len);
	bzero(buffer, BUFFER_SIZE);

	while(read(fd, buffer, BUFFER_SIZE - 1) != 0){
		fprintf(stderr, "%s", buffer);
		bzero(buffer, BUFFER_SIZE);
	}

	shutdown(fd, SHUT_RDWR);
	close(fd);

	return 0;
}
