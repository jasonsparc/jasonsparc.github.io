
// Automatic links
$(document).ready(function(){
	$("a:not([href])").each(function(){
		var a = $(this);
		var pref;
		switch(a.attr("data-type")) {
		case "email":
			pref = "mailto:"
			break;
		case "http":
			pref = "http://"
			break;
		case "https":
			pref = "https://"
			break;
		default:
			a.attr("href", a.text());
			return;
		}
		a.attr("href", pref + a.text());
	})
});

// Parse skills
$(document).ready(function(){
	$("ul.skills").each(function(){
		var $this = $(this);
		$this.find(">li>ul>li").each(function() {
			var $this = $(this);
			var counter=0;
			$this.html($this.html()
				.replace(/\s*(?:<[^\/]*(?:<\/|\/>)|(\(|\)))/gm, function(x, p1) {
					switch (p1) {
						case '(':
							return counter++===0? "<wbr><span class=subskills>"+x : x;
						case ')':
							return counter>0 && --counter===0? x+"</span>" : x;
					}
					return x;
				}));
			$this.find(">.subskills").each(function() {
				var $this = $(this);
				var arr = $this.html()
					.match(/^(\s*\()([\s\S]*)(\)\s*)$/m);
				$this.html(arr[1]
					+ arr[2].replace(/([^,\s](?:\s*[^,\s])*)(\s*,)?/g,"<b>$1</b>$2")
					+ arr[3]);
				/*var $b = $this.find(">b");
				var $b_length = $b.length;
				$b.css("z-index", function(index) {
					return $b_length - index;
				});*/
				$this.contents().filter(function() {
					return this.nodeType === 3;
				}).wrap("<del/>");
			});
		});
		$this.find("li").each(function() {
			var endFound;
			$(this).contents().filter(function() {
				if (endFound)
					return false;
				switch(this.tagName) {
				case "UL":
				case "WBR":
					endFound = true;
					return false;
				default:
					return true;
				}
			}).wrapAll("<span/>");
		});
	});
});
