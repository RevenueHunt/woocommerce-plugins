/* global prqV2AdminNav */
(function () {
	'use strict';

	const iframe = document.querySelector('iframe[name="app-iframe"]');
	if (!iframe) return;
	const origin = new URL(prqV2AdminNav.adminUrl).origin;
	const paths = prqV2AdminNav.paths;
	const links = document.querySelectorAll('#toplevel_page_prqfw .wp-submenu a');
	const pathOf = function (link) {
		return new URL(link.href).searchParams.get('path') || paths[0];
	};
	// The app announces its page after each iframe load once it can route; until then a menu
	// click loads the page as usual.
	let ready = false;

	// Our own menu entries route inside the app, so it (and Copilot beside it) stays loaded.
	document.querySelectorAll('#toplevel_page_prqfw > a, #toplevel_page_prqfw .wp-submenu a').forEach(function (link) {
		link.addEventListener('click', function (event) {
			if (!ready || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
			event.preventDefault();
			iframe.contentWindow.postMessage({ type: 'rh:navigate', path: pathOf(link) }, origin);
		});
	});

	// A reloaded iframe may hold no app, or one that closed its full-screen window without saying so.
	iframe.addEventListener('load', function () {
		ready = false;
		document.body.classList.remove('prq-fullscreen');
	});

	window.addEventListener('message', function (event) {
		if (event.origin !== origin || event.source !== iframe.contentWindow) return;
		const data = event.data;
		if (data && data.type === 'rh:fullscreen') {
			document.body.classList.toggle('prq-fullscreen', data.open === true);
			return;
		}
		if (!data || data.type !== 'rh:navigate' || !paths.includes(data.path)) return;
		ready = true;

		links.forEach(function (link) {
			const active = pathOf(link) === data.path;
			link.parentElement.classList.toggle('current', active);
			link.classList.toggle('current', active);
			if (active) link.setAttribute('aria-current', 'page');
			else link.removeAttribute('aria-current');
		});
		// The app's own navigation already added a history entry: only the address follows.
		const url = new URL(window.location.href);
		url.searchParams.set('path', data.path);
		window.history.replaceState(window.history.state, '', url);
	});
})();
