const rounds = 13;

let diceReadings = [1, 1, 1, 1, 1];

let I = 0;
let I_i = 0;
let rollBtnPressed = false;
let x_User = [ 1, 1, 1, 1, 1]; // for rotate dice
let y_user = 0; // for translate dice
let x_Bot  = [ 1, 1, 1, 1, 1]; // for rotate dice
let y_Bot = 0; // for translate dice
let delay = 0; // NOT important just used for set delay 

let botScore = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
let userScore = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
let botScoredList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
let userScoredList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
let reservedDice = [0, 0, 0, 0, 0,];
let reservedDiceBot = [ 0, 0, 0, 0, 0 ];
let temp = [0, 0, 0, 0, 0,];


let message = document.querySelector("#msg_text");

let rollButton = document.querySelector("#roll_dice");
let playAgainBtn = document.querySelector("#play_again_btn");

// Player Icon Divs
let User = document.querySelector(`#user`);
let Bot = document.querySelector(`#bot`);


// console.dir(document.querySelector(`.player`));

// Dice base Divs
let dice1 = document.querySelector(`#dice_base_one`);
let dice2 = document.querySelector(`#dice_base_two`);
let dice3 = document.querySelector(`#dice_base_three`);
let dice4 = document.querySelector(`#dice_base_four`);
let dice5 = document.querySelector(`#dice_base_five`);

// Score Cell of the user Score coloumn
let scoreCell1 = document.querySelector("#ones_you");
let scoreCell2 = document.querySelector("#twos_you");
let scoreCell3 = document.querySelector("#threes_you");
let scoreCell4 = document.querySelector("#fours_you");
let scoreCell5 = document.querySelector("#fives_you");
let scoreCell6 = document.querySelector("#sixes_you");
let scoreCell9 = document.querySelector("#toak_you");
let scoreCell10 = document.querySelector("#foak_you");
let scoreCell11 = document.querySelector("#f_h_you");
let scoreCell12 = document.querySelector("#s_s_you");
let scoreCell13 = document.querySelector("#l_s_you");
let scoreCell14 = document.querySelector("#chance_you");
let scoreCell15 = document.querySelector("#yahtzee_you");

// Colours
const diceIcon = " #dfcaa5";          // Additional (not from palette)
const diceBaseBG = " #754e1a";   
const diceBaseBorder = " #cba35c";
const fDiceIcon = " #b6cbbd"
const fDiceBaseBG = " #754e1a";
const fDiceBaseBorder = " #91a297";   // Additional (not from palette)

let coloum1 = ["category", "ones", "twos", "threes", "fours", "fives", "sixes", "sum", "bonus", "toak", "foak", "f_h", "s_s", "l_s", "chance", "yahtzee", "total_score"];



preparingGame();
console.log("Game Ready");


rollButton.onclick = clickRollBtn;



function preparingGame() {
    hideEmptyScores();
    rollingDice();
    displayScore();
    dynamicRollBtn(I_i);
    dimBotWhileInactive();
    activateReservingDice();
}
function dimUserWhileInactive() {
    User.style.backgroundColor = " #f8e1b780";
    User.style.borderColor = " #8b631c";
}
function brightenUserWhileActive() {
    User.style.backgroundColor = "";
    User.style.borderColor = "";
}
function rollingDice() {
    for(let i = 0; i < diceReadings.length; i++) {
        if( reservedDice[i] == 0 ) {
            diceReadings[i] = random_number();
        }
    }
    displayDice();
}
function random_number() {
    return Math.floor(Math.random() * 6) + 1;
}
function numberToWord(dice) {
    switch(dice) {
        case 1:
            return "one";
        case 2:
            return "two";
        case 3:
            return "three";
        case 4:
            return "four";
        case 5:
            return "five";
        case 6:
            return "six";
    }
}
function displayDice() {
    document.querySelector("#one").className = `fa-solid fa-dice-${numberToWord(diceReadings[0])}`;
    document.querySelector("#two").className = `fa-solid fa-dice-${numberToWord(diceReadings[1])}`;
    document.querySelector("#three").className = `fa-solid fa-dice-${numberToWord(diceReadings[2])}`;
    document.querySelector("#four").className = `fa-solid fa-dice-${numberToWord(diceReadings[3])}`;
    document.querySelector("#five").className = `fa-solid fa-dice-${numberToWord(diceReadings[4])}`;
}
function hideEmptyScores() {
    // let coloum1 = ["category", "ones", "twos", "threes", "fours", "fives", "sixes", "bonus", "sum", "toak", "foak", "f_h", "s_s", "l_s", "chance", "yahtzee", "total_score"];
    for(let i = 1; i < 17; i++) {
        if( i == 7 || i == 8  || i == 16 ) {
            if( I == 0 ) {
                document.querySelector(`#${coloum1[i]}_you`).style.color = " #cba35c";
                document.querySelector(`#${coloum1[i]}_bot`).style.color = " #cba35c";
            } else {
                document.querySelector(`#${coloum1[i]}_you`).style.color = " #754e1a";
                document.querySelector(`#${coloum1[i]}_bot`).style.color = " #754e1a";
            }
        } else {
            if ( userScoredList[i] == 0 ) {
                document.querySelector(`#${coloum1[i]}_you`).style.color = " #b6cbbd";
            }
            if ( botScoredList[i] == 0 ) {
                document.querySelector(`#${coloum1[i]}_bot`).style.color = " #f8e1b7";
            }
        } 
    }
}
function displayScore() {
    // let coloum1 = ["category", "ones", "twos", "threes", "fours", "fives", "sixes", "bonus", "sum", "toak", "foak", "f_h", "s_s", "l_s", "chance", "yahtzee", "total_score"];
    // sum();
    // bonus();
    // totalScore();
    for(let i = 1; i < 17; i++) {
        document.querySelector(`#${coloum1[i]}_you`).textContent = userScore[i];
        document.querySelector(`#${coloum1[i]}_bot`).textContent = botScore[i];
    }
}

function clickRollBtn () {
    // ===== To decorate console window in browser ============
    if( I == 0 ) {                                       //  ||
        console.log(" ");                               //   ||
        console.log("******************************"); //    ||
    }                                                 //     ||
    // ========================================================

    if( I_i == 0 ) {
        I++;
        // ===== To decorate console window in browser ========
        console.log(" ");                             //     ||
        console.log("Starting Round :- ", I);        //      ||
        // ====================================================  
    }

    I_i++;
    rollBtnPressed = true;

    switch(I_i) {
        case 1: 
            // updatingMessage("Click the dice that you want to keep \n You have 2 throws left");
            updatingMessage(`Click the dice that you want to keep
            You have 2 throws left`);
            break;
        case 2: 
            updatingMessage(`Click the dice that you want to keep \n You have 1 throw left`);
            break;
        case 3: 
            updatingMessage(`Select your move by by clicking a\ncell on scorecard`);
            break;
        
    }

    // To Foce choose a score category
    if ( I_i == 3 ) {
        rollButton.onclick = null;
        rollButton.style.border = "0.4rem solid #cba35c";
        rollButton.style.backgroundColor = "rgba(248, 225, 183, 0.7)";
        rollButton.style.color = "#5d3e14";
        document.querySelector("#roll_dice").style.transition = "transform 0s ";
        document.querySelector("#roll_dice").style.transform = "";
    }

    rollingDice();
    dynamicDice();
    console.log(diceReadings);
    
    scorePreview();
    if (I_i < 3 ) {
        rollBtnPressed = false;
    }
    
    // x_User++;
}


function scorePreview() {
    // let coloum1 = ["category", "ones", "twos", "threes", "fours", "fives", "sixes", "bonus", "sum", "toak", "foak", "f_h", "s_s", "l_s", "chance", "yahtzee", "total_score"];

    for(let i = 1; i < 16; i++) {
        if(i == 7 ) {
            i = 9;
        }

        if ( userScoredList[i] == 0 ) {
            switch(i) {
                case 1:
                    document.querySelector(`#${coloum1[i]}_you`).textContent = ones();
                    document.querySelector(`#${coloum1[i]}_you`).style.color = "#cba35c"  
                    document.querySelector(`#${coloum1[i]}_you`).style.fontWeight = "700";
                    scoreCell1.onclick = (event) => {
                        scoring(1);
                    };
                    // scoreCell1.onclick = null;
                    // activateScoreCell(coloum1, i);
                    break;
                case 2:
                    document.querySelector(`#${coloum1[i]}_you`).textContent = twos();
                    document.querySelector(`#${coloum1[i]}_you`).style.color = "#cba35c"  
                    document.querySelector(`#${coloum1[i]}_you`).style.fontWeight = "700";
                    scoreCell2.onclick = (event) => {
                        scoring(2);
                    };
                    // scoreCell2.onclick = null;
                    // activateScoreCell(coloum1, i);
                    break;
                case 3:
                    document.querySelector(`#${coloum1[i]}_you`).textContent = threes();
                    document.querySelector(`#${coloum1[i]}_you`).style.color = "#cba35c"  
                    document.querySelector(`#${coloum1[i]}_you`).style.fontWeight = "700";
                    scoreCell3.onclick = (event) => {
                        scoring(3);
                    };
                    // scoreCell3.onclick = null;
                    // activateScoreCell(coloum1, i);
                    break;
                case 4:
                    document.querySelector(`#${coloum1[i]}_you`).textContent = fours();
                    document.querySelector(`#${coloum1[i]}_you`).style.color = "#cba35c"  
                    document.querySelector(`#${coloum1[i]}_you`).style.fontWeight = "700";
                    scoreCell4.onclick = (event) => {
                        scoring(4);
                    };
                    // scoreCell4.onclick = null;
                    // activateScoreCell(coloum1, i);
                    break;
                case 5:
                    document.querySelector(`#${coloum1[i]}_you`).textContent = fives();
                    document.querySelector(`#${coloum1[i]}_you`).style.color = "#cba35c"  
                    document.querySelector(`#${coloum1[i]}_you`).style.fontWeight = "700";
                    scoreCell5.onclick = (event) => {
                        scoring(5);
                    };
                    // scoreCell5.onclick = null;
                    // activateScoreCell(coloum1, i);
                    break;
                case 6:
                    document.querySelector(`#${coloum1[i]}_you`).textContent = sixes();
                    document.querySelector(`#${coloum1[i]}_you`).style.color = "#cba35c"  
                    document.querySelector(`#${coloum1[i]}_you`).style.fontWeight = "700";
                    scoreCell6.onclick = (event) => {
                        scoring(6);
                    };
                    // scoreCell6.onclick = null;
                    // activateScoreCell(coloum1, i);
                    break;
                case 9:
                    document.querySelector(`#${coloum1[i]}_you`).textContent = toak();
                    document.querySelector(`#${coloum1[i]}_you`).style.color = "#cba35c"  
                    document.querySelector(`#${coloum1[i]}_you`).style.fontWeight = "700";
                    scoreCell9.onclick = (event) => {
                        scoring(9);
                    };
                    // activateScoreCell(coloum1, i);
                    break;
                case 10:
                    document.querySelector(`#${coloum1[i]}_you`).textContent = foak();
                    document.querySelector(`#${coloum1[i]}_you`).style.color = "#cba35c"  
                    document.querySelector(`#${coloum1[i]}_you`).style.fontWeight = "700";
                    scoreCell10.onclick = (event) => {
                        scoring(10);
                    };
                    // activateScoreCell(coloum1, i);
                    break;
                case 11:
                    document.querySelector(`#${coloum1[i]}_you`).textContent = f_h();
                    document.querySelector(`#${coloum1[i]}_you`).style.color = "#cba35c"  
                    document.querySelector(`#${coloum1[i]}_you`).style.fontWeight = "700";
                    scoreCell11.onclick = (event) => {
                        scoring(11);
                    };
                    // activateScoreCell(coloum1, i);
                    break;
                case 12:
                    document.querySelector(`#${coloum1[i]}_you`).textContent = s_s();
                    document.querySelector(`#${coloum1[i]}_you`).style.color = "#cba35c"  
                    document.querySelector(`#${coloum1[i]}_you`).style.fontWeight = "700";
                    scoreCell12.onclick = (event) => {
                        scoring(12);
                    };
                    // activateScoreCell(coloum1, i);
                    break;
                case 13:
                    document.querySelector(`#${coloum1[i]}_you`).textContent = l_s();
                    document.querySelector(`#${coloum1[i]}_you`).style.color = "#cba35c"  
                    document.querySelector(`#${coloum1[i]}_you`).style.fontWeight = "700";
                    scoreCell13.onclick = (event) => {
                        scoring(13);
                    };
                    // activateScoreCell(coloum1, i);
                    break;
                case 14:
                    document.querySelector(`#${coloum1[i]}_you`).textContent = chance();
                    document.querySelector(`#${coloum1[i]}_you`).style.color = "#cba35c"  
                    document.querySelector(`#${coloum1[i]}_you`).style.fontWeight = "700";
                    scoreCell14.onclick = (event) => {
                        scoring(14);
                    };
                    // activateScoreCell(coloum1, i);
                    break;
                case 15:
                    document.querySelector(`#${coloum1[i]}_you`).textContent = yahtzee();
                    document.querySelector(`#${coloum1[i]}_you`).style.color = "#cba35c"  
                    document.querySelector(`#${coloum1[i]}_you`).style.fontWeight = "700";
                    scoreCell15.onclick = (event) => {
                        scoring(15);
                    };
                    // activateScoreCell(coloum1, i);
                    break;
            }
            
        }
    }

    // console.dir(rollButton);
    // console.dir(rollButton.onclick);
    
}
async function scoring (i) {
    userScore[i] = Number(document.querySelector(`#${coloum1[i]}_you`).textContent);
    userScoredList[i] = 1;

    // Updatinfg Sum & Total
    document.querySelector(`#${coloum1[8]}_you`).textContent = sum();
    document.querySelector(`#${coloum1[7]}_you`).textContent = bonus();
    document.querySelector(`#${coloum1[16]}_you`).textContent = totalScore();
    
    
    console.log("User's Score List :-", userScore);
    document.querySelector(`#${coloum1[i]}_you`).style.color = "#754e1a"
    document.querySelector(`#${coloum1[i]}_you`).style.fontWeight = "400";

    
    hideEmptyScores();
    deactivateScoreCell();
    // reservedDice = [0, 0, 0, 0, 0,];
    // reservedDiceBot = [ 0, 0, 0, 0, 0 ];

    if ( I_i == 1 || I_i == 2 ) {
        rollBtnPressed = true;
        rollButton.onclick = null;
        rollButton.style.border = "0.4rem solid #cba35c";
        rollButton.style.backgroundColor = "rgba(248, 225, 183, 0.7)";
        rollButton.style.color = "#5d3e14";
        document.querySelector("#roll_dice").style.transition = "transform 0s ";
        document.querySelector("#roll_dice").style.transform = "";
    }

    await singleRoundBot();

    // To stop playing after last Round
    if ( I == rounds ) {
        rollBtnPressed = true;
        rollButton.onclick = null;
        rollButton.style.border = "0.4rem solid #cba35c";
        rollButton.style.backgroundColor = "rgba(248, 225, 183, 0.7)";
        rollButton.style.color = "#5d3e14";
        document.querySelector("#roll_dice").style.transition = "transform 0s ";
        document.querySelector("#roll_dice").style.transform = "";
        
    }

    // dimBotWhileInactive();
    // brightenUserWhileActive();

    // To start Pupup effect
    if ( I != rounds ) {  // To block popup rolling button at last round
        rollBtnPressed = false;
    }

    // To reset Roll button for next round
    if ( I < rounds ){
        dynamicRollBtn(I_i);
        rollButton.onclick = clickRollBtn;
        rollButton.style.border = "";
        rollButton.style.backgroundColor = "";
        rollButton.style.color = "";
    }
    // console.log("Round - ", I);

    // Preparing for next round
    I_i = 0;
    reservedDice = [0, 0, 0, 0, 0,];
    // reservedDiceBot = [ 0, 0, 0, 0, 0 ];
    // temp = [ 8, 8, 8, 8, 8 ];
    // resetDiceColours();
    hideEmptyScores();

    // To decorate console window in browser
    console.log(" ");
    console.log("******************************");

    if( I == rounds ) {
        await sleep(1000);
        showWinner();
    }
}



function activateReservingDice() {
    dice1.onclick = (event) => {
        if ( I_i == 1 || I_i == 2 ) {
            if ( reservedDice[0] == 0 ) {
                reservedDice[0] = 1;
                // temp[0] = diceReadings[0];
                dice1.style.border = `7px solid${fDiceBaseBorder}`; 
                dice1.style.color = fDiceIcon;
            } else {
                reservedDice[0] = 0;
                // temp[0] = diceReadings[0];
                dice1.style.border = `7px solid ${diceBaseBorder}`; 
                dice1.style.color = diceIcon;
            }
        }
    };
    dice2.onclick = (event) => {
        if ( I_i == 1 || I_i == 2 ) {
            if ( reservedDice[1] == 0 ) {
                reservedDice[1] = 1;
                // temp[1] = diceReadings[1];
                dice2.style.border = `7px solid${fDiceBaseBorder}`; 
                dice2.style.color = fDiceIcon;
            } else {
                reservedDice[1] = 0;
                // temp[1] = diceReadings[1];
                dice2.style.border = `7px solid ${diceBaseBorder}`; 
                dice2.style.color = diceIcon;
            }
        }
    };
    dice3.onclick = (event) => {
        if ( I_i == 1 || I_i == 2 ) {
            if ( reservedDice[2] == 0 ) {
                reservedDice[2] = 1;
                // temp[2] = diceReadings[2];
                dice3.style.border = `7px solid${fDiceBaseBorder}`; 
                dice3.style.color = fDiceIcon;
            } else {
                reservedDice[2] = 0;
                // temp[2] = diceReadings[2];
                dice3.style.border = `7px solid ${diceBaseBorder}`; 
                dice3.style.color = diceIcon;
            }
        }
    };
    dice4.onclick = (event) => {
        if ( I_i == 1 || I_i == 2 ) {
            if ( reservedDice[3] == 0 ) {
                reservedDice[3] = 1;
                // temp[3] = diceReadings[3];
                dice4.style.border = `7px solid${fDiceBaseBorder}`; 
                dice4.style.color = fDiceIcon;
            } else {
                reservedDice[3] = 0;
                // temp[3] = diceReadings[3];
                dice4.style.border = `7px solid ${diceBaseBorder}`; 
                dice4.style.color = diceIcon;
            }
        }
    };
    dice5.onclick = (event) => {
        if ( I_i == 1 || I_i == 2 ) {
            if ( reservedDice[4] == 0 ) {
                reservedDice[4] = 1;
                // temp[4] = diceReadings[4];
                dice5.style.border = `7px solid${fDiceBaseBorder}`; 
                dice5.style.color = fDiceIcon;
            } else {
                reservedDice[4] = 0;
                // temp[4] = diceReadings[4];
                dice5.style.border = `7px solid ${diceBaseBorder}`; 
                dice5.style.color = diceIcon;
            }
        }
    };
}
function resetDiceColours() {
    dice1.style.borderColor = diceBaseBorder; 
    dice1.style.color = diceIcon;
    dice2.style.borderColor = diceBaseBorder; 
    dice2.style.color = diceIcon;
    dice3.style.borderColor = diceBaseBorder; 
    dice3.style.color = diceIcon;
    dice4.style.borderColor = diceBaseBorder; 
    dice4.style.color = diceIcon;
    dice5.style.borderColor = diceBaseBorder; 
    dice5.style.color = diceIcon;
}

function deactivateScoreCell() {
    console.log("Deactivating table cells");
    scoreCell1.onclick = null;
    scoreCell2.onclick = null;
    scoreCell3.onclick = null;
    scoreCell4.onclick = null;
    scoreCell5.onclick = null;
    scoreCell6.onclick = null;
    scoreCell9.onclick = null;
    scoreCell10.onclick = null;
    scoreCell11.onclick = null;
    scoreCell12.onclick = null;
    scoreCell13.onclick = null;
    scoreCell14.onclick = null;
    scoreCell15.onclick = null;
}

// ================================--\
// ==================================\\
//                                  ||||
const ones = () => {
    let score = 0;
    for(let i = 0; i < diceReadings.length; i++) {
        if( diceReadings[i] == 1 ) {
            score = score + diceReadings[i];
        }
    }
    return score;
}  //                               ||||
const twos = () => {
    let score = 0;
    for(let i = 0; i < diceReadings.length; i++) {
        if( diceReadings[i] == 2 ) {
            score = score + diceReadings[i];
        }
    }
    return score;
}  //                               ||||
const threes = () => {
    let score = 0;
    for(let i = 0; i < diceReadings.length; i++) {
        if( diceReadings[i] == 3 ) {
            score = score + diceReadings[i];
        }
    }
    return score;
}  //                               ||||
const fours = () => {
    let score = 0;
    for(let i = 0; i < diceReadings.length; i++) {
        if( diceReadings[i] == 4 ) {
            score = score + diceReadings[i];
        }
    }
    return score;
}  //                               ||||
const fives = () => {
    let score = 0;
    for(let i = 0; i < diceReadings.length; i++) {
        if( diceReadings[i] == 5 ) {
            score = score + diceReadings[i];
        }
    }
    return score;
}  //                               ||||
const sixes = () => {
    let score = 0;
    for(let i = 0; i < diceReadings.length; i++) {
        if( diceReadings[i] == 6 ) {
            score = score + diceReadings[i];
        }
    }
    return score;
}  //                               ||||
const toak = () => {
    let score = 0;

    let one = 0;
    let two = 0;
    let three = 0;
    let four = 0;
    let five = 0;
    let six = 0;
    
    for( let i = 0; i < 5; i++) {
        switch(diceReadings[i]) {
            case 1: one++;
            break;
            case 2: two++;
            break;
            case 3: three++;
            break;
            case 4: four++;
            break;
            case 5: five++;
            break;
            case 6: six++;
            break;
        }
    }

    let a = 3;
    if ( one >= a || two >= a || three >= a || four >= a || five >= a || six >= a ) {
        for(let i = 0; i < 5; i++) {
            score = score + diceReadings[i];
        }
    } else {
        score = 0;
    }

    return score;
}  //                               ||||
const foak = () => {
    let score = 0;

    let one = 0;
    let two = 0;
    let three = 0;
    let four = 0;
    let five = 0;
    let six = 0;
    
    for( let i = 0; i < 5; i++) {
        switch(diceReadings[i]) {
            case 1: one++;
            break;
            case 2: two++;
            break;
            case 3: three++;
            break;
            case 4: four++;
            break;
            case 5: five++;
            break;
            case 6: six++;
            break;
        }
    }

    let a = 4;
    if ( one >= a || two >= a || three >= a || four >= a || five >= a || six >= a ) {
        for(let i = 0; i < 5; i++) {
            score = score + diceReadings[i];
        }
    } else {
        score = 0;
    }

    return score;
}  //                               ||||
const f_h = () => {
    let score = 0;
    
    let one = 0;
    let two = 0;
    let three = 0;
    let four = 0;
    let five = 0;
    let six = 0;
    
    for( let i = 0; i < 5; i++) {
        switch(diceReadings[i]) {
            case 1: one++;
            break;
            case 2: two++;
            break;
            case 3: three++;
            break;
            case 4: four++;
            break;
            case 5: five++;
            break;
            case 6: six++;
            break;
        }
    }

    let a = 3;
    let b = 2;
    if ( one == a || two == a || three == a || four == a || five == a || six == a ) {
        if ( one == b || two == b || three == b || four == b || five == b || six == b ) {
            score = 25;
        }
    }
    
    return score;
}  //                               ||||
const s_s = () => {
    let score = 0;

    let one = 0;
    let two = 0;
    let three = 0;
    let four = 0;
    let five = 0;
    let six = 0;
    
    for( let i = 0; i < 5; i++) {
        switch(diceReadings[i]) {
            case 1: one++;
            break;
            case 2: two++;
            break;
            case 3: three++;
            break;
            case 4: four++;
            break;
            case 5: five++;
            break;
            case 6: six++;
            break;
        }
    }

    let a = 1;
    if ( three >= a && ( ( one >= a && two >= a && four >= a ) || ( two >= a && four >= a && five >= a  ) || ( four >= a && five >= a && six >= a ) ) ) {
        score = 30;
    }

    return score;
}  //                               ||||
const l_s = () => {
    let score = 0;

    let one = 0;
    let two = 0;
    let three = 0;
    let four = 0;
    let five = 0;
    let six = 0;
    
    for( let i = 0; i < 5; i++) {
        switch(diceReadings[i]) {
            case 1: one++;
            break;
            case 2: two++;
            break;
            case 3: three++;
            break;
            case 4: four++;
            break;
            case 5: five++;
            break;
            case 6: six++;
            break;
        }
    }

    let a = 1;
    if ( ( one == a || six == a ) && ( two == a && three == a && four == a && five == a ) ) {
        score = 40;
    }

    return score;
}  //                               ||||
const chance = () => {
    let score = 0;
    for(let i = 0; i < 5; i++) {
        score = score + diceReadings[i];
    }
    return score;
}  //                               ||||
const yahtzee = () => {
    let score = 0;
    for(let i = 0; i < 4; i++) {
        if( diceReadings[i] == diceReadings[i + 1]  ) {
            if( i == 3 ) {
                score = 50;
            } else {
                score = 0;
            }
        } else {
            break;
        }
    }
    return score;
}  //                               ||||
   //                               ||||
const sum = () => {
    let score = 0;
    for(let i = 1; i <= 6; i++) {
        score = score + userScore[i];
    }
    userScore[7] = score;
    return score;
}  //                               ||||
const bonus = () => {
    if ( userScore[7] >= 63 ) {
        userScore[8] = 35;
        // userScoredList[7] = 1;
        // document.querySelector(`#${coloum1[7]}_you`).style.color = " #754e1a";
    }
    return userScore[8];
}  //                               ||||
const totalScore = () => {
    let total = 0;
    for(let i = 1; i <= 15; i++) {
        if ( i == 7 ) {
            i = 8;
        }
        total = total + userScore[i];
    }
    userScore[16] = total;
    return total;
}  //                               ||||
//====================================//
// =================================__/




// ====== Dynamic Dice Transform ===================
//                                                ||
function dynamicDice() {
    for(let i = 0; i < diceReadings.length; i++) {
        if( reservedDice[i] == 0 ) {
            let diceBase = document.querySelector(`#dice_base_${numberToWord(i+1)}`);
            diceBase.style.transition = "transform 1s ease-in-out";
            diceBase.style.transform = `translateY(-${randomPosition()}vh) rotate(${360*x_User[i]}deg) `; 
            x_User[i]++;
            x_Bot[i]++;
        }
    }   
}    //                                           ||
function randomPosition() {
    let distance = Math.floor(Math.random() * 35) + 1;
    while (distance - y_user < 3 && distance - y_user > -3) {
        distance = Math.floor(Math.random() * 35) + 1;
    }
    y_user = distance;
    return y_user;
}    //                                           ||
function realignDiceForUser() {
    for(let i = 0; i < diceReadings.length; i++) {
        let diceBase = document.querySelector(`#dice_base_${numberToWord(i+1)}`);
        diceBase.style.transition = "transform 1s ease-in-out";
        diceBase.style.transform = `translateY(-${0}vh) rotate(${360*x_User[i]}deg)`; 
        x_User[i]++;
        x_Bot[i]++;
    }
}    //                                           ||
// =================================================


// ===== Dynamic Dice Transform (Bot Version) ======
//                                                ||
function dynamicDiceBot() {
    for(let i = 0; i < diceReadings.length; i++) {
        if( reservedDiceBot[i] == 0 ) {
            let diceBase = document.querySelector(`#dice_base_${numberToWord(i+1)}`);
            diceBase.style.transition = "transform 1s ease-in-out";
            diceBase.style.transform = `translateY(-${randomPosition()}vh) rotate(${360*x_Bot[i]}deg) `; 
            x_User[i]++;
            x_Bot[i]++;
        }
    }   
}    //                                           ||
function randomPositionBot() {
    let distance = Math.floor(Math.random() * 35) + 1;
    while (distance - y_Bot < 3 && distance - y_Bot > -3) {
        distance = Math.floor(Math.random() * 35) + 1;
    }
    y_Bot = distance;
    return y_Bot;
}    //                                           ||
function realignDiceForBot() {
    for(let i = 0; i < diceReadings.length; i++) {
        let diceBase = document.querySelector(`#dice_base_${numberToWord(i+1)}`);
        diceBase.style.transition = "transform 1s ease-in-out";
        diceBase.style.transform = `translateY(-${35}vh) rotate(${360*x_Bot[i]}deg) `; 
        x_User[i]++;
        x_Bot[i]++;
    }
}    //                                           ||
// =================================================




// ====== Dynamic Roll button function ( Zipped  Version) ===========
//                                                                 ||
async function dynamicRollBtn (I_i, popUp = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!rollBtnPressed) {
                document.querySelector("#roll_dice").style.transform = "scale(1.1)";
            } 
            resolve("success");
        }, ms);
    });
}, popDown = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!rollBtnPressed) {
                document.querySelector("#roll_dice").style.transform = "scale(1.0)";
            } 
            resolve("success");
        }, ms);
    });
}) {
    console.log("starting popup funuction.  I_i = ", I_i);
    let delay = 1000;
    document.querySelector("#roll_dice").style.transition = "transform 1s ease-in-out"; 

    let count = 1;
    while(!rollBtnPressed) {
        if (!rollBtnPressed && count == 1) { // To remove the delay of startin popup
            await popUp(0);
            count++;
        } else if (!rollBtnPressed && count == 2 ) {
            await popUp(1000);
        }
        // console.log("popUp");
        if (!rollBtnPressed) {
            await popDown(1000);
        }
    }
}   //                                                             ||
// ==================================================================



function updatingMessage (msg) {
    message.textContent = msg;
    message.style.fontWeight = "400";
}
function showWinner() {
    let primaryMessage = document.querySelector("#primary_msg");
    let secondaryMessage = document.querySelector("#secondary_msg");
    if ( userScore[16] > botScore[16] ) {
        primaryMessage.textContent = "Congratulations!";
        secondaryMessage.textContent = "Luck and skill were on your side. You are the Yahtzee champion";
    } else if ( userScore[16] < botScore[16] ) {
        primaryMessage.textContent = "Better luck next time!";
        secondaryMessage.textContent = "The V-Deva outplayed you this time, but don't give up-challenge it and claim your victory!";
    }
    
    document.querySelector("#final_scores_user").textContent = userScore[16];
    document.querySelector("#final_scores_bot").textContent = botScore[16];
    document.querySelector(`#winner_card_base`).style.visibility = "visible";

    playAgainBtn.onclick = clickPlayAgainBtn;
}
function clickPlayAgainBtn(){
    playAgainBtn.onclick = null;

    let diceReadings = [1, 1, 1, 1, 1];

    I = 0;
    I_i = 0;
    rollBtnPressed = false;
    y_user = 0; // for translate dice
    y_Bot = 0; // for translate dice
    delay = 0; // NOT important just used for set delay 

    botScore = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
    userScore = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
    botScoredList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
    userScoredList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
    reservedDice = [0, 0, 0, 0, 0,];
    reservedDiceBot = [ 0, 0, 0, 0, 0 ];
    temp = [0, 0, 0, 0, 0,];

    preparingGame();
    //re-align dice for new game
    for(let i = 0; i < diceReadings.length; i++) {
        let diceBase = document.querySelector(`#dice_base_${numberToWord(i+1)}`);
        diceBase.style.transition = "transform 0s ease-in-out";
        diceBase.style.transform = `translateY(-${0}vh) rotate(${360*x_User[i]}deg)`; 
        x_User[i]++;
        x_Bot[i]++;
    }
    // realignDiceForUser();
    rollButton.onclick = clickRollBtn;
    rollButton.style.border = "";
    rollButton.style.backgroundColor = "";
    rollButton.style.color = "";

    document.querySelector(`#winner_card_base`).style.visibility = "hidden";
    console.log("Game Ready");
}



async function singleRoundBot () {
    let I_i_user = I_i;
    I_i = 0;
    updatingMessage(`Now it's V-Deva's turn`);
    resetDiceColours();
    realignDiceForBot();
    await sleep(2000);
    dimUserWhileInactive();
    brightenBotWhileActive();

    clickRollBtnBot();
    await sleep(1000);
    if ( RA_or_Score_1() == 'r' ) {
        await reservingDiceBot();
        clickRollBtnBot();
        await sleep(1000);
        if ( RA_or_Score_2() == 'r' ) {
            await reservingDiceBot();
            clickRollBtnBot();
            await sleep(1000);
            let scoreCategory = choosing_S_C();
            scoringBot(scoreCategory);
            
        } else {
            let scoreCategory = choosing_S_C();
            scoringBot(scoreCategory);
        }
        
    } else {
        let scoreCategory = choosing_S_C();
        scoringBot(scoreCategory);
    }
    // console.log(botScore);

    // Preparing for next round
    if( I != rounds ) {
        realignDiceForUser();
        await sleep(1000);
    }
    dimBotWhileInactive();
    brightenUserWhileActive();
    updatingMessage(`Now it's your turn again`);
    I_i = I_i_user;

    // resolve("success");
}
function dimBotWhileInactive() {
    Bot.style.backgroundColor = " #f8e1b780";
    Bot.style.borderColor = " #8b631c";
}
function brightenBotWhileActive() {
    Bot.style.backgroundColor = "";
    Bot.style.borderColor = "";
}
function clickRollBtnBot () {
    I_i++;

    rollingDiceBot();
    dynamicDiceBot();
    console.log(diceReadings);
    
    scorePreviewBot();
    reservedDiceBot = [ 0, 0, 0, 0, 0 ];
    
}
function rollingDiceBot() {
    for(let i = 0; i < diceReadings.length; i++) {
        if( reservedDiceBot[i] != diceReadings[i] ) {
            diceReadings[i] = random_number();
        }
    }
    displayDice();
}
function scorePreviewBot() {
    // let coloum1 = ["category", "ones", "twos", "threes", "fours", "fives", "sixes", "bonus", "sum", "toak", "foak", "f_h", "s_s", "l_s", "chance", "yahtzee", "total_score"];

    for(let i = 1; i < 16; i++) {
        if(i == 7 ) {
            i = 9;
        }

        if ( botScoredList[i] == 0 ) {
            switch(i) {
                case 1:
                    document.querySelector(`#${coloum1[i]}_bot`).textContent = ones();
                    document.querySelector(`#${coloum1[i]}_bot`).style.color = "#cba35c"  
                    document.querySelector(`#${coloum1[i]}_bot`).style.fontWeight = "700";
                    // scoreCell1.onclick = null;
                    // activateScoreCell(coloum1, i);
                    break;
                case 2:
                    document.querySelector(`#${coloum1[i]}_bot`).textContent = twos();
                    document.querySelector(`#${coloum1[i]}_bot`).style.color = "#cba35c"  
                    document.querySelector(`#${coloum1[i]}_bot`).style.fontWeight = "700";
                    // scoreCell2.onclick = null;
                    // activateScoreCell(coloum1, i);
                    break;
                case 3:
                    document.querySelector(`#${coloum1[i]}_bot`).textContent = threes();
                    document.querySelector(`#${coloum1[i]}_bot`).style.color = "#cba35c"  
                    document.querySelector(`#${coloum1[i]}_bot`).style.fontWeight = "700";
                    // scoreCell3.onclick = null;
                    // activateScoreCell(coloum1, i);
                    break;
                case 4:
                    document.querySelector(`#${coloum1[i]}_bot`).textContent = fours();
                    document.querySelector(`#${coloum1[i]}_bot`).style.color = "#cba35c"  
                    document.querySelector(`#${coloum1[i]}_bot`).style.fontWeight = "700";
                    // scoreCell4.onclick = null;
                    // activateScoreCell(coloum1, i);
                    break;
                case 5:
                    document.querySelector(`#${coloum1[i]}_bot`).textContent = fives();
                    document.querySelector(`#${coloum1[i]}_bot`).style.color = "#cba35c"  
                    document.querySelector(`#${coloum1[i]}_bot`).style.fontWeight = "700";
                    // scoreCell5.onclick = null;
                    // activateScoreCell(coloum1, i);
                    break;
                case 6:
                    document.querySelector(`#${coloum1[i]}_bot`).textContent = sixes();
                    document.querySelector(`#${coloum1[i]}_bot`).style.color = "#cba35c"  
                    document.querySelector(`#${coloum1[i]}_bot`).style.fontWeight = "700";
                    // scoreCell6.onclick = null;
                    // activateScoreCell(coloum1, i);
                    break;
                case 9:
                    document.querySelector(`#${coloum1[i]}_bot`).textContent = toak();
                    document.querySelector(`#${coloum1[i]}_bot`).style.color = "#cba35c"  
                    document.querySelector(`#${coloum1[i]}_bot`).style.fontWeight = "700";
                    // activateScoreCell(coloum1, i);
                    break;
                case 10:
                    document.querySelector(`#${coloum1[i]}_bot`).textContent = foak();
                    document.querySelector(`#${coloum1[i]}_bot`).style.color = "#cba35c"  
                    document.querySelector(`#${coloum1[i]}_bot`).style.fontWeight = "700";
                    // activateScoreCell(coloum1, i);
                    break;
                case 11:
                    document.querySelector(`#${coloum1[i]}_bot`).textContent = f_h();
                    document.querySelector(`#${coloum1[i]}_bot`).style.color = "#cba35c"  
                    document.querySelector(`#${coloum1[i]}_bot`).style.fontWeight = "700";
                    // activateScoreCell(coloum1, i);
                    break;
                case 12:
                    document.querySelector(`#${coloum1[i]}_bot`).textContent = s_s();
                    document.querySelector(`#${coloum1[i]}_bot`).style.color = "#cba35c"  
                    document.querySelector(`#${coloum1[i]}_bot`).style.fontWeight = "700";
                    // activateScoreCell(coloum1, i);
                    break;
                case 13:
                    document.querySelector(`#${coloum1[i]}_bot`).textContent = l_s();
                    document.querySelector(`#${coloum1[i]}_bot`).style.color = "#cba35c"  
                    document.querySelector(`#${coloum1[i]}_bot`).style.fontWeight = "700";
                    // activateScoreCell(coloum1, i);
                    break;
                case 14:
                    document.querySelector(`#${coloum1[i]}_bot`).textContent = chance();
                    document.querySelector(`#${coloum1[i]}_bot`).style.color = "#cba35c"  
                    document.querySelector(`#${coloum1[i]}_bot`).style.fontWeight = "700";
                    // activateScoreCell(coloum1, i);
                    break;
                case 15:
                    document.querySelector(`#${coloum1[i]}_bot`).textContent = yahtzee();
                    document.querySelector(`#${coloum1[i]}_bot`).style.color = "#cba35c"  
                    document.querySelector(`#${coloum1[i]}_bot`).style.fontWeight = "700";
                    // activateScoreCell(coloum1, i);
                    break;
            }
            
        }
    }

    // console.dir(rollButton);
    // console.dir(rollButton.onclick);
    
}
function RA_or_Score_1() {
    let decision = 'r';
    let a = 0;
    let b = 0;

    let one = 0;
    let two = 0;
    let three = 0;
    let four = 0;
    let five = 0;
    let six = 0;
    
    for( let i = 0; i < 5; i++) {
        switch(diceReadings[i]) {
            case 1: one++;
            break;
            case 2: two++;
            break;
            case 3: three++;
            break;
            case 4: four++;
            break;
            case 5: five++;
            break;
            case 6: six++;
            break;
        }
    }

    //check for yahtzee
    a = 5;
    if ( one == a || two == a || three == a || four == a || five == a || six == a ) {
        decision = 's';
    }

    //check for large straight
    a = 1;
    if ( botScoredList[13] == 0 && ( ( one == a || six == a ) && ( two == a && three == a && four == a && five == a ) ) ) {
        decision = 's';
    }

    //check for small straight. if already scored to large straight
    // This logic may not be usefull
    a = 1;
    if ( botScoredList[13] != 0 && botScoredList[12] == 0 && ( three >= a && ( ( one >= a && two >= a && four >= a ) || ( two >= a && four >= a && five >= a  ) || ( four >= a && five >= a && six >= a ) ) ) ) {
        decision = 's';
    }

    //check for full house
    a = 3;
    b = 2;
    if (botScoredList[11] == 0 && ( one == a || two == a || three == a || four == a || five == a || six == a ) && ( one == b || two == b || three == b || four == b || five == b || six == b ) ) {
        decision = 's';
    }

    return decision;
}
function RA_or_Score_2() {
    let decision = 'r';
    let a = 0;
    let b = 0;

    let one = 0;
    let two = 0;
    let three = 0;
    let four = 0;
    let five = 0;
    let six = 0;
    
    for( let i = 0; i < 5; i++) {
        switch(diceReadings[i]) {
            case 1: one++;
            break;
            case 2: two++;
            break;
            case 3: three++;
            break;
            case 4: four++;
            break;
            case 5: five++;
            break;
            case 6: six++;
            break;
        }
    }

    //check for yahtzee
    a = 5;
    if ( one == a || two == a || three == a || four == a || five == a || six == a ) {
        decision = 's';
    }

    //check for large straight
    a = 1;
    if ( botScoredList[13] == 0 && ( ( one == a || six == a ) && ( two == a && three == a && four == a && five == a ) ) ) {
        decision = 's';
    }

    //check for small straight. if already scored to large straight
    // This logic may not be usefull
    a = 1;
    if ( botScoredList[13] != 0 && botScoredList[12] == 0 && ( three >= a && ( ( one >= a && two >= a && four >= a ) || ( two >= a && four >= a && five >= a  ) || ( four >= a && five >= a && six >= a ) ) ) ) {
        decision = 's';
    }

    //check for full house
    a = 3;
    b = 2;
    if (botScoredList[11] == 0 && ( one == a || two == a || three == a || four == a || five == a || six == a ) && ( one == b || two == b || three == b || four == b || five == b || six == b ) ) {
        decision = 's';
    }

    return decision;
}
function activateReservingDiceBot(p_d) {
    switch(p_d) {
        case 0 : 
            dice1.style.border = `7px solid${fDiceBaseBorder}`; 
            dice1.style.color = fDiceIcon;
        break;
        case 1 : 
            dice2.style.border = `7px solid${fDiceBaseBorder}`; 
            dice2.style.color = fDiceIcon;
        break;
        case 2 : 
            dice3.style.border = `7px solid${fDiceBaseBorder}`; 
            dice3.style.color = fDiceIcon;
        break;
        case 3 : 
            dice4.style.border = `7px solid${fDiceBaseBorder}`; 
            dice4.style.color = fDiceIcon;
        break;
        case 4 : 
            dice5.style.border = `7px solid${fDiceBaseBorder}`; 
            dice5.style.color = fDiceIcon;
        break;
    }
}
async function reservingDiceBot() {
    let p_d = 0; // position of the the dice that is going to be reverved
    // assigning default values for array
    for(let i = 0; i < 5; i++){
        temp[i] = 0;
    }
    resetDiceColours();


    let i5 = 0;
    while (  i5 < 4 ) {
        p_d = choose_D_for_R(i5, p_d);
        if ( p_d == 13 ) {
            break;
        } else {
            temp[i5] = diceReadings[p_d];
            activateReservingDiceBot(p_d);
            switch(p_d) {
                case 0 : reservedDiceBot[0] = diceReadings[0];
                break;
                case 1 : reservedDiceBot[1] = diceReadings[1];
                break;
                case 2 : reservedDiceBot[2] = diceReadings[2];
                break;
                case 3 : reservedDiceBot[3] = diceReadings[3];
                break;
                case 4 : reservedDiceBot[4] = diceReadings[4];
                break;
            }
        }
        i5++;
    }
    await sleep(1000);
    return i5;
}
function choose_D_for_R(i5, p_d) {
    //let rs = 13; // rs = reserving position

    if ( i5 == 0 ) {
        p_d = -1;
    }

    let one = 0;
    let two = 0;
    let three = 0;
    let four = 0;
    let five = 0;
    let six = 0;
    
    for( let i = 0; i < 5; i++) {
        switch(diceReadings[i]) {
            case 1: one++;
            break;
            case 2: two++;
            break;
            case 3: three++;
            break;
            case 4: four++;
            break;
            case 5: five++;
            break;
            case 6: six++;
            break;
        }
    }

    let a = 4;
    let b = 3;
    let c = 2;
    let d = 1;
    if ( one == a || two == a || three == a || four == a || five == a || six == a ) {
        if ( i5 == 4 ) {
            p_d = 13;
        } else if ( one == a && ( botScoredList[1] == 0 || botScoredList[10] == 0 || botScoredList[15] == 0 ) ) {
            let i = p_d + 1;
            while ( i < 5 ){
                if (diceReadings[i] == 1){
                    p_d = i;
                    break;
                }
                i++;
            }    
        } else if ( two == a && ( botScoredList[2] == 0 || botScoredList[10] == 0 || botScoredList[15] == 0 ) ) {
            let i = p_d + 1;
            while ( i < 5 ){
                if (diceReadings[i] == 2){
                    p_d = i;
                    break;
                }
                i++;
            }    
        } else if ( three == a && ( botScoredList[3] == 0 || botScoredList[10] == 0 || botScoredList[15] == 0 ) ) {
            let i = p_d + 1;
            while ( i < 5 ){
                if (diceReadings[i] == 3){
                    p_d = i;
                    break;
                }
                i++;
            }    
        } else if ( four == a && ( botScoredList[4] == 0 || botScoredList[10] == 0 || botScoredList[15] == 0 ) ) {
            let i = p_d + 1;
            while ( i < 5 ){
                if (diceReadings[i] == 4){
                    p_d = i;
                    break;
                }
                i++;
            }    
        } else if ( five == a && ( botScoredList[5] == 0 || botScoredList[10] == 0 || botScoredList[15] == 0 ) ) {
            let i = p_d + 1;
            while ( i < 5 ){
                if (diceReadings[i] == 5){
                    p_d = i;
                    break;
                }
                i++;
            }    
        } else if ( six == a && ( botScoredList[6] == 0 || botScoredList[10] == 0 || botScoredList[15] == 0 ) ) {
            let i = p_d + 1;
            while ( i < 5 ){
                if (diceReadings[i] == 6){
                    p_d = i;
                    break;
                }
                i++;
            }    
        } else {
            p_d = 13;
        }

                    
    } else if ( I_i == 1 ) {
        if ( botScoredList[13] == 0 && ( three >= d && ( ( one >= d && two >= d && four >= d ) || ( two >= d && four >= d && five >= d  ) || ( four >= d && five >= d && six >= d ) ) ) ) {
            if ( i5 == 4 ) {
                p_d = 13;
            } else if ( temp[0] != 3 && temp[1] != 3 && temp[2] != 3 ) {
                for(let i = 0; i < 5; i++) {
                    if ( diceReadings[i] == 3 ) {
                        p_d = i;
                        break;
                    }
                }
            } else if ( one >= d && two >= d && four >= d ) {
                if ( temp[0] != 1 && temp[1] != 1 && temp[2] != 1 ) {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 1 ) {
                            p_d = i;
                            break;
                        }
                    }
                } else if ( temp[0] != 2 && temp[1] != 2 && temp[2] != 2 ) {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 2 ) {
                            p_d = i;
                            break;
                        }
                    }
                } else {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 4 ) {
                            p_d = i;
                            break;
                        }
                    }
                }
            } else if (  two >= d && four >= d && five >= d ) {
                if ( temp[0] != 2 && temp[1] != 2 && temp[2] != 2 ) {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 2 ) {
                            p_d = i;
                            break;
                        }
                    }
                } else if ( temp[0] != 4 && temp[1] != 4 && temp[2] != 4 ) {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 4 ) {
                            p_d = i;
                            break;
                        }
                    }
                } else {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 5 ) {
                            p_d = i;
                            break;
                        }
                    }
                }
            } else if ( four >= d && five >= d && six >= d ) {
                if ( temp[0] != 4 && temp[1] != 4 && temp[2] != 4 ) {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 4 ) {
                            p_d = i;
                            break;
                        }
                    }
                } else if ( temp[0] != 5 && temp[1] != 5 && temp[2] != 5 ) {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 5 ) {
                            p_d = i;
                            break;
                        }
                    }
                } else {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 6 ) {
                            p_d = i;
                            break;
                        }
                    }
                }
            }                   
        } else if ( ( botScoredList[12] == 0 || botScoredList[13] == 0 ) && I >= 9 && ( ( one >= d && two >= d && three >= d ) || ( two >= d && three >= d && four >= d ) || ( three >= d && four >= d && five >= d  ) || ( four >= d && five >= d && six >= d ) ) ) {
            if ( i5 == 3 ) {
                p_d = 13;
            } else if ( one >= d && two >= d && three >= d ) {
                if ( temp[0] != 1 && temp[1] != 1 && temp[2] != 1 ) {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 1 ) {
                            p_d = i;
                            break;
                        }
                    }
                } else if ( temp[0] != 2 && temp[1] != 2 && temp[2] != 2 ) {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 2 ) {
                            p_d = i;
                            break;
                        }
                    }
                } else {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 3 ) {
                            p_d = i;
                            break;
                        }
                    }
                }
            } else if (  two >= d && three >= d && four >= d ) {
                if ( temp[0] != 2 && temp[1] != 2 && temp[2] != 2 ) {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 2 ) {
                            p_d = i;
                            break;
                        }
                    }
                } else if ( temp[0] != 3 && temp[1] != 3 && temp[2] != 3 ) {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 3 ) {
                            p_d = i;
                            break;
                        }
                    }
                } else {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 4 ) {
                            p_d = i;
                            break;
                        }
                    }
                }
            } else if (  three >= d && four >= d && five >= d ) {
                if ( temp[0] != 3 && temp[1] != 3 && temp[2] != 3 ) {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 3 ) {
                            p_d = i;
                            break;
                        }
                    }
                } else if ( temp[0] != 4 && temp[1] != 4 && temp[2] != 4 ) {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 4 ) {
                            p_d = i;
                            break;
                        }
                    }
                } else {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 5 ) {
                            p_d = i;
                            break;
                        }
                    }
                }
            } else if ( four >= d && five >= d && six >= d ) {
                if ( temp[0] != 4 && temp[1] != 4 && temp[2] != 4 ) {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 4 ) {
                            p_d = i;
                            break;
                        }
                    }
                } else if ( temp[0] != 5 && temp[1] != 5 && temp[2] != 5 ) {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 5 ) {
                            p_d = i;
                            break;
                        }
                    }
                } else {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 6 ) {
                            p_d = i;
                            break;
                        }
                    }
                }
            } else {
                p_d = 13;
            }                   
        } else if ( four == b || five == b || six == b ){
            if ( i5 == 3 ) {
                p_d = 13;
            } else if ( six == b &&  ( botScoredList[6] == 0 || botScoredList[9] == 0 || botScoredList[10] == 0 || botScoredList[15] == 0 ) ) {
                let i = p_d + 1;
                while ( i < 5 ){
                    if (diceReadings[i] == 6){
                        p_d = i;
                        break;
                    }
                    i++;
                }    
            } else if ( five == b && ( botScoredList[5] == 0 || botScoredList[9] == 0 || botScoredList[10] == 0 || botScoredList[15] == 0 ) ) {
                let i = p_d + 1;
                while ( i < 5 ){
                    if (diceReadings[i] == 5){
                        p_d = i;
                        break;
                    }
                    i++;
                }
            } else if ( four == b && ( botScoredList[4] == 0 || botScoredList[9] == 0 || botScoredList[10] == 0 || botScoredList[15] == 0 ) ) {
                let i = p_d + 1;
                while ( i < 5 ){
                    if (diceReadings[i] == 4){
                        p_d = i;
                        break;
                    }
                    i++;
                }    
            } else {
                p_d = 13;
            }
        } else if ( four == c || five == c || six == c ) {
            if ( i5 == 2 ) {
                p_d = 13;
            } else if ( six == c &&  ( botScoredList[6] == 0 || botScoredList[9] == 0 || botScoredList[10] == 0 || botScoredList[15] == 0 ) ) {
                let i = p_d + 1;
                while ( i < 5 ){
                    if (diceReadings[i] == 6){
                        p_d = i;
                        break;
                    }
                    i++;
                }    
            } else if ( five == c && ( botScoredList[5] == 0 || botScoredList[9] == 0 || botScoredList[10] == 0 || botScoredList[15] == 0 ) ) {
                let i = p_d + 1;
                while ( i < 5 ){
                    if (diceReadings[i] == 5){
                        p_d = i;
                        break;
                    }
                    i++;
                }
            } else if ( four == c && ( botScoredList[4] == 0 || botScoredList[9] == 0 || botScoredList[10] == 0 || botScoredList[15] == 0 ) ) {
                let i = p_d + 1;
                while ( i < 5 ){
                    if (diceReadings[i] == 4){
                        p_d = i;
                        break;
                    }
                    i++;
                }    
            } else {
                p_d = 13;
            }

        } else if ( one == b || two == b || three == b ){
            if ( i5 == 3 ) {
                p_d = 13;
            } else if ( three == b && ( botScoredList[3] == 0 || botScoredList[9] == 0 || botScoredList[10] == 0 || botScoredList[15] == 0 ) ) {
                let i = p_d + 1;
                while ( i < 5 ){
                    if (diceReadings[i] == 3){
                        p_d = i;
                        break;
                    }
                    i++;
                }    
            } else if ( two == b && ( botScoredList[2] == 0 || botScoredList[9] == 0 || botScoredList[10] == 0 || botScoredList[15] == 0 )  ) {
                let i = p_d + 1;
                while ( i < 5 ){
                    if (diceReadings[i] == 2){
                        p_d = i;
                        break;
                    }
                    i++;
                }    
            } else if ( one == b && ( botScoredList[1] == 0 || botScoredList[9] == 0 || botScoredList[10] == 0 || botScoredList[15] == 0 ) ){
                let i = p_d + 1;
                while ( i < 5 ){
                    if (diceReadings[i] == 1){
                        p_d = i;
                        break;
                    }
                    i++;
                }
            } else {
                p_d = 13;
            } 
        } else if ( one == c || two == c || three == c ) {
            if ( i5 == 2 ) {
                p_d = 13;
            } else if ( three == c && ( botScoredList[3] == 0 || botScoredList[9] == 0 || botScoredList[10] == 0 || botScoredList[15] == 0 ) ) {
                let i = p_d + 1;
                while ( i < 5 ){
                    if (diceReadings[i] == 3){
                        p_d = i;
                        break;
                    }
                    i++;
                }    
            } else if ( two == c && ( botScoredList[2] == 0 || botScoredList[9] == 0 || botScoredList[10] == 0 || botScoredList[15] == 0 )  ) {
                let i = p_d + 1;
                while ( i < 5 ){
                    if (diceReadings[i] == 2){
                        p_d = i;
                        break;
                    }
                    i++;
                }    
            } else if ( one == c && ( botScoredList[1] == 0 || botScoredList[9] == 0 || botScoredList[10] == 0 || botScoredList[15] == 0 )  ) {
                let i = p_d + 1;
                while ( i < 5 ){
                    if (diceReadings[i] == 1){
                        p_d = i;
                        break;
                    }
                    i++;
                }    
            } else {
                p_d = 13;
            }        
        } else {
            p_d = 13;
        }
    } else if ( I_i == 2 ) {
        if ( botScoredList[13] == 0 && botScoredList[13] == 0 && ( three >= d && ( ( one >= d && two >= d && four >= d ) || ( two >= d && four >= d && five >= d  ) || ( four >= d && five >= d && six >= d ) ) ) ) {
            if ( i5 == 4 ) {
                p_d = 13;
            } else if ( temp[0] != 3 && temp[1] != 3 && temp[2] != 3 ) {
                for(let i = 0; i < 5; i++) {
                    if ( diceReadings[i] == 3 ) {
                        p_d = i;
                        break;
                    }
                }
            } else if ( one >= d && two >= d && four >= d ) {
                if ( temp[0] != 1 && temp[1] != 1 && temp[2] != 1 ) {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 1 ) {
                            p_d = i;
                            break;
                        }
                    }
                } else if ( temp[0] != 2 && temp[1] != 2 && temp[2] != 2 ) {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 2 ) {
                            p_d = i;
                            break;
                        }
                    }
                } else {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 4 ) {
                            p_d = i;
                            break;
                        }
                    }
                }
            } else if (  two >= d && four >= d && five >= d ) {
                if ( temp[0] != 2 && temp[1] != 2 && temp[2] != 2 ) {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 2 ) {
                            p_d = i;
                            break;
                        }
                    }
                } else if ( temp[0] != 4 && temp[1] != 4 && temp[2] != 4 ) {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 4 ) {
                            p_d = i;
                            break;
                        }
                    }
                } else {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 5 ) {
                            p_d = i;
                            break;
                        }
                    }
                }
            } else if ( four >= d && five >= d && six >= d ) {
                if ( temp[0] != 4 && temp[1] != 4 && temp[2] != 4 ) {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 4 ) {
                            p_d = i;
                            break;
                        }
                    }
                } else if ( temp[0] != 5 && temp[1] != 5 && temp[2] != 5 ) {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 5 ) {
                            p_d = i;
                            break;
                        }
                    }
                } else {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 6 ) {
                            p_d = i;
                            break;
                        }
                    }
                }
            }                  
        } else if ( botScoredList[12] == 0 && ( botScoredList[12] == 0 || botScoredList[13] == 0 ) && I >= 9 && ( ( one >= d && two >= d && three >= d ) || ( two >= d && three >= d && four >= d ) || ( three >= d && four >= d && five >= d  ) || ( four >= d && five >= d && six >= d ) ) ) {
            if ( i5 == 3 ) {
                p_d = 13;
            } else if ( one >= d && two >= d && three >= d ) {
                if ( temp[0] != 1 && temp[1] != 1 && temp[2] != 1 ) {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 1 ) {
                            p_d = i;
                            break;
                        }
                    }
                } else if ( temp[0] != 2 && temp[1] != 2 && temp[2] != 2 ) {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 2 ) {
                            p_d = i;
                            break;
                        }
                    }
                } else {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 3 ) {
                            p_d = i;
                            break;
                        }
                    }
                }
            } else if (  two >= d && three >= d && four >= d ) {
                if ( temp[0] != 2 && temp[1] != 2 && temp[2] != 2 ) {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 2 ) {
                            p_d = i;
                            break;
                        }
                    }
                } else if ( temp[0] != 3 && temp[1] != 3 && temp[2] != 3 ) {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 3 ) {
                            p_d = i;
                            break;
                        }
                    }
                } else {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 4 ) {
                            p_d = i;
                            break;
                        }
                    }
                }
            } else if (  three >= d && four >= d && five >= d ) {
                if ( temp[0] != 3 && temp[1] != 3 && temp[2] != 3 ) {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 3 ) {
                            p_d = i;
                            break;
                        }
                    }
                } else if ( temp[0] != 4 && temp[1] != 4 && temp[2] != 4 ) {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 4 ) {
                            p_d = i;
                            break;
                        }
                    }
                } else {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 5 ) {
                            p_d = i;
                            break;
                        }
                    }
                }
            } else if ( four >= d && five >= d && six >= d ) {
                if ( temp[0] != 4 && temp[1] != 4 && temp[2] != 4 ) {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 4 ) {
                            p_d = i;
                            break;
                        }
                    }
                } else if ( temp[0] != 5 && temp[1] != 5 && temp[2] != 5 ) {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 5 ) {
                            p_d = i;
                            break;
                        }
                    }
                } else {
                    for(let i = 0; i < 5; i++) {
                        if ( diceReadings[i] == 6 ) {
                            p_d = i;
                            break;
                        }
                    }
                }
            } else {
                p_d = 13;
            }                 
        } else if ( one == b || two == b || three == b || four == b || five == b || six == b){
            if ( i5 == 3 ) {
                p_d = 13;
            } else if ( six == b &&  ( botScoredList[6] == 0 || botScoredList[9] == 0 || botScoredList[10] == 0 || botScoredList[15] == 0 ) ) {
                let i = p_d + 1;
                while ( i < 5 ){
                    if (diceReadings[i] == 6){
                        p_d = i;
                        break;
                    }
                    i++;
                }    
            } else if ( five == b && ( botScoredList[5] == 0 || botScoredList[9] == 0 || botScoredList[10] == 0 || botScoredList[15] == 0 ) ) {
                let i = p_d + 1;
                while ( i < 5 ){
                    if (diceReadings[i] == 5){
                        p_d = i;
                        break;
                    }
                    i++;
                }
            } else if ( four == b && ( botScoredList[4] == 0 || botScoredList[9] == 0 || botScoredList[10] == 0 || botScoredList[15] == 0 ) ) {
                let i = p_d + 1;
                while ( i < 5 ){
                    if (diceReadings[i] == 4){
                        p_d = i;
                        break;
                    }
                    i++;
                }    
            } else if ( three == b && ( botScoredList[3] == 0 || botScoredList[9] == 0 || botScoredList[10] == 0 || botScoredList[15] == 0 ) ) {
                let i = p_d + 1;
                while ( i < 5 ){
                    if (diceReadings[i] == 3){
                        p_d = i;
                        break;
                    }
                    i++;
                }    
            } else if ( two == b && ( botScoredList[2] == 0 || botScoredList[9] == 0 || botScoredList[10] == 0 || botScoredList[15] == 0 )  ) {
                let i = p_d + 1;
                while ( i < 5 ){
                    if (diceReadings[i] == 2){
                        p_d = i;
                        break;
                    }
                    i++;
                }    
            } else if ( one == b && ( botScoredList[1] == 0 || botScoredList[9] == 0 || botScoredList[10] == 0 || botScoredList[15] == 0 ) ){
                let i = p_d + 1;
                while ( i < 5 ){
                    if (diceReadings[i] == 1){
                        p_d = i;
                        break;
                    }
                    i++;
                }
            } else {
                p_d = 13;
            }
        } else if ( one == c || two == c || three == c || four == c || five == c || six == c ) {
            if ( i5 == 2 ) {
                p_d = 13;
            } else if ( six == c &&  ( botScoredList[6] == 0 || botScoredList[9] == 0 || botScoredList[10] == 0 || botScoredList[15] == 0 ) ) {
                let i = p_d + 1;
                while ( i < 5 ){
                    if (diceReadings[i] == 6){
                        p_d = i;
                        break;
                    }
                    i++;
                }    
            } else if ( five == c && ( botScoredList[5] == 0 || botScoredList[9] == 0 || botScoredList[10] == 0 || botScoredList[15] == 0 ) ) {
                let i = p_d + 1;
                while ( i < 5 ){
                    if (diceReadings[i] == 5){
                        p_d = i;
                        break;
                    }
                    i++;
                }
            } else if ( four == c && ( botScoredList[4] == 0 || botScoredList[9] == 0 || botScoredList[10] == 0 || botScoredList[15] == 0 ) ) {
                let i = p_d + 1;
                while ( i < 5 ){
                    if (diceReadings[i] == 4){
                        p_d = i;
                        break;
                    }
                    i++;
                }    
            }  else if ( three == c && ( botScoredList[3] == 0 || botScoredList[9] == 0 || botScoredList[10] == 0 || botScoredList[15] == 0 ) ) {
                let i = p_d + 1;
                while ( i < 5 ){
                    if (diceReadings[i] == 3){
                        p_d = i;
                        break;
                    }
                    i++;
                }    
            } else if ( two == c && ( botScoredList[2] == 0 || botScoredList[9] == 0 || botScoredList[10] == 0 || botScoredList[15] == 0 )  ) {
                let i = p_d + 1;
                while ( i < 5 ){
                    if (diceReadings[i] == 2){
                        p_d = i;
                        break;
                    }
                    i++;
                }    
            } else if ( one == c && ( botScoredList[1] == 0 || botScoredList[9] == 0 || botScoredList[10] == 0 || botScoredList[15] == 0 )  ) {
                let i = p_d + 1;
                while ( i < 5 ){
                    if (diceReadings[i] == 1){
                        p_d = i;
                        break;
                    }
                    i++;
                }    
            }  else {
                p_d = 13;
            }
        } else {
            p_d = 13;
        }  
                
    } else {
        p_d = 13;
    }

   return p_d;
}
function choosing_S_C() {
    poc = 14;
   
    let a = 0;
    let b = 0;

    let one = 0;
    let two = 0;
    let three = 0;
    let four = 0;
    let five = 0;
    let six = 0;
    
    for( let i = 0; i < 5; i++) {
        switch(diceReadings[i]) {
            case 1: one++;
            break;
            case 2: two++;
            break;
            case 3: three++;
            break;
            case 4: four++;
            break;
            case 5: five++;
            break;
            case 6: six++;
            break;
        }
    }

    //check whether it is a yahtzee
    a = 5;
    if ( botScoredList[15] == 0 && ( one == a || two == a || three == a || four == a || five == a || six == a ) ) {
        poc = 15;
    }

    //check whether it is a large straight
    a = 1;
    if ( botScoredList[13] == 0 && ( ( one == a || six == a ) && ( two == a && three == a && four == a && five == a ) ) ) {
        poc = 13;
    }

    //check whether it is a small straight.
    a = 1; 
    if ( botScoredList[12] == 0 && poc != 13 && ( three >= a && ( ( one >= a && two >= a && four >= a ) || ( two >= a && four >= a && five >= a  ) || ( four >= a && five >= a && six >= a ) ) ) ) {  
        poc = 12;
    }

    //check whether it is a full house
    a = 3;
    b = 2;
    if ( botScoredList[11] == 0 && botScoredList[11] == 0 && ( one == a || two == a || three == a || four == a || five == a || six == a ) && ( one == b || two == b || three == b || four == b || five == b || six == b ) ) {
        poc = 11;
    }


    a = 5;
    if ( botScoredList[15] != 0 && ( one == a || two == a || three == a || four == a || five == a || six == a ) ) {    
        for(let i = 0; i < 5; i++) {
            if ( botScoredList[diceReadings[0]] == 0 ) {
                poc = diceReadings[0];
                break; // not need to break 
            } 
        }
    }
    
    if ( poc == 14 ) { 
        if( one == 4 && botScoredList[1] == 0 && botScoredList[1] != 1 ) {
            poc = 1;
        } else if( two == 4 && botScoredList[2] == 0 && botScoredList[2] != 1 ) {
            poc = 2;
        } else if( three == 4 && botScoredList[3] == 0 && botScoredList[3] != 1 ) {
            poc = 3;
        } else if( four == 4 && botScoredList[4] == 0 && botScoredList[4] != 1 ) {
            poc = 4;
        } else if( five == 4 && botScoredList[5] == 0 && botScoredList[5] != 1 ) {
            poc = 5;
        } else if( six == 4 && botScoredList[6] == 0 && botScoredList[6] != 1 ) {
            poc = 6;
        }
        
          else if( six == 4 && botScoredList[10] == 0 && botScoredList[10] != 1 ) {
            poc = 10;
        } else if( five == 4 && botScoredList[10] == 0 && botScoredList[10] != 1 ) {
            poc = 10;
        } else if( four == 4 && botScoredList[10] == 0 && botScoredList[10] != 1 ) {
            poc = 10;
        } 

          else if( one == 3 && botScoredList[1] == 0 && botScoredList[1] != 1 ) {
            poc = 1;
        } else if( two == 3 && botScoredList[2] == 0 && botScoredList[2] != 1 ) {
            poc = 2;
        } else if( three == 3 && botScoredList[3] == 0 && botScoredList[3] != 1 ) {
            poc = 3;
        } else if( four == 3 && botScoredList[4] == 0 && botScoredList[4] != 1 ) {
            poc = 4;
        } else if( five == 3 && botScoredList[5] == 0 && botScoredList[5] != 1 ) {
            poc = 5;
        } else if( six == 3 && botScoredList[6] == 0 && botScoredList[6] != 1 ) {
            poc = 6;
        }
        
          else if( six == 3 && botScoredList[9] == 0 && botScoredList[9] != 1 ) {
            poc = 9;
        } else if( five == 3 && botScoredList[9] == 0 && botScoredList[9] != 1 ) {
            poc = 9;
        } else if( four == 3 && botScoredList[9] == 0 && botScoredList[9] != 1 ) {
            poc = 9;
        } 

          else if( three == 4 && botScoredList[10] == 0 && botScoredList[10] != 1 ) {
            poc = 10;
        } else if( two == 4 && botScoredList[10] == 0 && botScoredList[10] != 1 ) {
            poc = 10;
        } else if( one == 4 && botScoredList[10] == 0 && botScoredList[10] != 1 ) {
            poc = 10;
        } else if( three == 3 && botScoredList[9] == 0 && botScoredList[9] != 1 ) {
            poc = 9;
        } else if( two == 3 && botScoredList[9] == 0 && botScoredList[9] != 1 ) {
            poc = 9;
        } else if( one == 3 && botScoredList[9] == 0 && botScoredList[9] != 1 ) {
            poc = 9;
        } 

       
          else if( one == 2 && botScoredList[1] == 0 && botScoredList[1] != 1 ) {
            poc = 1;
        } else if( two == 2 && botScoredList[2] == 0 && botScoredList[2] != 1 ) {
            poc = 2;
        } else if( three == 2 && botScoredList[3] == 0 && botScoredList[3] != 1 ) {
            poc = 3;
        } else if( four == 2 && botScoredList[4] == 0 && botScoredList[4] != 1 ) {
            poc = 4;
        } else if( five == 2 && botScoredList[5] == 0 && botScoredList[5] != 1 ) {
            poc = 5;
        } else if( six == 2 && botScoredList[6] == 0 && botScoredList[6] != 1 ) {
            poc = 6;
        } else {
            while ( poc == 7 || poc == 8 || botScoredList[ poc ] == 1 ) {
                poc = Math.floor(Math.random() * 15) + 1;
                if ( poc == 6 && six <= 1 && ( botScoredList[1] == 0 || botScoredList[2] == 0 ) ) {
                    poc = 1;
                }
                if ( poc == 5 && five <= 1 && ( botScoredList[1] == 0 || botScoredList[2] == 0 ) ) {
                    poc = 1;
                } 
            }
        }
    }
 
    botScoredList[ poc ] = 1;


    // Coppied from C version
    // if ( poc <= 6 ){
    //     console.log(poc);
    // } else {
    //     // console.log("%d", poc - 2);
    //     console.log(poc - 2);
    // }

    console.log(`score category is :- ${coloum1[poc]}`);
    return poc;

}
function scoringBot(i) {
    botScore[i] = Number(document.querySelector(`#${coloum1[i]}_bot`).textContent);
    botScoredList[i] = 1;

    // Updatinfg Sum & Total
    document.querySelector(`#${coloum1[8]}_bot`).textContent = sumBot();
    document.querySelector(`#${coloum1[7]}_bot`).textContent = bonusBot();
    document.querySelector(`#${coloum1[16]}_bot`).textContent = totalScoreBot();

    console.log("Bot's Score List :-", botScore);
    document.querySelector(`#${coloum1[i]}_bot`).style.color = "#754e1a"
    document.querySelector(`#${coloum1[i]}_bot`).style.fontWeight = "400";

    temp = [ 8, 8, 8, 8, 8 ];
    // reservedDice = [ 0, 0, 0, 0, 0 ];
    reservedDiceBot = [ 0, 0, 0, 0, 0 ];
    // Preparing for next round
    resetDiceColours();
    hideEmptyScores();

}


// ================================--\
// ==================================\\
//                                  ||||
const sumBot = () => {
    let score = 0;
    for(let i = 1; i <= 6; i++) {
        score = score + botScore[i];
    }
    botScore[7] = score;
    return score;
}  //                               ||||
const bonusBot = () => {
    if ( botScore[7] >= 63 ) {
        botScore[8] = 35;
        // botScoredList[7] = 1;
        // document.querySelector(`#${coloum1[7]}_bot`).style.color = " #754e1a";
    }
    return botScore[8];
}  //                               ||||
const totalScoreBot = () => {
    let total = 0;
    for(let i = 1; i <= 15; i++) {
        if ( i == 7 ) {
            i = 8;
        }
        total = total + botScore[i];
    }
    botScore[16] = total;
    return total;
}  //                               ||||
//===================================//
// ================================__/


function sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            delay = ms;
            resolve("success");
        }, ms);
    });
}