(function() {
    var curPlayer = "alliance";
    // alert("Choose your side: For the Alliance!");
    // alert("Choose your side: For the Horde!");

    // function pickaSide() {}
    // var audio1 = $("#audio1");
    // var audio2 = $("#audio2");

    var column = $(".column");
    var slots = $(".slot");
    slots.addClass("cursorA");
    column.on("click", function(e) {
        var slotsInColumn = $(e.currentTarget).find(".slot");
        for (var i = 5; i >= 0; i--) {
            if (!slotsInColumn.eq(i).hasClass("alliance")) {
                if (!slotsInColumn.eq(i).hasClass("horde")) {
                    break;
                }
            }
        }
        slotsInColumn.eq(i).addClass(curPlayer);
        var slotsInRow = $(".row" + i);
        if (checkForVictory(slotsInColumn)) {
            // console.log(slotsInColumn);
            showVictoryMessage();
        } else if (checkForVictory(slotsInRow)) {
            showVictoryMessage();
        } else {
            if (checkForDiagonalWin()) {
                // console.log("A");
                return showVictoryMessage();
            }
        }

        switchPlayers();
    });
    function switchPlayers() {
        if (curPlayer == "alliance") {
            curPlayer = "horde";
            // audio1.play();
            $("#Alliance").removeClass("highlight");
            $("#Horde").addClass("highlight");
            slots.removeClass("cursorA");
            slots.addClass("cursorB");
        } else {
            curPlayer = "alliance";
            $("#Horde").removeClass("highlight");
            $("#Alliance").addClass("highlight");
            // audio2.play();
            slots.removeClass("cursorB");
            slots.addClass("cursorA");
        }
    }

    function checkForVictory(slots) {
        var str = "";
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(curPlayer)) {
                str += "y";
            } else {
                str += "n";
            }
        }

        if (str.indexOf("yyyy") > -1) {
            showVictoryMessage();
        }
    }

    function checkForDiagonalWin() {
        var diagonalWin = [
            [0, 7, 14, 21],
            [1, 8, 15, 22],
            [2, 9, 16, 23],
            [3, 8, 13, 18],
            [4, 9, 14, 19],
            [5, 10, 15, 20],
            [6, 13, 20, 27],
            [7, 14, 21, 28],
            [8, 15, 22, 29],
            [9, 14, 19, 24],
            [10, 15, 20, 25],
            [11, 16, 21, 26],
            [12, 19, 26, 33],
            [13, 20, 27, 34],
            [14, 21, 28, 35],
            [15, 20, 25, 30],
            [16, 21, 26, 31],
            [17, 22, 27, 32],
            [18, 25, 32, 39],
            [19, 26, 33, 40],
            [20, 27, 34, 41],
            [21, 26, 31, 36],
            [22, 27, 32, 37],
            [23, 28, 33, 38]
        ];
        for (var i = 0; i < diagonalWin.length; i++) {
            var playCounter = 0;
            for (var j = 0; j < 4; j++) {
                if (slots.eq(diagonalWin[i][j]).hasClass(curPlayer)) {
                    playCounter++;
                }
            }
            if (playCounter == 4) {
                return true;
            }
        }
    }

    var vic = $(".victory");
    // var winA = $(".winA");
    // var winB = $(".winB");
    function showVictoryMessage() {
        if (curPlayer == "alliance") {
            vic.addClass("winA");
            vic.css({"z-index": 100});
            vic.text("Alliance win!");
        } else if (curPlayer == "horde") {
            vic.addClass("winB");
            vic.css({"z-index": 100});
            vic.text("Horde win!");
        }
        // reportWin();

        vic.on("click", function() {
            location.reload();
        });
    }
    $("#title").on("click", function() {
        location.reload();
    });
})();

// function show_date_time(){
//  window.setTimeout("show_date_time()", 1000);
//  target=new Date(2018,0,19,10,0,0);  //这里使用0-11分别表示1-12月
//  today=new Date();
//  timeold=(target.getTime()-today.getTime());
//  sectimeold=timeold/1000
//  secondsold=Math.floor(sectimeold);
//  msPerDay=24*60*60*1000
//  e_daysold=timeold/msPerDay
//  daysold=Math.floor(e_daysold);
//  e_hrsold=(e_daysold-daysold)*24;
//  hrsold=Math.floor(e_hrsold);
//  e_minsold=(e_hrsold-hrsold)*60;
//  minsold=Math.floor((e_hrsold-hrsold)*60);
//  seconds=Math.floor((e_minsold-minsold)*60);
//   if (daysold<0) {
//   document.getElementById("time").innerHTML="Battle for azerath！";
// }
//  else{
//  if (daysold<10) {daysold="0"+daysold}
//  if (hrsold<10) {hrsold="0"+hrsold}
//  if (minsold<10) {minsold="0"+minsold}
//  if (seconds<10) {seconds="0"+seconds}
//  if (daysold>0) {
//   document.getElementById("time").innerHTML="距活动结束还有：
//   "+daysold+"天"+hrsold+"小时"+minsold+"分"+seconds+"秒";
//  }
//  else
//   document.getElementById("time").innerHTML="<b>距活动结束还有：
//   "+daysold+"天"+hrsold+"小时"+minsold+"分"+seconds+"秒</b>";
//     //结束时间小于1天时加粗显示
// }
// }
// show_date_time();

// function getSlot(col, row) {
//     return $(
//         ".column:nth-child(" +
//             (col + 1) +
//             ") .slot:nth-child(" +
//             (row + 1) +
//             ")"
//     );
// }
//
// function diagonalWinCheck() {
//     for (var col = 0; col < 5; col++) {
//         for (var row = 0; row < 6; row++) {
//             if (
//                 getSlot(
//                     getSlot(row, col),
//                     getSlot(row + 1, col + 1),
//                     getSlot(row + 2, col + 2),
//                     getSlot(row + 3, col + 3)
//                 )
//             ) {
//                 console.log("diagonal");
//                 reportWin(row, col);
//                 return true;
//             } else if (
//                 getSlot(
//                     getSlot(row, col),
//                     getSlot(row - 1, col + 1),
//                     getSlot(row - 2, col + 2),
//                     getSlot(row - 3, col + 3)
//                 )
//             ) {
//                 console.log("diagonal");
//                 reportWin(row, col);
//                 return true;
//             } else {
//                 continue;
//             }
//         }
//     }
// }
//
// showVictoryMessage();
