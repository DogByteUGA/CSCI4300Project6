<?php
//get the type of query
$qType = isset($_GET['type']) ? htmlspecialchars($_GET['type']) : '';
$meaningName = isset($_GET['name']) ? htmlspecialchars($_GET['name']) : '';
$meaningName = strtoupper($meaningName); // the name we are searching for
$gender = isset($_GET['gender']) ? htmlspecialchars($_GET['gender']) : '';
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
		//Just get size of the linearray and check against that
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
else if ($qType == "rank"){
		//line array holds a line of the file at every index
		$lineArray = file("rank.txt",FILE_IGNORE_NEW_LINES);
		$go = TRUE;
		$wordArray;
		$i = 0;
		$j = 0;
		//while we haven't found the name
		//IF GO IS NEVER SET TO FALSE, THEN ECHO THAT THERE IS NO MEANINGFUL DATA
		//Just get size of the linearray and check against that

		while($go == TRUE){
			//get each word of the line and check if the names match
			$wordArray = explode(" ",htmlspecialchars($lineArray[$i]));
			$wordArray[0] = strtoupper($wordArray[0]);
			//$len = strlen($lineArray[$i]);
			$len = count($wordArray);

			$year = ["1900","1900","1900","1910","1920","1930","1940","1950","1960","1970","1980","1990","2000","2010","2020","2030"];
			//if the names match, parse the name out of the string and return as instructed
			if($wordArray[0] == $meaningName &  $wordArray[1] == $gender){
				//echo $lineArray[$i];
				echo "<baby name= \"$meaningName\" gender=\"$gender\">";
				  for($j = 2; $j < $len; $j++){

				  	echo "<rank year=\"$year[$j]\">$wordArray[$j]</rank>";
				  }
				  echo "</baby>";

				$go = FALSE;
			}
			$i++;
			
	     }

}
else{
	echo "ugh";
}


?>
