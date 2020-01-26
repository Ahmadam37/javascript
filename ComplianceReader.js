function printCounter(counter,current,label,textSuffix,textPrefix)
{
	setTimeout(function(){
	
							if(current <=counter){
	 
												writeHtml(current,label,textSuffix,textPrefix);
												current = current+1;
												setTimeout(printCounter(counter,current,label,textSuffix,textPrefix),100);
												}
												
												},100);
}

function writeHtml(current,label,textSuffix,textPrefix){

	document.getElementById(label).innerHTML = textPrefix + current.toString() + textSuffix ;
	
}