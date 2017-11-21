<?php
include "db.php";

$database = new db("localhost", 3434, "admin", "password");

echo $database->get("/")."\n";
echo $database->push("/path", "data")."\n";
echo $database->get("/path")."\n";
?>
