<?php

$qType = isset($_GET['type']) ? $_GET['type'] : '';
//$qType= isset($_GET['meaning']) ? $_GET['meaning'] : $qType;




//echo $meaningName;
/*
$qType = $_REQUEST['q'];

*/
//$qType = strtolower($qType);

//var_dump($qType);
echo $qType;
if ($qType == "list"){
	$listFile = fopen("list.txt","r+") or die ("Unable to open file!");
	while(!feof($listFile)){
		echo fgets($listFile);
	}

fclose($listFile);

}
else if ($qType == "meaning"){
	$listFile = fopen("meanings.txt","r+") or die ("Unable to open file!");
	$lineArray;
	$meaningName = $qType['name'];
	var_dump($meaningName);
	while(!feof($listFile)){ // this should be while the name isnt found
		$lineArray = fgets($listFile);
		echo $lineArray;
		$wordArray = explode(' ',$lineArray,0);
		if($wordArray[0] == $meaningName){
			echo $lineArray;
			break;

		}
	}


fclose($listFile);

}
else{
	echo "ugh";
}


?>
