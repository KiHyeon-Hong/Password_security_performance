const readline = require('readline');

const koreanZxcvbn = require(__dirname + '/../lib/koreanZxcvbn');
const levenshteinDistance = require(__dirname + '/../lib/levenshteinDistance.js');
const ludsPoint = require(__dirname + '/../lib/ludsPoint.js');
const koreanZxcvbnString = require(__dirname + '/../lib/koreanZxcvbnString');
const comparePoint = new koreanZxcvbnString.koreanZxcvbnString.koreanZxcvbnString();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function performanceInit() {
  main();
}

function performanceTest(password) {
  var zxcvbnPoint = parseInt(parseInt(koreanZxcvbn(password).score * 2 + comparePoint.frequencyComparePoint(password)) / 2) < 5 ? parseInt(parseInt(koreanZxcvbn(password).score * 2 + comparePoint.frequencyComparePoint(password)) / 2) : 4;
  var luds = parseInt(parseInt(ludsPoint.ludsPoint(password).nScore) / 20) < 5 ? parseInt(parseInt(ludsPoint.ludsPoint(password).nScore) / 20) : 4;
  var levenshteinPoint = parseInt(levenshteinDistance.totalLVD(password)) < 3 ? 0 : 1;

  console.log(`zxcvbn: ${zxcvbnPoint}, LUDS: ${luds}, Levenshtein distance: ${levenshteinPoint}`);

  main();
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

performanceInit();