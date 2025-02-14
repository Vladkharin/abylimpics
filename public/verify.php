<?php

session_start();

$data = $_POST;


$db = new PDO('mysql:host=localhost;dbname=u2947730_default', 'u2947730_default', 'Gp7uwu9FY7LEpm4H');

$query = $db->query('SELECT * FROM users')->fetch();

// var_dump($data);
// var_dump(($query));


if ($query['username'] === $data['login'] && $query['password'] === $data['password']) {
    echo json_encode(['success' => True]);
} else {
    echo json_encode(['success' => False]);
}

