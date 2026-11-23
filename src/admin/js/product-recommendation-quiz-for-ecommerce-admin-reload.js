(function () {
	'use strict';

	const iframe = document.querySelector('iframe[name="app-iframe"]');
	if (!iframe || !iframe.src) return;

	window.addEventListener('message', function (event) {
		if (!event.data || event.data.type !== 'rh:reload') return;
		if (event.source !== iframe.contentWindow || event.origin !== new URL(iframe.src).origin) return;
		window.location.reload();
	});
})();
