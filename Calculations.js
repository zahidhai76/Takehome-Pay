function taxable(){
    var taxFreeAmount, taxableAmount, tax;
    if(document.getElementById("tax code").value == "1257L"){
        taxFreeAmount = 1047.50;
    } 
    else if (document.getElementById("tax code").value == "1170L"){
       taxFreeAmount = 975;
    }
    if(document.getElementById("gross-monthly").value >= 1047.50)
    {
        taxableAmount = parseInt(document.getElementById("gross-monthly").value) - taxFreeAmount,2;
    }
    else {
        taxableAmount = 0;
    }
    document.getElementById("taxable").innerHTML = "£" + taxableAmount.toFixed(2);
    tax = 0.2 * taxableAmount;
    document.getElementById("tax").innerHTML = "£" + tax.toFixed(2);
    return tax;
}

function NIApplied(){
    var NIFreeAmount, NIAmount, NI;
    if(document.getElementById("gross-monthly").value >= 823.01){
        NIFreeAmount = 823.01
        NIAmount = parseInt(document.getElementById("gross-monthly").value) - NIFreeAmount,2;
    } 
    else {
        NIFreeAmount = 0;
        NIAmount = 0;
    }
    document.getElementById("NI applied on").innerHTML = "£" + NIAmount.toFixed(2);
    NI = 0.1325 * NIAmount;
    document.getElementById("NI").innerHTML = "£" + NI.toFixed(2);
    return NI;
}

function SLApplied(){
    var SLFreeAmount, SLAmount, SL;
    if(document.getElementById("RepaymentPlan").value == "PlanOne"){
        SLFreeAmount = 1682;
    } 
    else if (document.getElementById("RepaymentPlan").value == "PlanTwo"){
        SLFreeAmount = 2274;
    }
    if(document.getElementById("gross-monthly").value >= SLFreeAmount){
        SLAmount = parseInt(document.getElementById("gross-monthly").value) - SLFreeAmount,2;
    } 
    else {
        SLFreeAmount = 0;
        SLAmount = 0;
    }
    document.getElementById("SL applied on").innerHTML = "£" + SLAmount.toFixed(2);
    SL = 0.09 * SLAmount;
    document.getElementById("SL").innerHTML = "£" + SL.toFixed(2);
    return SL;
}

function TakeHome(){
    let TakeHomeAmount = document.getElementById("gross-monthly").value - taxable() - NIApplied() - SLApplied();
    document.getElementById("TakeHome").innerHTML = "£" + TakeHomeAmount.toFixed(2);
}