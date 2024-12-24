<?php

session_start();

$data = $_POST;


$db = new PDO('mysql:host=localhost;dbname=abilimpics', 'root', 'root');

$query = $db->query('SELECT * FROM users')->fetch();

var_dump($data);


if ($query[1] == $data['login'] && $query[2] == $data['password']) {
    return json_encode(['success' => true]);
} else {
    return json_encode(['success' => false]);
}

