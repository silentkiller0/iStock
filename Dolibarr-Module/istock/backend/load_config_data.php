<?php
// get licence key
$sql = "SELECT api_key FROM llx_user where login = 'istock' AND lastname = 'iStock' AND admin = 1";
$res = $db->query($sql);


if ($res->num_rows > 0) {
	$row = $db->fetch_array($sql);

	$ISTOCK_KEY = $row['api_key'];
}else{
	$ISTOCK_KEY = '';
}



// get the values from the db
$sql = "SELECT * FROM llx_istock_configuration where rowid = 1";
$res = $db->query($sql);

//print("<pre>".print_r($res,true)."</pre>");


if ($res->num_rows > 0) {
	$row = $db->fetch_array($sql);
	
	//print("<pre>".print_r($row,true)."</pre>");

	$ISTOCK_AUTO_CREATION = $row['auto_creation'];

}else{
	
	$ISTOCK_AUTO_CREATION = 'Nothing...';
}
?>