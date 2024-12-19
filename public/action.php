<?php


$data = $_POST['data'];


unlink('./data/data.json');

file_put_contents('./data/data.json', $data);


echo json_encode(['success' => true]);
?>