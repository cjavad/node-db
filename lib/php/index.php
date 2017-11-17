<?php
//Empty password objects
$GLOBALS["user"] = "";
$GLOBALS["pass"] = "";

function get_obj($command, $path, $data = NULL, $override = NULL){
    $username = $GLOBALS["user"];
    $password = $GLOBALS["pass"];
    if($data == NULL && $override == NULL){
        $obj = new stdClass();
        $obj->username = $username;
        $obj->password = $password;
        $obj->command = $command;
        $obj->path = $path;
        return $obj;
    } else {
        $obj = new stdClass();
        $obj->username = $username;
        $obj->password = $password;
        $obj->command = $command;
        $obj->path = $path;
        $obj->data = $data;
        $obj->override = $override;
        return $obj;
    }
    echo "ERROR";
}

function init($host, $port, $username, $password){
    $GLOBALS["user"] = $username;
    $GLOBALS["pass"] = $password;
    $socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
    socket_connect($socket, $host, $port);
    return $socket;
}

function get($socket,$path) {
    $json = json_encode(get_obj("getData", $path));
    socket_write($socket, $json, strlen($json));
    return socket_read($socket, 2048);
}

function delete($socket,$path) {
    $json = json_encode(get_obj("delete", $path));
    socket_write($socket, $json, strlen($json));
    return socket_read($socket, 2048);
}

function push($socket, $path, $data, $override){
    $json = json_encode(get_obj("push", $path, $data, $override));
    socket_write($socket, $json, strlen($json));
    return socket_read($socket, 2048);
}

function find($socket, $path, $query){
    $json = json_encode(get_obj("find", $path, json_encode($query), FALSE));
    socket_write($socket, $json, strlen($json));
    return socket_read($socket, 2048);
}

function find_one($socket, $path, $query){
    $json = json_encode(get_obj("find_one", $path, json_encode($query), FALSE));
    socket_write($socket, $json, strlen($json));
    return socket_read($socket, 2048);
}

?>
