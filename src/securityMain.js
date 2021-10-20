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

async function performanceInit() {
    await passwordClient.passwordValidation('password').then(function (result) {
        main();
    });
}

async function performanceTest(password) {
    await passwordClient.passwordValidation(password).then(function (result) {
        // console.log(result.predictPoint);
        let today = new Date();
        let year = today.getFullYear(); // 년도
        let month = today.getMonth() + 1; // 월
        let date = today.getDate(); // 날짜
        let hours = today.getHours(); // 시
        let minutes = today.getMinutes(); // 분
        let seconds = today.getSeconds(); // 초

        let timestamp = `${year}.${month}.${date}. ${hours}:${minutes}:${parseInt(seconds / 10) == 0 ? '0' + seconds : seconds}`;

        console.log(`${timestamp}  ${password}  L${origPoint(password)}  L${calPoint(result.predictPoint)}  ${'일치 여부'}`);
        console.log();
        main();
    });
}

function main() {
    rl.setPrompt(`시험데이터 입력: `);
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
    var zxcvbnPoint =
        parseInt(parseInt(koreanZxcvbn(password).score * 2 + comparePoint.frequencyComparePoint(password)) / 2) < 5
            ? parseInt(parseInt(koreanZxcvbn(password).score * 2 + comparePoint.frequencyComparePoint(password)) / 2)
            : 4;
    var luds = parseInt(parseInt(ludsPoint.ludsPoint(password).nScore) / 20) < 5 ? parseInt(parseInt(ludsPoint.ludsPoint(password).nScore) / 20) : 4;
    var levenshteinPoint = parseInt(levenshteinDistance.totalLVD(password)) < 3 ? 0 : 1;

    var feature = [zxcvbnPoint, luds, levenshteinPoint];
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
