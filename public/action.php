<?php


// header('Content-Type: text/plain; charset=UTF-8');

$data = $_POST['data'];

$files = $_FILES;

if (count($files) != 0) {
    for ($i = 0; $i < count($files); $i++) {
        $array = $files['file' . $i];


        $uploaddir = './assets/docs/';
        $uploadfile = $uploaddir . basename($array['name']);

        move_uploaded_file($array['tmp_name'], $uploadfile);
    }
}

unlink('./data/data.json');

file_put_contents('./data/data.json', $data);

echo json_encode(['success' => true]);
?>