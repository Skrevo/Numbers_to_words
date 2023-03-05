function back() {
    document.getElementById("copy").value = 'Скопіювати';
}

function getNum() {
    return document.getElementById("numIn").value;
}

function putNum() {
    document.getElementById("out").innerHTML = number2text(getNum());
}

function number2text(value) {
    let fraction = Math.round(frac(value) * 100);
    let f_text = "";
    let lastDigit = value[value.length-1];

    if(fraction > 0) {
        f_text = `, ${fraction}`;
    } 
    else if (fraction == 0) {
        f_text = ", 00";
    }

    if (lastDigit == 1) {
        return convert_number(value) + " гривня" + f_text + " копійок";
    } 
    else if ( lastDigit > 0 && lastDigit <= 4) {
        return convert_number(value) + " гривні" + f_text + " копійок";
    }
    else {
    return convert_number(value) + " гривень" + f_text + " копійок";
    }
}

function frac(f) {
    return f % 1;
}

function convert_number(number)
{
    if ((number < 0) || (number > 9999999999))
    { 
        return "Дуже велике число";
    }
    let Gn = Math.floor(number / 1000000000);  /* milliards */
    number -= Gn * 1000000000;
    let kn = Math.floor(number / 1000000);     /* millions */
    number -= kn * 100000;
    let Hn = Math.floor(number / 1000);      /* thousands */
    number -= Hn * 1000;
    let Dn = Math.floor(number / 100);       /* hundreds */
    number = number % 100;               /* Ones */
    let tn = Math.floor(number / 10);
    let one = Math.floor(number % 10);
    let res = "";

    if (Gn>0) 
    {
        if (Gn <= 1) {
            res += (convert_number(Gn) + " мільярд");
        }
        else if (Gn == 2 || Gn == 4) {
            res += (convert_number(Gn) + " мільярда");
        }
        res += (convert_number(Gn) + " мільярдів");
    } 
    if (kn>0)
    {
        if (kn <= 1) {
            res += (convert_number(kn) + " мільйон");
        }
        else if (kn == 2 || kn == 4) {
            res += (convert_number(kn) + " мільйона");
        }
        else if (kn == 3) {
            res += (convert_number(kn) + " мільйони");
        }
        res += (convert_number(kn) + " мільйонів");
    }
    if (Hn>0) 
    { 
        if (Hn == 1) {
            res += (((res == "") ? "" : " ") +
            convert_number(Hn) + " тисяча");    
        }
        else if (Hn <= 4) {
            res += (((res == "") ? "" : " ") +
            convert_number(Hn) + " тисячі");
        }
        else if (Hn >= 5) {
        res += (((res == "") ? "" : " ") +
            convert_number(Hn) + " тисяч");
        }
    }

    let ones = Array("", "Одна", "Дві", "Три", "Чотири", "П'ять", "Шість","Сім", "Вісім", "Дев'ять", "Десять", "Одинадцять", "Дванадцять", "Тринадцять","Чотирнадцять", "П'ятнадцять", "Шістнадцять", "Сімнадцять", "Вісімнадцять","Дев'ятнадцять");
    let tens = Array("", "", "Двадцять", "Тридцять", "Сорок", "П'ятдесят", "Шістдесят","Сімдесят", "Вісімдесят", "Дев'яносто");
    let hundreds = Array("", "Сто", "Двісті", "Триста", "Чотириста", "П'ятсот", "Шістсот","Сімсот", "Вісімсот", "Дев'ятсот");

    if (tn > 0 || one > 0 || Dn > 0) {
        if (!(res == "")) {
            res += " ";
        }

        if (Dn < 1) {
            if (tn < 2) {
                res += ones[tn * 10 + one];
            } else {
                res += tens[tn];
                if (one > 0) {
                    res += (" " + ones[one]);
                }
            }
        } else {
            res += hundreds[Dn] + " ";
            if (tn < 2) {
                res += ones[tn * 10 + one];
            } else {
                res += tens[tn];
                if (one > 0) {
                    res += (" " + ones[one]);
                }
            }
        }

            if (res == "") {
                res = "Нуль";
            }
    }
    return res;
}

document.getElementById("copy").onclick = function() {
    let text = document.getElementById("out").value;
    navigator.clipboard.writeText(text).then(() => {
        document.getElementById("copy").value = 'Скопійовано!';
    }).catch(err => {
        console.error('Error in copying text: ', err);
    });
}