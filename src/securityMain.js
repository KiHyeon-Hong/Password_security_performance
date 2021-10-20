const readline = require('readline');
const fs = require('fs');
const PasswordSecurityClient = require(__dirname + '/../PasswordSecurity');

const koreanZxcvbn = require(__dirname + '/../lib/koreanZxcvbn');
const levenshteinDistance = require(__dirname + '/../lib/levenshteinDistance.js');
const ludsPoint = require(__dirname + '/../lib/ludsPoint.js');
const koreanZxcvbnString = require(__dirname + '/../lib/koreanZxcvbnString');
const comparePoint = new koreanZxcvbnString.koreanZxcvbnString.koreanZxcvbnString();

var passwordClient = new PasswordSecurityClient.PasswordSecurity.PasswordSecurity();
performanceInit();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

var num = 1;
fs.writeFileSync(__dirname + '/../files/security.log', '', 'utf8');

async function performanceInit() {
    await passwordClient.passwordValidation('password').then(function (result) {
        console.log();
        main();
    });
}

async function performanceTest(password) {
    await passwordClient.passwordValidation(password).then(function (result) {
        let today = new Date();

        let year = today.getFullYear(); // 년도
        let month = today.getMonth() + 1; // 월
        let date = today.getDate(); // 날짜
        let hours = today.getHours(); // 시
        let minutes = today.getMinutes(); // 분
        let seconds = today.getSeconds(); // 초

        let timestamp = `${year}.${month}.${date}. ${hours}:${minutes}:${parseInt(seconds / 10) == 0 ? '0' + seconds : seconds}`;
        let orig = origPoint(password);
        let predict = calPoint(result.predictPoint);
        let sucFail = orig == predict ? 'Success' : 'Fail';

        console.log(`${timestamp},  ${password}          ${orig}   ${predict}   ${sucFail}`);
        console.log();

        fs.appendFileSync(__dirname + '/../files/security.log', `${timestamp},  ${password}          ${orig}   ${predict}   ${sucFail}\n`, 'utf8');

        main();
    });
}

function main() {
    rl.setPrompt(`${num}. 시험데이터 입력: `);
    num++;

    rl.prompt();
}

rl.on('line', function (password) {
    performanceTest(password);

    switch (password) {
        case 'quit':
        case 'exit':
            rl.close();
    }
});

rl.on('close', function () {
    process.exit();
});

function origPoint(password) {
    let datas = fs.readFileSync(__dirname + '/../files/origPasswordLevel.txt', 'utf8');
    datas = datas.split('\n');

    let data = datas.map((data) => {
        return data.split('\r')[0];
    });

    let key = [];
    let value = [];

    data.map((data) => {
        key.push(data.split(',')[0]);
        value.push(data.split(',')[1]);
    });

    for (let i = 0; i < key.length; i++) {
        if (key[i] == password) {
            return value[i];
        }
    }

    return -1;
}

function calPoint(predictPoint) {
    if (predictPoint < 0.15) {
        return 0;
    } else if (predictPoint < 0.3) {
        return 1;
    } else if (predictPoint < 0.6) {
        return 2;
    } else if (predictPoint < 0.9) {
        return 3;
    } else {
        return 4;
    }
}
