const readline = require('readline');
const fs = require('fs');
const PasswordSecurityClient = require(__dirname + '/../PasswordSecurity');

var passwordClient = new PasswordSecurityClient.PasswordSecurity.PasswordSecurity();
performanceInit();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.setPrompt('시험데이터 입력: ');

async function performanceInit() {
    await passwordClient.passwordValidation('password').then(function (result) {
        main();
    });
}

async function performanceTest(password) {
    await passwordClient.passwordValidation(password).then(function (result) {
        console.log(result.predictPoint);
        main();
    });
}

function main() {
    rl.prompt();
}

rl.on('line', function (password) {
    performanceTest(password);

    switch (password) {
        case 'quit':
            rl.close();
    }
});

rl.on('close', function () {
    process.exit();
});
