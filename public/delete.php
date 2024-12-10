<?

$A = $_POST['a'];
$B = $_POST['b'];

$C = json_encode($A . $B);
echo $C;
exit();

