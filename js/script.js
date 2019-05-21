'use strict;';
/* jshint node: true */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define */

$(document).ready(function () {

    $('#get-result-btn').click(function () {
        //empty old value
		$('#new_class').val("");
        //console.log("btn clicked");

		//get all vslues
		
        $point = [];
        let k = parseInt($('#k').val());
        //console.log($point);
        let new_point = JSON.parse("[" + $('#new_point').val() + "]");
        let class1 = JSON.parse("[" + $('#class1').val() + "]");
        let class2 = JSON.parse("[" + $('#class2').val() + "]");


        
		let c = knn(class1,class2,new_point,k);
        
		//print class value
		c= 'class '+parseInt(c+1);
        $('#new_class').val(c);

    });





});

function knn(class1,class2,new_point,k) {
    //get the maximum columns
	max_cols=Math.max(class1.length,class2.length);

	//make array 2d , with null values , 2 rows , max number of columns
    $distances = array2d(2, max_cols, null);

    //get class 1 distances
    for (let i = 0; i < class1.length; i++) {
        $distances[0][i] = distance(class1[0, i], new_point);
    }

    //get class2 distances
    for (let i = 0; i < class2.length; i++) {
        $distances[1][i] = distance(class2[0, i], new_point);
    }
    console.log($distances);

    //to store the minimum items
    $voting = new Array(k);

    let min = Infinity;
    let minX = -1;
    let minY = -1;

    for (let z = 0; z < k; z++) {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 3; j++) {
                if ($distances[i][j] < min) {
                    minX = i;
                    minY = j;
                    min = $distances[i][j];
                }
            }
        }

        //get the class
        $voting[z] = minX;



        //reset values
        min = Infinity;
        $distances[minX][minY] = Infinity;
        console.log($voting[z]);
        console.log($distances);

    }


    let res = get_mode($voting).toString();

    return res;

}

function distance(arr1, arr2) {
    res = Math.sqrt(Math.pow((arr1[0, 0] - arr2[0, 0]), 2) + Math.pow((arr1[0, 1] - arr2[0, 1]), 2));
    return res;
}

//make array 2d
function array2d(rows, cols, defaultValue) {

    let arr = [];

    // Creates all lines:
    for (let i = 0; i < rows; i++) {

        // Creates an empty line
        arr.push([]);

        // Adds cols to the empty line:
        arr[i].push(new Array(cols));

        for (let j = 0; j < cols; j++) {
            // Initializes:
            arr[i][j] = defaultValue;
        }
    }

    return arr;
}

//voting
function get_mode($input) {
    'use stirct';
    // console.log('get mode function');
    return $input.reduce(function (current, item) {
        let val = current.numMapping[item] = (current.numMapping[item] || 0) + 1;
        if (val > current.greatestFreq) {
            current.greatestFreq = val;
            current.mode = item;
        }
        return current;
    }, {
        mode: null,
        greatestFreq: -Infinity,
        numMapping: {}
    }, $input).mode;
}
