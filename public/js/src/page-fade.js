var fadeLinks = document.getElementsByTagName('a');
for(var i = 0; i < fadeLinks.length; i++){
	var elem = fadeLinks[i];
	elem.onclick = function(){// Don't go to the next page yet.
		event.preventDefault();
		if(typeof this.href !== 'undefined') {
			var linkLocation = this.href;
		} else {
			var linkLocation = this.getAttribute('data-url');
		}

		document.getElementsByTagName('body')[0].classList.add('fadeout');
		setTimeout(function(){
			window.location = linkLocation;
		}, 500);

		return false;
	};
}
