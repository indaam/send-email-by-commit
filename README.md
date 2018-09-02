# Summary
When you work, maybe on your company.
Everyday you must be send report about you jobs or task per day. Swear is anoying by me. Why, for what?
But if its require, you must do that.
Before you send the report, somethimes you must remember what you do in this day, better if you remember, if not? I think you open the sourcetree or trello, or whatever lah.
So, why not create and send report base on commit?

## Install
* To install, On your root project, `git clone git@github.com:indaam/send-email-by-commit.git && cd send-email-by-commit && npm install && rm -rf .git`
* On your project, Must be have git to get the commit

### Config
Open `config.js`, then find
```
    email : {
        from : "...emai.from@email.com",
        to : "...send.to@email.com",
        cc : ""
    },
    git : {
        email : "..git.global@email.com",
```
* email `from` is your email for work
* email `to` is send email report to
* email `cc` maybe want send to other people
* git `email` is your global git email, check on `git config --global user.email`
* Save then

# Run & send
* To run, `node index.js`
* If not work, read this

## Email setup
* Read https://support.google.com/mail/answer/7875, then go to
* https://myaccount.google.com/lesssecureapps
* When you think is danger, you can disable then use `_log` file

## Log folder
When you run `node index.js`, automatilly create `_log` folder, you can copy paste if lesssecureapps is OFF

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

It's not good & very dangerous, canot la send report like that. So to ignore commit, you can edit `config.js`
```
ignore : [ /* Remove if find word */
            "Merge branch +(.){0,3}",
            "(F|f)(.)ck|m(.)mek|k(o|a|(.))ntol|(.)babi(.)|(.)jancok(.)|(T|t)ai(.)",
            "(a|A)njin(g|G)|(b|B)ab(i|I)|(m|M)onye(t|T)|(k|K)unyu(k|K)|(F|f)(.)ck|m(.)mek|k(o|a|(.))ntol|bab|jancok|(T|t)ai(.)|(b|B)ajinga(n|N)|(b|B)angsa(t|T)|(k|K)onto(l|L)|(m|M)eme(k|K)|(n|N)gento(t|T)|(n|N)gew(e|E)|(p|P)ere(k|K)|(p|P)ecu(n|N)|(b|B)encon(g|G)|(b|B)anc(i|I)|(j|J)abla(y|Y)|(b|B)eg(o|O)|(g|G)oblo(k|K)|(i|I)dio(t|T)|(g|G)eble(k|K)|(g|G)il(a|A)|(g|G)il(a|A)|(s|S)intin(g|G)|(t|T)olo(l|L)|(s|S)ara(p|P)|(b|B)ut(a|A)|(b|B)ude(k|K)|(b|B)olo(t|T)|(j|J)ele(k|K)|(s|S)eta(n|N)|(k|K)epara(t|T)|(n|N)geh(e|E)|(b|B)eja(d|D)|(p|P)ere(k|K)|(b|B)eja(t|T)|(g|G)embe(l|L)|(b|B)rengse(k|K)|((a|A)s(u|U)\s)|((t|T)a(i|I)\s)(b|B)ina(l|L)|(m|M)eki"
        ]
```

## Base on Hastag
By default this application grab all commit start from 00.00 to 24.00.
Then maybe you want to just add commit base on hastag, sampe like this.
* `git commit -m  "#complate: Create Home screen"`
* `git commit -m  "#blocker: API not work"`
* `git commit -m  "#issues: Force closee on Android"`
* `git commit -m  "#otherHasTag: Bla bla bla"`

To do that, ON PROGRESS
