<?php

$array = json_decode($_GET["a"]);

file_put_contents("out.j", $array);

?>