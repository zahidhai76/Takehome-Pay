function unhideInputSingle() {
    for (var i = 0; i < 1; i++){
    if(document.getElementById("period").value == "Annually") {
        document.getElementsByClassName("gross-monthly")[i].style.display = "none";
        document.getElementsByClassName("gross-annually")[i].style.display = "block";
    }
    else if (document.getElementById("period").value == "Monthly") {
        document.getElementsByClassName("gross-annually")[i].style.display = "none"
        document.getElementsByClassName("gross-monthly")[i].style.display = "block"
    }
    }
}

function unhideInputOther() {
    for (var i = 0; i < 1; i++){
    if(document.getElementById("period").value == "Annually") {
        document.getElementsByClassName("gross-monthly")[i].style.display = "block";
        document.getElementById("gross-monthly").disabled = true;
        document.getElementById("gross-annually").disabled = false;
        document.getElementById("calculateOtherButton").innerHTML = "Calculate Gross Monthly";
    }
    else if (document.getElementById("period").value == "Monthly") {
        document.getElementsByClassName("gross-annually")[i].style.display = "block"
        document.getElementById("gross-annually").disabled = true;
        document.getElementById("gross-monthly").disabled = false;
        document.getElementById("calculateOtherButton").innerHTML = "Calculate Gross Annually";
    }
    }
}

function grossMonthly() {
    var grossMonth;
    if(document.getElementById("period").value == "Annually"){
        grossMonth = document.getElementById("gross-annually").value / 12;
        document.getElementById("gross-monthly").value = grossMonth.toFixed(2);
    } 
    else if (document.getElementById("period").value == "Monthly"){
        grossMonth = document.getElementById("gross-monthly").value;
        let grossAnnually = grossMonth * 12;
        document.getElementById("gross-annually").value = grossAnnually.toFixed(2);
    }
}

function taxable(){
    var taxFreeAmount, taxableAmountLower, taxableAmountHigher, taxLower, taxHigher;
    let gross = document.getElementById("gross-monthly").value - PensionContribution();
    if(document.getElementById("tax-code").value == "1257L"){
        taxFreeAmount = 1048.59;
    } 
    else if (document.getElementById("tax-code").value == "1170L"){
        taxFreeAmount = 975;
    }
    if(gross >= 1048.59)
    {
        taxableAmountLower = gross - taxFreeAmount;
        if(gross >= 4189)
        {
            taxableAmountHigher = gross - 4189;
        }
        else {
            taxableAmountHigher = 0;
        }
    }
    else {
        taxableAmountLower = 0;
        taxableAmountHigher = 0;
    }
    document.getElementById("tax20").innerHTML = "£" + taxableAmountLower.toFixed(2);
    document.getElementById("tax40").innerHTML = "£" + taxableAmountHigher.toFixed(2);
    taxLower = 0.2 * taxableAmountLower;
    taxHigher = 0.4 * taxableAmountHigher;
    document.getElementById("taxed20").innerHTML = "£" + taxLower.toFixed(2);
    document.getElementById("taxed40").innerHTML = "£" + taxHigher.toFixed(2);
    let taxTotal = taxLower + taxHigher;
    document.getElementById("tax").innerHTML = "£" + taxTotal.toFixed(2);
    return taxTotal;
}

function NIApplied(){
    var NIFreeAmountLower, NIAmount, NI;
    let gross = document.getElementById("gross-monthly").value - PensionContribution();
    if(gross >= 823.01){
        NIFreeAmountLower = 823.01
        NIAmount = gross - NIFreeAmountLower;
    } 
    else {
        NIFreeAmountLower = 0;
        NIAmount = 0;
    }
    document.getElementById("NI-applied-on").innerHTML = "£" + NIAmount.toFixed(2);
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
        SLAmount = parseInt(document.getElementById("gross-monthly").value) - SLFreeAmount - PensionContribution();
    } 
    else {
        SLFreeAmount = 0;
        SLAmount = 0;
    }
    document.getElementById("SL-applied-on").innerHTML = "£" + SLAmount.toFixed(2);
    SL = 0.09 * SLAmount;
    document.getElementById("SL").innerHTML = "£" + SL.toFixed(2);
    return SL;
}

function PensionContribution(){
    let PensionPercentage = document.getElementById("pension-contribution").value / 100;
    let grossMonthly = document.getElementById("gross-monthly").value;
    const pension = PensionPercentage * grossMonthly;
    document.getElementById("pension").innerHTML = "£" + pension.toFixed(2);
    return pension;
}

function TakeHome(){
    let TakeHomeAmount = document.getElementById("gross-monthly").value - taxable() - NIApplied() - SLApplied() - PensionContribution();
    document.getElementById("TakeHome").innerHTML = "£" + TakeHomeAmount.toFixed(2);
}