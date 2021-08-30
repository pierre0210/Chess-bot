const Discord = require('discord.js');
const { Chess } = require('chess.js');
const fs = require('fs');
const config = require('./config.json');
const util = require('./modules/util.js');
const { Board } = require('./modules/board.js');

const client = new Discord.Client();

var gameQueue = [];
const sq = "```\n";
const eq = "\n```";

const prefix = "|";

client.on('ready', async () => {
    console.log('Logged in as %s !', client.user.tag);
});

client.on('message', async msg => {
    if(msg.author.bot) return;
	if(msg.channel.type === 'dm') return;
	const userName = msg.author.username;
	const userID = msg.author.id;
	const userTag = msg.author.tag;

    if(msg.content.startsWith(prefix)) {
        const args = msg.content.slice(prefix.length).split(' ');
		const cmd = args.shift();

        if(cmd === "chess" && args.length === 1) {
            let check = false;
            for(let i=0; i<gameQueue.length; i++){
                if(gameQueue[i].white === userID || gameQueue[i].black === userID){
                    check = true;
                }
                else if(gameQueue[i].white === util.getMentionUser(args[0]) || gameQueue[i].black === util.getMentionUser(args[0])){
                    check = true;
                }
            }
            if(!check) {
                let game = {
                    chess: new Chess(),
                    board: new Board(msg, userID),
                    white: userID,
                    black: util.getMentionUser(args[0]),
                };
                gameQueue.push(game);
                let board = gameQueue[gameQueue.length - 1].chess.board();
                //console.log(board);
                gameQueue[gameQueue.length - 1].board.printBoard(board, "w");
            }
        }

        //move <start> <end>
        else if(cmd === "move" && (args.length === 2 || args[0] === "long" || args[0] === "short")){
            let index = -1;
            for(let i=0; i<gameQueue.length; i++){
                if(gameQueue[i].chess.turn()) {
                    let player = gameQueue[i].white;
                    if(player === userID){
                        index = i;
                    }
                }
                else {
                    let player = gameQueue[i].black;
                    if(player === userID){
                        index = i;
                    }
                }
            }
            if(args.length === 2 && index != -1){
                let vec = {from: args[0], to: args[1]};
                let valid = gameQueue[index].chess.move(vec);
                if(valid === null) {
                    await msg.channel.send("Invalid move!");
                }
                else {
                    let board = gameQueue[index].chess.board();
                    let turn = gameQueue[index].chess.turn();
                    
                    if(gameQueue[index].chess.game_over()){
                        if(gameQueue[index].chess.in_checkmate()){
                            let player = turn === "w" ? "Black" : "White";
                            await msg.channel.send("**Checkmate!** " + player + " won!");
                        }
                        else if(gameQueue[index].chess.in_stalemate()){
                            await msg.channel.send("**Stalemate!** Draw!");
                        }
                        else if(gameQueue[index].chess.in_draw()) {
                            await msg.channel.send("**Draw!**");
                        }
                        fs.unlink("./temp/"+gameQueue[index].white+".png", (err) => {
                            if(err) console.log(err);
                            else {
                                gameQueue.splice(index, 1);
                                msg.channel.send("**Game Over!**");
                            }
                        });
                    }
                    else if(gameQueue[index].chess.in_check()){
                        await msg.channel.send("Check!");
                    }
                    else {
                        gameQueue[index].board.printBoard(board, turn);
                    }
                }
            }
            else if(args[0] === "long" || args[0] === "short"){
                
            }
        }
        else if(cmd === "quit") {
            let check = false;
            let index = -1;
            for(let i=0; i<gameQueue.length; i++){
                if(gameQueue[i].white === userID || gameQueue[i].black === userID){
                    check = true;
                    index= i;
                }
            }
            if(check) {
                fs.unlink("./temp/"+gameQueue[index].white+".png", (err) => {
                    if(err) console.log(err);
                    else {
                        gameQueue.splice(index, 1);
                        msg.channel.send("**"+userTag+"** quit!");
                    }
                });
            }
        }
    }
});

client.login(config.token);