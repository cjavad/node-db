#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h> 

void error(const char *msg)
{
    perror(msg);
    exit(0);
}

int connect_sock(char host[12], int portno) {
    int sockfd, n;
    struct sockaddr_in serv_addr;
    struct hostent *server;

    sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if (sockfd < 0) 
        error("ERROR opening socket");
    server = gethostbyname(host);
    if (server == NULL) {
        fprintf(stderr,"ERROR, no such host\n");
        exit(0);
    }
    bzero((char *) &serv_addr, sizeof(serv_addr));
    serv_addr.sin_family = AF_INET;
    bcopy((char *)server->h_addr, 
         (char *)&serv_addr.sin_addr.s_addr,
         server->h_length);
    serv_addr.sin_port = htons(portno);
    if (connect(sockfd,(struct sockaddr *) &serv_addr,sizeof(serv_addr)) < 0) 
        error("ERROR connecting");
    
    return sockfd;
}

int send_mes(int sock, char buffer[1024]){
    int n;
    n = write(sock,buffer,strlen(buffer));
    if (n < 0) 
         error("ERROR writing to socket");

    n = read(sock,buffer,255);
         if (n < 0) 
              error("ERROR reading from socket");
         printf("%s\n",buffer);
         close(sock);
         return 0;
}


int main(int argc, char *argv[])
{
    int portno, sockfd;
    if (argc < 3) {
       fprintf(stderr,"usage %s hostname port\n", argv[0]);
       exit(0);
    }
    portno = atoi(argv[2]);
    
    sockfd = connect_sock("localhost", portno);
    send_mes(sockfd, "{\"username\":\"admin\", \"password\":\"password\",\"command\":\"getData\", \"path\":\"/\"}");
    return 0;
}