<?php

$qType = isset($_GET['type']) ? htmlspecialchars($_GET['type']) : '';
$meaningName = isset($_GET['name']) ? htmlspecialchars($_GET['name']) : '';
$meaningName = strtoupper($meaningName);

if ($qType == "list"){
	$listFile = fopen("list.txt","r+") or die ("Unable to open file!");
	while(!feof($listFile)){
		echo fgets($listFile);
	}

fclose($listFile);

}
else if ($qType == "meaning"){
	
	    //$listFile = fopen("meanings.txt","r+") or die ("Unable to open file!");
		$lineArray = file("meanings.txt",FILE_IGNORE_NEW_LINES);
		$go = TRUE;
		//$wordArray[0] = strtolower($wordArray[0]);
		$wordArray;

		$i = 0;
		while($go == TRUE){
			$wordArray = explode(" ",$lineArray[$i]);
			$wordArray[0] = strtoupper($wordArray[0]);
			//echo $wordArray[0];
			if($wordArray[0] == $meaningName){
				echo $lineArray[$i];
				$go = FALSE;
			}
			$i++;

			//echo $wordArray[0];

			 //echo "<div><p>The name <strong> $meaningName </strong> means...</p><hr/><p><q>Welsh, English From the Old Welsh masculine name Morcant, which was
        //possibly derived from Welsh more sea bla bla.</q></p></div>";
			//echo $wordArray[0];

			
	     }
	     //fclose($listFile);




}
else{
	echo "ugh";
}


?>
