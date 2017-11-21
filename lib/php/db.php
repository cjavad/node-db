<?php
//database class
class db {
    public function __construct($host, $port, $username, $password){
        $this->user = $username;
        $this->pass = $password;
        $this->socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
        socket_connect($this->socket, $host, $port);
    }
    private function get_obj($command, $path, $data = NULL, $override = FALSE){
        $username = $this->user;
        $password = $this->pass;
        if($data == NULL && $override == FALSE){
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

    public function get($path) {
        $json = json_encode($this->get_obj("getData", $path));
        socket_write($this->socket, $json, strlen($json));
        return socket_read($this->socket, 2048);
    }

    public function delete($path) {
        $json = json_encode($this->get_obj("delete", $path));
        socket_write($this->socket, $json, strlen($json));
        return socket_read($this->socket, 2048);
    }

    public function push($path, $data, $override = FALSE){
        $json = json_encode($this->get_obj("push", $path, $data, $override));
        socket_write($this->socket, $json, strlen($json));
        return socket_read($this->socket, 2048);
    }

    public function find($path, $query){
        $json = json_encode($this->get_obj("find", $path, json_encode($query), FALSE));
        socket_write($this->socket, $json, strlen($json));
        return socket_read($this->socket, 2048);
    }

    public function find_one( $path, $query){
        $json = json_encode($this->get_obj("find_one", $path, json_encode($query), FALSE));
        socket_write($this->socket, $json, strlen($json));
        return socket_read($this->socket, 2048);
    }
}
?>
