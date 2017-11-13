<?php
$username = "admin";
$password = "password";
$host = "127.0.0.1";
$port = 3434;


$path = "/";


$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
$sock = socket_connect($socket, $host, $port);
$obj->username = $username;
$obj->password = $password;
$obj->command = "getData";
$obj->path = $path;
$json = json_encode($obj);
socket_write($socket, $json, strlen($json));    
$out = socket_read($socket, 2048);
socket_close($socket);
echo $out;
echo "\n";
?>