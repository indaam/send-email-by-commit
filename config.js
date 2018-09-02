/**
 * CONFIG
 */

const CONFIG = {
    base : {
        project : "",
        timeIn : "10:10 AM",
        timeOut : "19:10 PM",
        task : ["Creta a new project", "Setup server"]
    },
    email : {
        from : "...emai.from@email.com",
        to : "...send.to@email.com",
        cc : ""
    },
    git : {
        email : "..git.global@email.com", /* for check : git config --global user.email */
        ignore : [ /* Remove if find word */
            "Merge branch +(.){0,3}",
            "(F|f)(.)ck|m(.)mek|k(o|a|(.))ntol|(.)babi(.)|(.)jancok(.)|(T|t)ai(.)",
            "(a|A)njin(g|G)|(b|B)ab(i|I)|(m|M)onye(t|T)|(k|K)unyu(k|K)|(F|f)(.)ck|m(.)mek|k(o|a|(.))ntol|bab|jancok|(T|t)ai(.)|(b|B)ajinga(n|N)|(b|B)angsa(t|T)|(k|K)onto(l|L)|(m|M)eme(k|K)|(n|N)gento(t|T)|(n|N)gew(e|E)|(p|P)ere(k|K)|(p|P)ecu(n|N)|(b|B)encon(g|G)|(b|B)anc(i|I)|(j|J)abla(y|Y)|(b|B)eg(o|O)|(g|G)oblo(k|K)|(i|I)dio(t|T)|(g|G)eble(k|K)|(g|G)il(a|A)|(g|G)il(a|A)|(s|S)intin(g|G)|(t|T)olo(l|L)|(s|S)ara(p|P)|(b|B)ut(a|A)|(b|B)ude(k|K)|(b|B)olo(t|T)|(j|J)ele(k|K)|(s|S)eta(n|N)|(k|K)epara(t|T)|(n|N)geh(e|E)|(b|B)eja(d|D)|(p|P)ere(k|K)|(b|B)eja(t|T)|(g|G)embe(l|L)|(b|B)rengse(k|K)|((a|A)s(u|U)\s)|((t|T)a(i|I)\s)(b|B)ina(l|L)|(m|M)eki"
        ],
        useTag : false /* FOR NEXT VERSION */
    }
}

module.exports = CONFIG;
