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

    if(fraction > 0) {
        f_text = ", " + fraction;
        if (fraction < 2 || fraction.toString()[1] < 2 && fraction.toString()[1] > 0 && fraction.toString()[0] != 1) {
            f_text += " копійка";
        }
        else if (fraction < 5 || fraction.toString()[1] < 5 && fraction.toString()[1] > 0 && fraction.toString()[0] != 1) {
            f_text += " копійки";
        } else
        f_text += " копійок";
    } 
    else if (fraction == 0) {
        f_text = ", 00 копійок";
    }

    let intPart = value.split('.')[0];
    if (intPart[intPart.length-1] == 1) {
        return convert_number(value) + " гривня" + f_text;
    }
    else if (intPart[intPart.length-1] <=4 && intPart[intPart.length-1] > 0) {
        return convert_number(value) + " гривні" + f_text;
    }
    else {
        return convert_number(value) + " гривень" + f_text;
    }
}

function frac(f) {
    return f % 1;
}

function convert_number(number)
{
    let res = "";
    if (number > 9999999999)
    { 
        return "Дуже велике число";
    }
    if (number < 0) {
        res = "Мінус ";
    }
    let Gn = Math.floor(number / 1000000000);  /* milliards */
    if (number < 0) number += Gn * 1000000000;
    else
    number -= Gn * 1000000000;
    let kn = Math.floor(number / 1000000);     /* millions */
    if (number < 0) number += kn * 1000000;
    else
    number -= kn * 1000000;
    let Hn = Math.floor(number / 1000);      /* thousands */
    if (number < 0) number += Hn * 1000;
    else
    number -= Hn * 1000;
    let Dn = Math.floor(number / 100);       /* hundreds */
    number = number % 100;               /* Ones */
    let tn = Math.floor(number / 10);
    let one = Math.floor(number % 10);

    if (Gn > 0)
    {
        if (Gn <= 1) {
            res += (convert_number(Gn) + " мільярд");
            res = res.replace("Одна","Один");
        }
        else if (Gn == 2 || Gn == 4) {
            res += (convert_number(Gn) + " мільярда");
            res = res.replace("Дві","Два");
        }
        else if (Gn == 3) {
            res += (convert_number(Gn) + " мільярди");
        } else
        res += (convert_number(Gn) + " мільярдів");
    } 
    if (kn > 0)
    {
        if (kn <= 1) {
            res += (convert_number(kn) + " мільйон");
            res = res.replace("Одна","Один");
        }
        else if (kn == 2 || kn == 4) {
            res += (convert_number(kn) + " мільйона");
            res = res.replace("Дві","Два");
        }
        else if (kn == 3) {
            res += (convert_number(kn) + " мільйони");
        } else
        res += (convert_number(kn) + " мільйонів");
    }
    if (Hn > 0)
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
    }
    if (res == "") {
        res = "Нуль";
    }

    return res;
}

// Copy function

document.getElementById("copy").onclick = function() {
    let text = document.getElementById("out").value;
    navigator.clipboard.writeText(text).then(() => {
        document.getElementById("copy").value = 'Готово!';
        document.getElementById("copy").style.color = "green";
    }).catch(err => {
        console.error('Error in copying text: ', err);
    });
}