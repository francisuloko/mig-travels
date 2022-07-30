/**
 * Clickinc.com Affiliate Referral Tracker Script - 061809
 */
/*Replace XXXXX with your Merchant Id */
var merchantId = "70786";
/*Replace XXXXX with your Affiliate Id or Campaign Id*/
var Campaign = "219481";  

/********Please Do Not change Anything Below this ***************/
var varb = new getVariables();
/* CAPTURING CLICKS BLOCK */
var campaignName = document.location.href;
var affSoft_refdata = document.referrer;
var affSoft_daysToLive = 30;
var affSoft_asmReferralValue = "";
var multiDomain = false;

// checking for the  same Click or not 
if (aff_IsNewCustomer() == true) {  
    InitializeTimer();
}
var secs;
var timerID = null;
var timerRunning = false;
var delay = 1000;
function InitializeTimer() {
    // Set the length of the timer, in seconds
    secs = 4;
    StopTheClock();
    StartTheTimer();
}
function StopTheClock() {
    if (timerRunning) {
        clearTimeout(timerID);
    }
    timerRunning = false;
}
function StartTheTimer() {
    if (secs == 0) {
        StopTheClock();
        // Here's where you put something useful that's
        // supposed to happen after the allotted time.
        // For example, you could display a message:
        postFunction();
    } else {
       // self.status = secs;
        secs = secs - 1;
        timerRunning = true;
        timerID = self.setTimeout("StartTheTimer()", delay);
    }
}
function postFunction() {
    aff_Post();
	SetCookie(varb.asmReferral, affSoft_refdata, affSoft_daysToLive);
}

function aff_IsNewCustomer() {
    if (GetCookie(varb.asmReferral) == null) {
        return true;
    } else {
        return false;
    }
}
		
//Posting Click
function aff_Post() {
    var img = new Image();
    var url = varb.clicksURL + varb.ampId + Campaign + varb.campName + campaignName + varb.ampReferrer + affSoft_refdata ;
    img.src = url;
}
function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(varb.semiColon, offset);
    if (endstr == -1) {
        endstr = document.cookie.length;
    }
    return unescape(document.cookie.substring(offset, endstr));
}
function GetCookie(name) {
    var arg = name + varb.equals;
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg) {
            return getCookieVal(j);
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) {
            break;
        }
    }
    return null;
}
function WriteCookie(name, value, expires) {
    var argv = SetCookie.arguments;
    var argc = SetCookie.arguments.length;
	//inserted by Andrew Herron to fix cross-sub-domain cookie compatibility, 
    if (multiDomain) {
        rootDomain = document.domain;
    } else {
        domain = document.domain;
        dparts = domain.split(varb.dot);
        if (dparts.length == 3) {
            rootDomain = dparts[1] + varb.dot + dparts[2];
        } else {
            rootDomain = domain;
        }
    }
    var secure = (argc > 5) ? argv[5] : false;
    var cookie = name + varb.equals + escape(value) + ((expires == null) ? "" : (varb.expires + expires.toGMTString())) + ((varb.slash == null) ? "" : (varb.path + varb.slash)) + ((rootDomain == null) ? "" : (varb.semiDomain + rootDomain)) + ((secure == true) ? varb.semiSecure : "");
    document.cookie = cookie;
}
function DeleteCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1000000000);  // This cookie is history (changed -1 to make it previous time)
    var cval = GetCookie(name);
    document.cookie = name + varb.equals + cval + varb.expires + exp.toGMTString();
}
function SetCookie(name, value, expiredays) {
    var expdate = new Date();
    expdate.setTime(expdate.getTime() + (24 * 60 * 60 * 1000 * expiredays));
    WriteCookie(name, value, expdate);
}
function getAffReferral(){
  var affReferral = GetCookie(varb.asmReferral);
  if(affReferral == null || affReferral == 'null') {
         affReferral  = document.referrer ;
  }
  
  return  escape(affReferral) ;
}
/* VARIABLES DECLARATION BLOCK */
function getVariables() {
     /* CLICKS VARIABLES START */
    /* PLEASE DO NOT CHANGE ANYTHING IN THIS BLOCK */
	//Use Http or Https//
    this.clicksURL = "http://ca.clickinc.com/clicks/servlet/AffReferral?merchant=" + merchantId;
    this.ampsend = "&";
    this.equals = "=";
    this.id = "id";
    this.affid = "affid";
    this.asmReferral = "affiliateReferral";
    this.ampId = "&affId=";
    this.campName = "&camp="
    this.ampReferrer = "&referrer=";
    this.semiColon = ";";
    this.slash = "/";
    this.dot = ".";
    this.expires = "; expires=";
    this.path = "; path=";
    this.semiDomain = "; domain=";
    this.semiSecure = "; secure";
    /* CLICKS VARIABLES END */
}
