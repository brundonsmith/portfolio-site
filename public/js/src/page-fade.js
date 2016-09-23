var fadeLinks = document.querySelectorAll('a:not([target="_blank"])');
for(var i = 0; i < fadeLinks.length; i++){
	var elem = fadeLinks[i];
	elem.onclick = function(){// Don't go to the next page yet.
		event.preventDefault();
		var linkLocation;
		var openInNewTab = this.getAttribute('target') === '_blank';

		if(typeof this.href !== 'undefined') {
			linkLocation = this.href;
		} else {
			linkLocation = this.getAttribute('data-url');
		}

		if(openInNewTab) {
			window.open(linkLocation);
		} else {
			document.getElementsByTagName('body')[0].classList.add('fadeout');
			setTimeout(function(){
				window.location = linkLocation;
			}, 500);
		}
		return false;
	};
}
