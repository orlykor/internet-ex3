
///////////////////////////////////////////////////////
///////////******The first page********///////////////

var h1 = document.createElement("H1")                
h1.innerHTML = "Welcome"
document.body.appendChild(h1);

var divLogIn = document.createElement("FORM");
divLogIn.setAttribute('id', 'login');
divLogIn.innerHTML = "Please log on to continue.";
document.body.appendChild(divLogIn);

var pUserName = document.createElement("P");
pUserName.setAttribute("pUserName", 'p');
pUserName.innerHTML = "Username: ";
divLogIn.appendChild(pUserName);

var inputUserName = document.createElement("INPUT");
inputUserName.setAttribute('type', 'name');
inputUserName.setAttribute('placeholder', 'username');
inputUserName.setAttribute('class', 'input');
inputUserName.setAttribute("value", "");
pUserName.appendChild(inputUserName);

var pPassword = document.createElement("P");
pPassword.innerHTML = "Password: ";
divLogIn.appendChild(pPassword);

var inputPassword = document.createElement("INPUT");
inputPassword.setAttribute('type', 'Password');
inputPassword.setAttribute('placeholder', 'Password');
inputPassword.setAttribute('class', 'input');
inputPassword.setAttribute("value", "");
pPassword.appendChild(inputPassword);

var btnLogOn = document.createElement("INPUT");        
btnLogOn.setAttribute('type', 'button');
btnLogOn.setAttribute("value", "Log On");
btnLogOn.id = "button";
btnLogOn.className = "submit";
divLogIn.appendChild(btnLogOn);
document.getElementById("button").addEventListener("click", validateForm);

///////////////////////////////////////////////////////
//////////******The profile page********//////////////

var divProfile = document.createElement("DIV");
divProfile.setAttribute('id', "profile");
document.body.appendChild(divProfile);

var p1 = document.createElement("P");
p1.innerHTML="Hi, my name is Orly Koren."
p1.setAttribute("id", "p1");
divProfile.appendChild(p1);

var pIntr1 = document.createElement("P");
pIntr1.innerHTML = "let me tell you a few things about myself:";
divProfile.appendChild(pIntr1);

var pIntr2 = document.createElement("P");
pIntr2.innerHTML = "I really like go running in my free time, its the best way to clear my head from all the thoughts.";
divProfile.appendChild(pIntr2);

var pIntr3 = document.createElement("P");
pIntr3.innerHTML = "I also enjoy solving pazzles, but I don't do it as often as i'd liked to.";
divProfile.appendChild(pIntr3);

var pFunny = document.createElement("P");
pFunny.innerHTML = "A funny qoute:";
divProfile.appendChild(pFunny);

var qoute = document.createElement("P");
qoute.setAttribute("id", "qoute");
qoute.innerHTML = "Old people at weddings always poke me and say - your'e next. So, I started doing the same thing to them at funerals.";
pFunny.appendChild(qoute);


var img = document.createElement("IMG");
img.setAttribute("id", "img");
img.setAttribute("src", "img1.jpg");
img.setAttribute("alt", "me scubadiving in Mexico");
divProfile.appendChild(img);
img.addEventListener("mouseover", displayImage2);
img.addEventListener("mouseout", displayImage1);


var LogOutBtn = document.createElement("INPUT");        
LogOutBtn.setAttribute('type', 'button');
LogOutBtn.setAttribute("value", "Log Out");
LogOutBtn.id = "logOutBtn";
divProfile.appendChild(LogOutBtn);
document.getElementById("logOutBtn").addEventListener("click", goToLogIn);


var CalcBtn = document.createElement("INPUT");       
CalcBtn.setAttribute('type', 'button');
CalcBtn.setAttribute("value", "Calculator");
CalcBtn.id = "CalcBtn";
divProfile.appendChild(CalcBtn);
document.getElementById("CalcBtn").addEventListener("click", goToCalc);


function displayImage1()
{
	img.src = "img1.jpg";
}

function displayImage2()
{
	img.src = "mexico.jpg";
}


///////////////////////////////////////////////////////
//////////******The calculator page********//////////////
var curr;
var memory;
var iMem = 0;
var numOfEqual = 0;
var cellNum;
var counter;
var scrnelem;
var scrnval;
var res;
var counterClac = 1;

//the div of the calculator
var divCalc = document.createElement("DIV");
divCalc.setAttribute('id', "calculator");
document.body.appendChild(divCalc);


//create the table of the calculator
function Calc(num)
{
	//the form of the table
    var form = document.createElement("FORM");
    form.setAttribute('id','box'+num);
    form.className = "box";
    form.setAttribute("name", "Calculator");
    divCalc.appendChild(form);

    // create elements <table> and a <tbody>
    var tbl = document.createElement("TABLE");
    tbl.setAttribute('id','table'+num);
    tbl.className = "table";
    form.appendChild(tbl);

    var tblBody = document.createElement("TBODY");
    tblBody.setAttribute('id','tblBody'+num);
    tbl.appendChild(tblBody);

    // heading creation
    var heading = document.createElement("CAPTION");
    heading.setAttribute('id', 'heading'+num);
    var thead = createHeader(num);
    heading.appendChild(thead);
    tbl.appendChild(heading);

    cellNum = 13;
    counter = 0;       
    for (var j = 0; j <= 3; j++) 
    {
        // table row creation
        var row = document.createElement("tr");
    	tblBody.appendChild(row);
        cellNum = cellNum-6;

        for (var i = 0; i < 4; i++) 
        {
        	//table cell creation
        	var cell = document.createElement("td");  
        	row.appendChild(cell);

         	if(j == 3)
         	{
         		if(i > 0)
         		{
         			switch(counter)
         			{
         				case 3:
							var plus = document.createElement("input");
							plus.setAttribute('type', "button");
							plus.setAttribute("value", "+");
							plus.setAttribute( 'id', 'plus'+num) ;
							plus.className = "numbers"; 
         					cell.appendChild(plus);
							document.getElementById('plus'+num).addEventListener("click", function(){addDigit("+",num)});

							break;
						case 4:
							var equal = document.createElement("input");
							equal.setAttribute('type', "button");
							equal.setAttribute("value",  "=");
							equal.id = "equal"+num;
							equal.className = "numbers"; 
         					cell.appendChild(equal);
							document.getElementById("equal"+num).addEventListener("click",function(){makeEquation(num)});
							break;	
						case 5:							
							var del = document.createElement("input");
							del.setAttribute('type', "button");
							del.setAttribute("value", "C");
							del.id = "del"+num;
							del.className = "numbers"; 
         					cell.appendChild(del);
         					document.getElementById("del"+num).addEventListener("click", function(){addDigit("C",num)});

							break;		            				
         			}
         			counter++;
         		}
         		else{
	             	var btn = createDig0(num);
	                cell.appendChild(btn);
	                document.getElementById("0"+num).addEventListener("click", function(){addDigit("0",num)});
         		}
         	}  
         	else if(i == 3)
         	{
         		switch(counter)
         		{
         			case 0:
						var divide = document.createElement("input");
						divide.setAttribute('type', "button");
						divide.setAttribute("value", "/");
						divide.id = "divide"+num;
						divide.className = "numbers"; 
	             		cell.appendChild(divide);
						document.getElementById("divide"+num).addEventListener("click", function(){addDigit("/",num)});
						break;
					case 1:
						var mult = document.createElement("input");
						mult.setAttribute('type', "button");
						mult.setAttribute("value", "x");
						mult.id = "mult"+num;
						mult.className = "numbers"; 
	             		cell.appendChild(mult);
	             		document.getElementById("mult"+num).addEventListener("click", function(){addDigit("x",num)});
						break;	 
					case 2:
						var minus = document.createElement("input");
						minus.setAttribute('type', "button");
						minus.setAttribute("value", "-");
						minus.id = "minus"+num;
						minus.className = "numbers"; 
	             		cell.appendChild(minus);
	             		document.getElementById("minus"+num).addEventListener("click", function(){addDigit("-",num)});
						break;	 					             			
         		}
         		counter++;
         	}
         	else
         	{
				switch(cellNum)
				{             			
					case 1:
             			var btn1 = document.createElement("input");
						btn1.setAttribute('type', "button");
						btn1.setAttribute("value", "1");
						btn1.id = "1"+num;
						btn1.className = "numbers";
						cell.appendChild(btn1);
               			document.getElementById("1"+num).addEventListener("click", function(){addDigit("1",num)});
               			break;
               	    case 2:
        			   	var btn2 = document.createElement("input");
						btn2.setAttribute('type', "button");
						btn2.setAttribute("value", "2");
						btn2.id = "2"+num;
						btn2.className = "numbers";
						cell.appendChild(btn2);
               			document.getElementById("2"+num).addEventListener("click", function(){addDigit("2",num)});
               			break;
               		case 3:
           			   	var btn3 = document.createElement("input");
						btn3.setAttribute('type', "button");
						btn3.setAttribute("value", "3");
						btn3.id = "3"+num;
						btn3.className = "numbers";
						cell.appendChild(btn3);
               			document.getElementById("3"+num).addEventListener("click", function(){addDigit("3",num)});
               			break;
               		case 4:
           			   	var btn4 = document.createElement("input");
						btn4.setAttribute('type', "button");
						btn4.setAttribute("value", "4");
						btn4.id = "4"+num;
						btn4.className = "numbers";
						cell.appendChild(btn4);
                		document.getElementById("4"+num).addEventListener("click", function(){addDigit("4",num)});
               			break;
               		case 5:
           			   	var btn5 = document.createElement("input");
						btn5.setAttribute('type', "button");
						btn5.setAttribute("value", "5");
						btn5.id = "5"+num;
						btn5.className = "numbers";
						cell.appendChild(btn5);
                		document.getElementById("5"+num).addEventListener("click", function(){addDigit("5",num)});
                		break;
               		case 6:
             		   	var btn6 = document.createElement("input");
						btn6.setAttribute('type', "button");
						btn6.setAttribute("value", "6");
						btn6.id = "6"+num;
						btn6.className = "numbers";
						cell.appendChild(btn6);
                		document.getElementById("6"+num).addEventListener("click", function(){addDigit("6",num)});
                		break;
                   	case 7:
           				var btn7 = document.createElement("input");
						btn7.setAttribute('type', "button");
						btn7.setAttribute("value", "7");
						btn7.id = "7"+num;
						btn7.className = "numbers";
						cell.appendChild(btn7);
                		document.getElementById("7"+num).addEventListener("click", function(){addDigit("7",num)});
                		break;
               		case 8:
             		   	var btn8 = document.createElement("input");
						btn8.setAttribute('type', "button");
						btn8.setAttribute("value", "8");
						btn8.id = "8"+num;
						btn8.className = "numbers";
						cell.appendChild(btn8);
                		document.getElementById("8"+num).addEventListener("click", function(){addDigit("8",num)});
                		break;
               		case 9:
             		   	var btn9 = document.createElement("input");
						btn9.setAttribute('type', "button");
						btn9.setAttribute("value", "9");
						btn9.id = "9"+num;
						btn9.className = "numbers";
						cell.appendChild(btn9);
                		document.getElementById("9"+num).addEventListener("click", function(){addDigit("9", num)});
           				break;
             	}
            	cellNum++;             		
         	}
        }
    }
}

//creates the screen of the calculator 
function createHeader(num)
{
	var header = document.createElement("input");
	header.setAttribute("type", "text");
	header.setAttribute("readonly", "readonly");
	header.setAttribute("value", "");
	header.id = "screen"+num;
	header.className = "screen";
	return header;
}


function createDig0(num)
{
	var btn0 = document.createElement("input");
	btn0.setAttribute('type', "button");
	btn0.setAttribute("value", "0");
	btn0.id = "0"+num;
	btn0.className = "numbers";
	return btn0;
}


//adds the token digits to the screen 
function addDigit(dig,num)
{
	//check if the num of equal is more then 1
	if (numOfEqual > 0) 
	{
		document.getElementById('screen'+num).value = "";
		curr = "";
		numOfEqual = 0;
	}

	//erase the chars on the screen
	if(dig == "C"){
		document.getElementById('screen'+num).value = "";
		curr = "";
	}
	else
	{
		scrnelem = document.getElementById("screen"+num);
		scrnval = scrnelem.value;
		if(dig == "+"  || dig == "x" || dig == "/")
		{	
			//check if one of the signs above was chosen first, if so dont show
			// anything on the screen
			if(document.getElementById("screen"+num).value == "")
			{
				header.setAttribute("value", "");
			}
			else
			{		
				memory = dig;
			}
		}
		//if the sign "-" was chosen	
		else
		{
			//checks if the sign "-" acts like minus or as a negetive number
			for(; iMem < scrnval.length; iMem++)
			{
				if(scrnval.indexOf("-") == iMem)
				{
					if(iMem != 0)
					{
						if(scrnval.charAt(iMem - 1) == "+" || scrnval.charAt(iMem - 1) == "x" || scrnval.charAt(iMem - 1) == "/")
						{
							memory = scrnval.charAt(iMem-1);
						}
						else
						{
							memory = "-";
						}
					}
				}
			}
		}

		document.getElementById('screen'+num).value += dig;
	}
}

//if the "=" sign was pressed, make an equation out of the numbers.
function makeEquation(num)
{
	//if there were chosen to many "=" signs
	if(numOfEqual > 0)
	{
		document.getElementById('screen' + num).value = "";
		numOfEqual = 0;
	}
	else
	{
		scrnelem = document.getElementById("screen" + num);
		scrnval = scrnelem.value;
		// checks all the options of the negetive or minus sign
		if(memory == "-")
		{
			if(scrnval.indexOf("-") == 0 && scrnval.indexOf("-",iMem - 1) != iMem - 1)
			{
				res = scrnval.split(memory);
				calculate(-res[1], res[2], memory,num);
			}
			else if(scrnval.indexOf("-") == 0 && scrnval.indexOf("-",iMem) == iMem)
			{
				res = scrnval.split(memory);
				calculate(-res[1], res[2], "+",num);
			}
			else if(scrnval.indexOf("-") != 0 && scrnval.indexOf("-",iMem - 1) == iMem - 1 && scrnval.indexOf("-",iMem - 2) != iMem - 1)
			{
				res = scrnval.split(memory);
				calculate(res[0], res[2],'+',num);
			}
			else
			{
				res = scrnval.split(memory);
				calculate(res[0], res[1], memory, num);
			}
		}
		else
		{
			res = scrnval.split(memory);
			calculate(res[0], res[1], memory, num);
		}
	}
	numOfEqual++;
}



function calculate(num1, num2, op, i)
{
	num1 = parseInt(num1);
	num2 = parseInt(num2);
	switch(op)
	{
		case '+':
			 sol = num1+num2;
			 break;
		case "-":
			sol = num1-num2;
			break;
		case "/":
			sol = num1/num2;
			break;
		case "x":
			sol = num1*num2;
			break;	
	}
	document.getElementById('screen'+i).value = sol;
}

//the first calc
var calc1 = new Calc(0);

//creates the objects of the calculators
function create(num)
{
	var calc2 = new Calc(num);
}

//adds more calculators to the page
var addCalcBtn = document.createElement("input");       
addCalcBtn.setAttribute('type', 'button');
addCalcBtn.setAttribute("value", "Add a Calculator");
addCalcBtn.id = "addCalcBtn";
divCalc.appendChild(addCalcBtn);
document.getElementById("addCalcBtn").addEventListener("click", function(){ counterClac++; create(counterClac);}) ;
 

///////////////////////////////////////////////////////
//////////******Go between pages********//////////////

//check if the username and password are correct, if so go to profile.
function validateForm()
{
	var x = document.getElementsByClassName("input");
	if (x[0].value != "admin" || x[1].value != "admin") 
	{
		alert("Incorrect Username or Password, Please enter 'admin'.");
	}
	else
	{
		divLogIn.style.display = "none";
		h1.style.display = "none";
		divProfile.style.display = "inline";
	}
}

//go from profile page to calculator page
function goToCalc()
{
	divProfile.style.display = "none";
	divCalc.style.display = "inline";
}

//go back to login page
function goToLogIn()
{
	alert("You logged out successfully");
	divLogIn.style.display = "";
	h1.style.display = "";
	divProfile.style.display = "none";
}



