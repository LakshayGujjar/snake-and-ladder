console.log("hello");

function load_board()
{
	var get_table = document.getElementsByTagName("TABLE");

	//[present,afterbite]
	var snakes = [
	[98,79],[95,75],[93,73],[87,36],[64,44],[62,19],[54,34],[17,7]
	];
	//[present,afterladder]
	var ladders = [
	[76,92],[72,91],[51,67],[28,77],[21,42],[9,31],[4,14],[2,38]
	];

	var a= 0; // to iterate snakes array
	var b= 0; //to iterate ladders array
	var val = 100;
	var append_forward = 0;
	for(var i=10;i>0;i--)
	{
		var row = document.createElement("tr");
		var id_ = "r" + i;
		//console.log(id_)
		row.setAttribute("id",id_);

		get_table[0].appendChild(row);
		var get_row = document.getElementById(id_);

		
		for(var j=0;j<10;j++)
		{
			var identity = "<br>";
			var cell = document.createElement("td");
			cell.setAttribute("class","num"+val);
			if(a!=8)
			{
				if(val == snakes[a][0])
				{
					identity = "S" +snakes[a][1];
					a++;
				}
			}
			if(b!=8)
			{
				if (val == ladders[b][0])
				{
					identity = "L" +ladders[b][1];
					b++;
				}
			}
			cell.innerHTML = "<span style='display:block;background-color : pink;'>" + val + "</span>" + "<span  class='center'> <br></span>" + "<span  style='display:block;background-color : pink;'>" + identity + "</span>";
			val--;

			if(append_forward)
			{
				get_row.insertBefore(cell ,get_row.childNodes[0]);
			} 
			else
			{
				get_row.appendChild(cell);
			}
		}

		if(append_forward)
		{
			append_forward = 0;
		}
		else
		{
			append_forward = 1;
		}

	}
	//removing the board button so that more boards cannot be added
	document.getElementById("board_button").remove();
}

//changes made by function to globals without passing them the values will be implemented
//outside the function also
var positions = {p1_val:0, p2_val:0};

var p1_color = "black";
var p2_color = "blue";

function dice_number() 
{
	return Math.floor(Math.random() * 6 ) + 1;
}

function take_turn(key)
{
	console.log(positions[key]);
	var player_name;

	if(key == "p1_val")
	{
		player_name = "P1";
	}
	else if(key == "p2_val")
	{
		player_name = "P2";
	}

	alert("rolling dice for "+player_name);
	var temp = dice_number();
	alert("you get "+temp + " on dice");

	if(temp + positions[key] >100)
	{
		alert("sorry cannot make a move");
		return 0;
	}


	if(positions[key] != 0)
	{
		//that is turn backcolor of the present cell to table back color
		var y = document.getElementsByClassName( ("num" + positions[key]) )[0];
		var x = y.getElementsByClassName("center")[0];
		//change back color to table color -> background-color: #FF7733;
		x.style["background-color"] = "#FF7733";
	}
	//turning position to new position after rolling dice
	positions[key] = positions[key] + temp;

	//now getting td with resp. to new position and changing its color
	console.log(positions[key]);

	var y = document.getElementsByClassName( ("num" + positions[key]) )[0];	
	var x = y.getElementsByClassName("center")[0];

	if(key == "p1_val")
	{
		//console.log(p1_color);
		x.style["background-color"] = p1_color;
	}
	else if(key == "p2_val")
	{
		//console.log(p2_color);
		x.style["background-color"] = p2_color;
	}

	//but if the current cell contain S or L then take p1 to new location

	var z = y.childNodes[2].innerHTML;
	if(z[0]=='S' || z[0]=='L')
	{
		z = z.substring(1);
		z = Number(z);

		//that is turn backcolor of the present cell to table back color
		//change back color to table color -> background-color: #FF7733;
		x.style["background-color"] = "#FF7733";

		//setting the new position
		positions[key] = z;

		//below code same as changing the position after rolling dice
		y = document.getElementsByClassName( ("num" + positions[key]) )[0];	
		x = y.getElementsByClassName("center")[0];

		if(key == "p1_val")
		{
			//console.log(p1_color);
			x.style["background-color"] = p1_color;
		}
		else if(key == "p2_val")
		{
			//console.log(p2_color);
			x.style["background-color"] = p2_color;
		}

	}


	//then we have to also check if on that index p1_was already existing 
	//i.e. check if p1_val == p2_val
	//then make the previous player val = 1
	if(positions.p1_val == positions.p2_val)
	{
		if(player_name == "P1")
		{
			positions.p2_val = 0;
		}
		else if(player_name == "P2")
		{
			positions.p1_val = 0;
		}
	}

	//atlast we now also need to check if player has reached on 100
	if(positions[key]==100)
	{
		alert("player" + player_name + "wins");
		
		if(positions.p1_val != 0)
		{
			var y = document.getElementsByClassName( ("num" + positions.p1_val) )[0];
			var x = y.getElementsByClassName("center")[0];
			//change back color to table color -> background-color: #FF7733;
			x.style["background-color"] = "#FF7733";
		}
		if(positions.p2_val != 0)
		{
			var y = document.getElementsByClassName( ("num" + positions.p2_val) )[0];
			var x = y.getElementsByClassName("center")[0];
			//change back color to table color -> background-color: #FF7733;
			x.style["background-color"] = "#FF7733";
		}

		positions.p1_val = 0;
		positions.p2_val = 0;
	}

}
