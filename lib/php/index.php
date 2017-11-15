<?php
function get_obj($username, $password, $command, $path, $data = FALSE, $override = FALSE){
    if($data == FALSE && $override == FALSE){
        $obj->username = $username;
        $obj->password = $password;
        $obj->command = $command;
        $obj->path = $path;
        return $obj;
    } elseif ($data != FALSE && $override != FALSE) {
        $obj->username = $username;
        $obj->password = $password;
        $obj->command = $command;
        $obj->path = $path;
        $obj->data = $data;
        $obj->override = $override;
        return $obj;
    }
}


class db {
    public function __contruct($host, $port, $username, $password){
        $this->self["username"] = $username;
        $this->self["password"] = $password;
        $this->self["socket"] = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
        socket_connect($this->self["socket"], $host, $port);
    }
    public function get($path) {
        $json = json_encode(get_obj($this->self["username"], $this->self["password"], "getData", $path));
        socket_write($this->self["socket"], $json, strlen($json));
        $out = socket_read($this->self["socket"], 2048);
        return $out;
    }
}

$db = new db("localhost", 3434, "admin", "password");
echo $db->get("/");

?>