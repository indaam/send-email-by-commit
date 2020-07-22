# Summary
When you work, maybe on your company.
Everyday you must be send report about you jobs or task per day. Swear is anoying by me. Why, for what?
But if its require, you must do that.
Before you send the report, somethimes you must remember what you do in this day, better if you remember, if not? I think you open the sourcetree or trello, or whatever lah.
So, why not create and send report base on commit?

## Instal

To install, On your root project, `yarn -D add send-email-by-commit`

#### Required
* npm & node

### Setup
Just run `node ./node_modules/send-email-by-commit/index.js`, then the script will create config file `daily.email.config.json`;

* By default, name on config is userInfo from os and
* Email on git config from `git config user.email` 
* on `.gitignore` dont forget to add `daily.email.config.json`

# Run & send
* To run, in terminal `node ./node_modules/send-email-by-commit/index.js`
* By default, email doenst auto send, to run auto send read ## Email config
* If auto send not work, read ## Email Secure setup

# Shortcut Run
On `package.json` add this
```
"scripts": {
  ...
  "daily": "node ./node_modules/send-email-by-commit/index.js",
},
```
Afterward, `yarn daily`

### Email config
On `daily.email.config.json` you cand find.
```
...
"auth" : {
    "user": "user.auth@mail.com",// your working email
    "password": null // email password
},
"send" : {
    "to": "sento@email.com", // email will send to
    "subject" : "Daily Update {{DD MMM YYYY}}", // email subject, important: date format must like {{FORMAT DATE}}
    "cc": "",
    "autosend": false // if true, email will auto send when you run script
}
```

### Git config
Basicly, this script get commit base on your email, so you need to set your git email, like this
```
...
"git": {
    "getFrom" : 1, // Get commy by days from now
    "email": "your.git.email@mail.com", // replace with your local git email; To check user this => git config --global user.email 
    ...
},
```

## Log Config
by default when your run `node ./node-module/send-email-by-commit/index.js`, automatilly create `dailyLog` folder;

```
"log": {
    "print" : true, // true for write you log per day
    "dir": "dailyLog" // dir name on your project
}
```

## Email Secure setup
* Read https://support.google.com/mail/answer/7875, then go to
* https://myaccount.google.com/security
* When you think is danger, you can disable then use `dailyLog` file

## Application Flow
* Get all commit
* Convert to json
* Remove unsafe commit
* Filter commit by email
* Filter commit by date today
* Create html from json
* Send email

## Ignore commit
even you say, coding is game, coding is poetry. whatever bla bla
Sometimes coding is not good lah, I hope someone know what I mean.
And then, upon once a time, you create commit like this
* `git commit -m  "F*ck feature"`
* `git commit -m  "Stup*d client"`

It's not good & very dangerous, canot la send report like that. By defaulr, I filter global unsave words, but you can add more like this;
```
"git": {
    ...
    "ignore": [
        "C|c(ibay)",
        "(kont|tol)ol",
        "undefined PM",
        "Merge branch +(.)",
        "(F|f)(.)ck|m(.)mek|k(o|a|(.))ntol|(.)babi(.)|(.)jancok(.)|(T|t)ai(.)",
        "(a|A)njin(g|G)|(b|B)ab(i|I)|(m|M)onye(t|T)|(k|K)unyu(k|K)|(F|f)(.)ck|m(.)mek|k(o|a|(.))ntol|bab|jancok|(T|t)ai(.)|(b|B)ajinga(n|N)|(b|B)angsa(t|T)|(k|K)onto(l|L)|(m|M)eme(k|K)|(n|N)gento(t|T)|(n|N)gew(e|E)|(p|P)ere(k|K)|(p|P)ecu(n|N)|(b|B)encon(g|G)|(b|B)anc(i|I)|(j|J)abla(y|Y)|(b|B)eg(o|O)|(g|G)oblo(k|K)|(i|I)dio(t|T)|(g|G)eble(k|K)|(g|G)il(a|A)|(g|G)il(a|A)|(s|S)intin(g|G)|(t|T)olo(l|L)|(s|S)ara(p|P)|(b|B)ut(a|A)|(b|B)ude(k|K)|(b|B)olo(t|T)|(j|J)ele(k|K)|(s|S)eta(n|N)|(k|K)epara(t|T)|(n|N)geh(e|E)|(b|B)eja(d|D)|(p|P)ere(k|K)|(b|B)eja(t|T)|(g|G)embe(l|L)|(b|B)rengse(k|K)|((a|A)s(u|U)s)|((t|T)a(i|I)s)(b|B)ina(l|L)|(m|M)eki"
    ]
},
```

## Change log 1.0.3
* Initial Relase

## Change log 1.0.4
* Add CLI for support when install global
* Update git config email, now can get commit by many email, settings like : `['email1@mail.com', 'email2@mail.com']`
* NEW git config `getFrom`, now can get email by day from now, default 1; Also you can set 'today' for just get from 00:00 to 23.59
* Add new awesome template, `v1` : by Nana Maulana

## Change log 1.0.5
* Write default config on first run
* Update log dir

## Base on Hastag
By default this application grab all commit start from 00.00 to 24.00.
Then maybe you want to just add commit base on hastag, sampe like this.
* `git commit -m  "#complate: Create Home screen"`
* `git commit -m  "#blocker: API not work"`
* `git commit -m  "#issues: Force closee on Android"`
* `git commit -m  "#otherHasTag: Bla bla bla"`

To do that, ON PROGRESS
