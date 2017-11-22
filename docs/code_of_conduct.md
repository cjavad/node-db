***code of conduct - database - design***
-----------------------------------

 - Simple access over Complex (Yes you mongodb)
    * no complex nosql querys like ```"db.path.to.something.randomcommand({wierdjson:true})"```
 - Secure but easy (You Sql) PS: trying to avoid the sql injection problem
    * id injection fx: id is 23/ksle and code says ``` path = "/users/" + id ``` then path = /users/23/ksle
 
 - Fast but beutiful (Cassandre)
    * speed is a must

So all in all,  we are here to make and great product for hobbists who doesn't have time
for the setup process and need some good and understandble errors.