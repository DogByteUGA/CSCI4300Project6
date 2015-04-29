<?php
//get the type of query
$qType = isset($_GET['type']) ? htmlspecialchars($_GET['type']) : '';
$meaningName = isset($_GET['name']) ? htmlspecialchars($_GET['name']) : '';
$meaningName = strtoupper($meaningName); // the name we are searching for
//get all names for dropdown for list
if ($qType == "list"){
	$listFile = fopen("list.txt","r+") or die ("Unable to open file!");
	while(!feof($listFile)){
		echo fgets($listFile);
	}

fclose($listFile);

}
//match the name in meanings.txt file
else if ($qType == "meaning"){
		//line array holds a line of the file at every index
		$lineArray = file("meanings.txt",FILE_IGNORE_NEW_LINES);
		$go = TRUE;
		$wordArray;
		$i = 0;
		//while we haven't found the name
		//IF GO IS NEVER SET TO FALSE, THEN ECHO THAT THERE IS NO MEANINGFUL DATA
		while($go == TRUE){
			//get each word of the line and check if the names match
			$wordArray = explode(" ",htmlspecialchars($lineArray[$i]));
			$wordArray[0] = strtoupper($wordArray[0]);
			$len = strlen($wordArray[0]);
			//if the names match, parse the name out of the string and return as instructed
			if($wordArray[0] == $meaningName){
				$lineArray[$i] = substr($lineArray[$i],$len);
				//echo $lineArray[$i];
				echo "<div><p>The name <strong> $meaningName </strong> means...</p><hr/><p><q> $lineArray[$i] </q></p></div>";


				$go = FALSE;
			}
			$i++;
			
	     }

}
else{
	echo "ugh";
}


?>
