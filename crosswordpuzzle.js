function CrosswordPuzzle()
{
	const emptyCell = '_';
	let grid = Array.from(Array( gridSize ), () => new Array( gridSize ))
	for( let row = 0; row < gridSize; row++ )
	{
		for( let column = 0; column < gridSize; column++ )
		{
			grid[row][column] = emptyCell;
		}
	}

	let update = function( word )
	{
		let updated = false;
		if( canBePlaced( word ))
		{
			addWord( word );
			updated = true;
		}

		return updated;
	}

	let canBePlaced = function( word )
	{
		let canBePlaced = true;
		if( isValidPosition( word.row, word.column ) &&  fitsOnGrid( word ) )
		{
			let index = 0;
			while( index < word.text.length )
			{
				let currentRow = word.vertical ? word.row + index : word.row;
				let currentColumn = !word.vertical ? word.column + index : word.column;

				if( ( word.text.charAt( index ) === grid[currentRow][currentColumn] ||
					emptyCell === grid[currentRow][currentColumn] ) &&
					placementLegal( word, currentRow, currentColumn) )
				{
					/* words */
					let words = [
						{
							qId: "01",
									question: "من التماسيح",
							value: "قاطور"
						},
						{
							qId: "02",
									question: "من الألوان",
							value: "بنفسجي"
						},
						{
							qId: "03",
									question: "من كتب أحمد مصطفى",
							value: "أنتيخريسطوس"
						},
						{
							qId: "04",
									question: "من كتب طه حسين",
							value: "الأيام"
						},
						{
							qId: "05",
									question: "من أدوات النجارة",
							value: "إزميل"
						},
						{
							qId: "06",
									question: "صحب نظرية التطور",
							value: "داروين"
						},
						{
							qId: "07",
									question: "من أخوات كان",
							value: "ليس"
						},
						{
							qId: "08",
									question: "مادة بترولية",
							value: "بلاستيك"
						},
						{
							qId: "09",
									question: "دولة أروبية",
							value: "لاتفيا"
						},
						{
							qId: "10",
									question: "من حروف الجر",
							value: "على"
						},{
							qId: "11",
									question: "من حروف الجر",
							value: "من"
						},
						{
							qId: "12",
									question: "من حروف الجر",
							value: "الى"
						},
						{
							qId: "13",
									question: "من حروف الجر",
							value: "من"
						},
						{
							qId: "14",
									question: "دولة عربية",
							value: "السودان"
						},
						{
							qId: "15",
									question: "من حروف الجر",
							value: "في"
						},
						{
							qId: "16",
									question: "من الشهور الميلادية",
							value: "غشت"
						},
						{
							qId: "17",
									question: "من الشهور العربية",
							value: "شعبان"
						},
						{
							qId: "18",
									question: "من الورود",
							value: "ريحان"
						},
						{
							qId: "19",
									question: "من المعادن",
							value: "حديد"
						},
						{
							qId: "20",
									question: "من مناسك الحج",
							value: "طواف"
						},{
							qId: "21",
									question: "من الألوان",
							value: "رمادي"
						},
						{
							qId: "22",
									question: "من السيارات",
							value: "هيونداي"
						},
						{
							qId: "23",
									question: "من الرياضات",
							value: "جمباز"
						},
						{
							qId: "24",
									question: "من السنوريات",
							value: "نمر"
						},
						{
							qId: "25",
									question: "من الملائكة",
							value: "اسرافيل"
						},
						{
							qId: "26",
									question: "من الخضر",
							value: "بطاطس"
						},
						{
							qId: "27",
									question: "من الأشجار",
							value: "صفصاف"
						},
						{
							qId: "28",
									question: "من الفواكه",
							value: "بطيخ"
						},
						{
							qId: "29",
									question: "من االطيور",
							value: "بطريق"
						},
						{
							qId: "30",
									question: "من االاسماك",
							value: "قرش"
						}
					] 
				}
				else
				{
					canBePlaced = false;
				}
				index++;
			}
		}
		else
		{
			canBePlaced = false;
		}

		return canBePlaced;
	}

    let getIntersections = function()
    {
        let intersections = 0;
        for (let row = 0; row < gridSize; row++)
        {
            for (let column = 0; column < gridSize; column++)
            {
                if ( isLetter( row, column ) )
                {
                    if ( isValidPosition( row - 1, column ) &&
                         isValidPosition( row + 1, column ) &&
                         isValidPosition( row, column - 1 ) &&
                         isValidPosition( row, column + 1 ) &&
                         isLetter( row - 1, column ) &&
                         isLetter( row + 1, column ) &&
                         isLetter( row, column - 1 ) &&
                         isLetter( row, column + 1 ) )
                    {
                        ++intersections;
                    }
                }
            }
        }
        return intersections;
    }

	let placementLegal = function( word, row, column )
	{
		let illegal = false;
		if( word.vertical )
		{
			illegal = isInterference( row, column + 1, row + 1, column ) ||
					  isInterference( row, column - 1, row + 1, column  ) ||
					  overwritingVerticalWord( row, column ) ||
					  invadingTerritory( word, row, column );

		}
		else
		{
			illegal = isInterference( row + 1, column, row, column + 1 ) ||
					  isInterference( row - 1, column, row, column + 1  ) ||
					  overwritingHorizontalWord( row, column ) ||
					  invadingTerritory( word, row, column );

		}
		return !illegal;
	}

	let invadingTerritory = function( word, row, column )
	{
		let invading = false;
		let empty = isEmptyCell( row, column )
		if( word.vertical )
		{
			let weHaveNeighbors = ( doesCharacterExist( row, column - 1 ) ||
					     		    doesCharacterExist( row, column + 1 ) ) ||
									endOfWord( word, row, column ) && 
									doesCharacterExist( row + 1, column );

			invading = empty && weHaveNeighbors;				
		}
		else
		{
			let weHaveNeighbors = ( doesCharacterExist( row - 1, column ) ||
					     		    doesCharacterExist( row + 1, column ) ) ||
									endOfWord( word, row, column ) && 
									doesCharacterExist( row, column + 1 );

			invading = empty && weHaveNeighbors;
		}
		return invading;
	}

	let endOfWord = function( word, row, column )
	{
		if( word.vertical )
		{
			return word.row + word.text.length - 1 === row;
		}
		else
		{
			return word.column + word.text.length - 1 === column;
		}
	}

	let doesCharacterExist = function( row, column )
	{
		return isValidPosition( row, column ) && 
			   isLetter( row, column );
	}

    let overwritingHorizontalWord = function( row, column )
    {
        let leftColumn = column - 1;
        return ( isValidPosition( row, leftColumn ) && 
        		 isLetter( row, column ) && 
        		 isLetter( row, leftColumn ) );
    }

    let overwritingVerticalWord = function( row, column )
    {
        let rowAbove = row - 1;
        return ( isValidPosition( rowAbove, column ) && 
        		 isLetter( row, column ) && 
        		 isLetter( rowAbove, column ) );
    }

    let isInterference = function( row, column, nextRow, nextColumn )
    {
    	return isValidPosition( row, column ) &&
    		   isValidPosition( nextRow, nextColumn ) &&
    		   isLetter( row, column ) &&
    		   isLetter( nextRow, nextColumn );	
    }

    let isLetter = function( row, column)
    {
    	return grid[row][column] !== emptyCell;
    }

    let isEmptyCell = function( row, column )
    {
    	return !isLetter( row, column );
    }

	let addWord = function( word )
	{
		for (let letterIndex = 0; letterIndex < word.text.length; ++letterIndex)
        {
        	let row = word.row;
			let column = word.column;
	        if ( word.vertical )
	        {
	            row += letterIndex;
	        }
	        else
	        {
	            column += letterIndex;
	        }

	        grid[row][column] = word.text.substring( letterIndex, letterIndex + 1 );
        }
	}

	let fitsOnGrid = function( word )
	{
		if( word.vertical )
		{
			return word.row + word.text.length <= gridSize;
		}
		else
		{
			return word.column + word.text.length <= gridSize;
		}
	}

	let isValidPosition = function( row, column )
    {
        return row >= 0 && row < gridSize && column >= 0 && column < gridSize;
    }

	return { 
		"grid": grid, 
		"update": update, 
		"isLetter": isLetter, 
		"getIntersections": getIntersections
	};
}