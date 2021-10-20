## install

```bash
git clone https://github.com/KiHyeon-Hong/Password_security_performance.git
cd Password_security_performance
git clone https://github.com/KiHyeon-Hong/Password_security_client.git PasswordSecurity
cd PasswordSecurity
npm install
cd ..
```

## usage

-   첫번째 터미널창

```bash
cd files
tail -f security.log
```

-   두번째 터미널창
-   files/origPasswordLevel.txt의 출입카드키를 하나씩 입력

```bash
cd src
node securityMain.js
```
