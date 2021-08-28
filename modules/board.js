const nodeHtmlToImage = require('node-html-to-image');

class Board {
    constructor(msg, userID) {
        this.piecesList = {
            wk: '\u2654',
            wq: '\u2655',
            wr: '\u2656',
            wb: '\u2657',
            wn: '\u2658',
            wp: '\u2659',
            bk: '\u265A',
            bq: '\u265B',
            br: '\u265C',
            bb: '\u265D',
            bn: '\u265E',
            bp: '\u265F'
        }

        this.msg = msg;
        this.userID = userID;

        this.whiteMap = `<html>

        <head>
            <meta charset="UTF-8">
            <style type="text/css">
                body {
                    width: 720px;
                    height: 680px;
                }
                .chessboard {
                    width: 680px;
                    height: 680px;
                }
                .black {
                    float: left;
                    width: 80px;
                    height: 80px;
                    background-color: #aaa;
                    font-size: 60px;
                    text-align: center;
                    display: table-cell;
                    vertical-align: middle;
                }
                .white {
                    float: left;
                    width: 80px;
                    height: 80px;
                    background-color: #fff;
                    font-size: 60px;
                    text-align: center;
                    display: table-cell;
                    vertical-align: middle;
                }
                .number {
                    float: left;
                    width: 40px;
                    height: 80px;
                    font-size: 30px;
                    text-align: center;
                    line-height: 80px;
                }
                .char {
                    float: left;
                    width: 80px;
                    height: 40px;
                    font-size: 30px;
                    text-align: center;
                    line-height: 40px;
                }
                .empty {
                    float: left;
                    width: 40px;
                    height : 40px;
                }
            </style>
        </head>
        
        <body>
            <div class="chessboard">
                <!-- 8 -->
                <div class="number">8</div>
                <div class="white">{{a8}}</div>
                <div class="black">{{b8}}</div>
                <div class="white">{{c8}}</div>
                <div class="black">{{d8}}</div>
                <div class="white">{{e8}}</div>
                <div class="black">{{f8}}</div>
                <div class="white">{{g8}}</div>
                <div class="black">{{h8}}</div>
                <!-- 7 -->
                <div class="number">7</div>
                <div class="black">{{a7}}</div>
                <div class="white">{{b7}}</div>
                <div class="black">{{c7}}</div>
                <div class="white">{{d7}}</div>
                <div class="black">{{e7}}</div>
                <div class="white">{{f7}}</div>
                <div class="black">{{g7}}</div>
                <div class="white">{{h7}}</div>
                <!-- 6 -->
                <div class="number">6</div>
                <div class="white">{{a6}}</div>
                <div class="black">{{b6}}</div>
                <div class="white">{{c6}}</div>
                <div class="black">{{d6}}</div>
                <div class="white">{{e6}}</div>
                <div class="black">{{f6}}</div>
                <div class="white">{{g6}}</div>
                <div class="black">{{h6}}</div>
                <!-- 5 -->
                <div class="number">5</div>
                <div class="black">{{a5}}</div>
                <div class="white">{{b5}}</div>
                <div class="black">{{c5}}</div>
                <div class="white">{{d5}}</div>
                <div class="black">{{e5}}</div>
                <div class="white">{{f5}}</div>
                <div class="black">{{g5}}</div>
                <div class="white">{{h5}}</div>
                <!-- 4 -->
                <div class="number">4</div>
                <div class="white">{{a4}}</div>
                <div class="black">{{b4}}</div>
                <div class="white">{{c4}}</div>
                <div class="black">{{d4}}</div>
                <div class="white">{{e4}}</div>
                <div class="black">{{f4}}</div>
                <div class="white">{{g4}}</div>
                <div class="black">{{h4}}</div>
                <!-- 3 -->
                <div class="number">3</div>
                <div class="black">{{a3}}</div>
                <div class="white">{{b3}}</div>
                <div class="black">{{c3}}</div>
                <div class="white">{{d3}}</div>
                <div class="black">{{e3}}</div>
                <div class="white">{{f3}}</div>
                <div class="black">{{g3}}</div>
                <div class="white">{{h3}}</div>
                <!-- 2 -->
                <div class="number">2</div>
                <div class="white">{{a2}}</div>
                <div class="black">{{b2}}</div>
                <div class="white">{{c2}}</div>
                <div class="black">{{d2}}</div>
                <div class="white">{{e2}}</div>
                <div class="black">{{f2}}</div>
                <div class="white">{{g2}}</div>
                <div class="black">{{h2}}</div>
                <!-- 1 -->
                <div class="number">1</div>
                <div class="black">{{a1}}</div>	<!-- a -->
                <div class="white">{{b1}}</div>	<!-- b -->
                <div class="black">{{c1}}</div>	<!-- c -->
                <div class="white">{{d1}}</div>	<!-- d -->
                <div class="black">{{e1}}</div>	<!-- e -->
                <div class="white">{{f1}}</div>	<!-- f -->
                <div class="black">{{g1}}</div>	<!-- g -->
                <div class="white">{{h1}}</div>	<!-- h -->
                
                <!-- char -->
                <div class="empty"></div>
                <div class="char">a</div>
                <div class="char">b</div>
                <div class="char">c</div>
                <div class="char">d</div>
                <div class="char">e</div>
                <div class="char">f</div>
                <div class="char">g</div>
                <div class="char">h</div>
            </div>
        </body>
        
        </html>`
        this.blackMap = `<html>

        <head>
            <meta charset="UTF-8">
            <style type="text/css">
                body {
                    width: 720px;
                    height: 680px;
                }
                .chessboard {
                    width: 680px;
                    height: 680px;
                }
                .black {
                    float: left;
                    width: 80px;
                    height: 80px;
                    background-color: #aaa;
                    font-size: 60px;
                    text-align: center;
                    display: table-cell;
                    vertical-align: middle;
                }
                .white {
                    float: left;
                    width: 80px;
                    height: 80px;
                    background-color: #fff;
                    font-size: 60px;
                    text-align: center;
                    display: table-cell;
                    vertical-align: middle;
                }
                .number {
                    float: left;
                    width: 40px;
                    height: 80px;
                    font-size: 30px;
                    text-align: center;
                    line-height: 80px;
                }
                .char {
                    float: left;
                    width: 80px;
                    height: 40px;
                    font-size: 30px;
                    text-align: center;
                    line-height: 40px;
                }
                .empty {
                    float: left;
                    width: 40px;
                    height : 40px;
                }
            </style>
        </head>
        
        <body>
            <div class="chessboard">
                <!-- 1 -->
                <div class="number">1</div>
                <div class="white">{{h1}}</div>	<!-- h -->
                <div class="black">{{g1}}</div>	<!-- g -->
                <div class="white">{{f1}}</div>	<!-- f -->
                <div class="black">{{e1}}</div>	<!-- e -->
                <div class="white">{{d1}}</div>	<!-- d -->
                <div class="black">{{c1}}</div>	<!-- c -->
                <div class="white">{{b1}}</div>	<!-- b -->
                <div class="black">{{a1}}</div>	<!-- a -->
                <!-- 2 -->
                <div class="number">2</div>
                <div class="black">{{h2}}</div>
                <div class="white">{{g2}}</div>
                <div class="black">{{f2}}</div>
                <div class="white">{{e2}}</div>
                <div class="black">{{d2}}</div>
                <div class="white">{{c2}}</div>
                <div class="black">{{b2}}</div>
                <div class="white">{{a2}}</div>
                <!-- 3 -->
                <div class="number">3</div>
                <div class="white">{{h3}}</div>
                <div class="black">{{g3}}</div>
                <div class="white">{{f3}}</div>
                <div class="black">{{e3}}</div>
                <div class="white">{{d3}}</div>
                <div class="black">{{c3}}</div>
                <div class="white">{{b3}}</div>
                <div class="black">{{a3}}</div>
                <!-- 4 -->
                <div class="number">4</div>
                <div class="black">{{h4}}</div>
                <div class="white">{{g4}}</div>
                <div class="black">{{f4}}</div>
                <div class="white">{{e4}}</div>
                <div class="black">{{d4}}</div>
                <div class="white">{{c4}}</div>
                <div class="black">{{b4}}</div>
                <div class="white">{{a4}}</div>
                <!-- 5 -->
                <div class="number">5</div>
                <div class="white">{{h5}}</div>
                <div class="black">{{g5}}</div>
                <div class="white">{{f5}}</div>
                <div class="black">{{e5}}</div>
                <div class="white">{{d5}}</div>
                <div class="black">{{c5}}</div>
                <div class="white">{{b5}}</div>
                <div class="black">{{a5}}</div>
                <!-- 6 -->
                <div class="number">6</div>
                <div class="black">{{h6}}</div>
                <div class="white">{{g6}}</div>
                <div class="black">{{f6}}</div>
                <div class="white">{{e6}}</div>
                <div class="black">{{d6}}</div>
                <div class="white">{{c6}}</div>
                <div class="black">{{b6}}</div>
                <div class="white">{{a6}}</div>
                <!-- 7 -->
                <div class="number">7</div>
                <div class="white">{{h7}}</div>
                <div class="black">{{g7}}</div>
                <div class="white">{{f7}}</div>
                <div class="black">{{e7}}</div>
                <div class="white">{{d7}}</div>
                <div class="black">{{c7}}</div>
                <div class="white">{{b7}}</div>
                <div class="black">{{a7}}</div>
                <!-- 8 -->
                <div class="number">8</div>
                <div class="black">{{h8}}</div>
                <div class="white">{{g8}}</div>
                <div class="black">{{f8}}</div>
                <div class="white">{{e8}}</div>
                <div class="black">{{d8}}</div>
                <div class="white">{{c8}}</div>
                <div class="black">{{b8}}</div>
                <div class="white">{{a8}}</div>
                <!-- char -->
                <div class="empty"></div>
                <div class="char">h</div>
                <div class="char">g</div>
                <div class="char">f</div>
                <div class="char">e</div>
                <div class="char">d</div>
                <div class="char">c</div>
                <div class="char">b</div>
                <div class="char">a</div>
            </div>
        </body>
        
        </html>`
    }

    boardToIndex(board) {
        let i = parseInt(board[1]) - 1; 
        let j = 0;
        
        switch(board[0]){
            case "a":
                j = 0;
                break;
            case "b":
                j = 1;
                break;
            case "c":
                j = 2;
                break;
            case "d":
                j = 3;
                break;
            case "e":
                j = 4;
                break;
            case "f":
                j = 5;
                break;
            case "g":
                j = 6;
                break;
            case "h":
                j = 7;
                break;
        }

        return [i, j];
    }

    indexToBoard(i, j) {
        let board = "";
        switch(j){
            case 0:
                board += "a";
                break;
            case 1:
                board += "b";
                break;
            case 2:
                board += "c";
                break;
            case 3:
                board += "d";
                break;
            case 4:
                board += "e";
                break;
            case 5:
                board += "f";
                break;
            case 6:
                board += "g";
                break;
            case 7:
                board += "h";
                break;
        }
        board += (8-i);

        return board;
    }

    printBoard(board, turn) {
        let map = {};
        
        for(let i=0; i<8; i++){
            for(let j=0; j<8; j++){
                if(board[i][j] === null) {
                    map[this.indexToBoard(i, j)] = "";
                }
                else {
                    map[this.indexToBoard(i, j)] = this.piecesList[board[i][j].color+board[i][j].type];
                }
            }
        }
        
        let mapType = turn === "w" ? this.whiteMap : this.blackMap;
        //let mapType = this.whiteMap;
        nodeHtmlToImage({
            output: "./temp/"+this.userID+".png",
            html: mapType,
            content: map
        }).then(() => this.msg.channel.send({files: ["./temp/"+this.userID+".png"]}));
    }
}

module.exports.Board = Board;