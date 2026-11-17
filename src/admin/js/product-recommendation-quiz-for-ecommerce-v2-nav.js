/* global prqV2AdminNav */
(function () {
	'use strict';

	const iframe = document.querySelector('iframe[name="app-iframe"]');
	if (!iframe) return;
	const origin = new URL(prqV2AdminNav.adminUrl).origin;
	const paths = prqV2AdminNav.paths;
	const links = document.querySelectorAll('#toplevel_page_prqfw .wp-submenu a');

	window.addEventListener('message', function (event) {
		if (event.origin !== origin || event.source !== iframe.contentWindow) return;
		const data = event.data;
		if (!data || data.type !== 'rh:navigate' || !paths.includes(data.path)) return;

		links.forEach(function (link) {
			const path = new URL(link.href).searchParams.get('path') || paths[0];
			const active = path === data.path;
			link.parentElement.classList.toggle('current', active);
			link.classList.toggle('current', active);
			if (active) link.setAttribute('aria-current', 'page');
			else link.removeAttribute('aria-current');
		});
		const url = new URL(window.location.href);
		url.searchParams.set('path', data.path);
		window.history.replaceState(window.history.state, '', url);
	});
})();
