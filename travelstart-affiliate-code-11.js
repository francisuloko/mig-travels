// these variables can be configured 
var travelstartIframeId = 'travelstartIframe-0ad1e6e3-ba5e-4575-8cde-a5397f475318';
var iframeUrl = 'https://www.travelstart.com.ng';
var logMessages = false;
var showBanners = true;
var affId = '219481';
var affCampaign = 'Default';
var affCurrency = 'Default'; // ZAR / USD / NAD / ... 
var height = '0px';
var width = '100%';
var language = ''; // ar / en / leave empty for user preference

// do not change these 
var iframe = jQuery('#' + travelstartIframeId);
var iframeVersion = '11';
var autoSearch = false;
var urlParams = {};
var alreadyExist = [];
var affiliateIdExist = false;
var iframeParams = [];
var cpySource = '';
var match,
	pl = /\+/g,
	search = /([^&=]+)=?([^&]*)/g,
	decode = function (s) {
		return decodeURIComponent(s.replace(pl, " "));
	},
	query = window.location.search.substring(1);
while (match = search.exec(query)) {
	urlParams[decode(match[1])] = decode(match[2]);
}
for (var key in urlParams) {
	if (urlParams.hasOwnProperty(key)) {
		if (key == 'search' && urlParams[key] == 'true') {
			autoSearch = true;
		}
		if (key == 'affId' || key == 'affid' || key == 'aff_id') {
			affiliateIdExist = true;
		}
		iframeParams.push(key + '=' + urlParams[key]);
		alreadyExist.push(key);
	}
}
if (!('show_banners' in alreadyExist)) {
	iframeParams.push('show_banners=' + showBanners);
}
if (!('log' in alreadyExist)) {
	iframeParams.push('log=' + logMessages);
}
if (!affiliateIdExist) {
	iframeParams.push('affId=' + affId);
}
if (!affiliateIdExist) {
	iframeParams.push('language=' + language);
}
if (!('affCampaign' in alreadyExist)) {
	iframeParams.push('affCampaign=' + affCampaign);
}
if (cpySource !== '' && !('cpySource' in alreadyExist)) {
	iframeParams.push('cpy_source=' + cpySource);
}
if (!('utm_source' in alreadyExist)) {
	iframeParams.push('utm_source=affiliate');
}
if (!('utm_medium' in alreadyExist)) {
	iframeParams.push('utm_medium=' + affId);
}
if (!('isiframe' in alreadyExist)) {
	iframeParams.push('isiframe=true');
}
if (!('landing_page' in alreadyExist)) {
	iframeParams.push('landing_page=false');
}
if (affCurrency.length == 3) {
	iframeParams.push('currency=' + affCurrency);
}
if (!('iframeVersion' in alreadyExist)) {
	iframeParams.push('iframeVersion=' + iframeVersion);
}
if (!('host' in alreadyExist)) {
	iframeParams.push('host=' + window.location.href.split('?')[0]);
}
var newIframeUrl = iframeUrl + ('/?search=false') + '&' + iframeParams.join('&');
iframe.attr('src', newIframeUrl);

window.addEventListener('message', function (e) {
	var $iframe = jQuery('#' + travelstartIframeId);
	var eventName = e.data[0];
	var data = e.data[1];
	switch (eventName) {
		case 'setHeight':
			$iframe.height(data);
			setIframeSize(width, $iframe.height(data));
			break;
	}
}, false);

function setIframeSize(newWidth, newHeight) {
	iframe.css('width', newWidth);
	iframe.width(newWidth);
	iframe.css('height', newHeight);
	iframe.height(newHeight);
}
setIframeSize(width, height);
