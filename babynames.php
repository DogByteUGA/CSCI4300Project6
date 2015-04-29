<?php

$qType = isset($_GET['q']) ? $_GET['q'] : '';
/*
$qType = $_REQUEST['q'];

*/
//$qType = strtolower($qType);

 echo $qType;

if ($qType == "list"){
	$listFile = fopen("list.txt","r+") or die ("Unable to open file!");
	while(!feof($listFile)){
		echo fgets($listFile);
	}

fclose($listFile);

}
else{
	echo "fuck";
}

?>
