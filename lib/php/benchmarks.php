<?php
include "db.php";

$database = new db("localhost", 3434, "admin", "password");

function tests($db){
    for ($i=0; $i < 1000; $i++) { 
        $path = "/".$i;
        echo $db->push($path, "data")."\n";
        echo $db->get($path, "data")."\n";
        echo $db->delete($path)."\n";
    }
}
$start_time = microtime(TRUE);
tests($database);
$end_time = microtime(TRUE);
/*
- 2.5969429016113
- 3.0023081302643
- 3.6546838283539
- 3.2196941375732
- 3.3984389305115
- 3.178200006485
- 3.2584710121155
*/
echo $end_time - $start_time."\n";
?>
