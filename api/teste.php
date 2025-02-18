<?php

var_dump(
    pg_connect("
        host=localhost
        port=5432
        dbname=copiati
        user=postgres
        password=3642"
    )
);
?>