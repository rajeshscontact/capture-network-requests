import { browser } from 'webextension-polyfill-ts'

// You can use `browser`/`chrome` here and interact with extension stuff like storage and tabs.

const s = document.createElement('script')
s.src = browser.extension.getURL('scripts/injected.js')
s.onload = async function () {
	(this as any).remove()
};
(document.head || document.documentElement).appendChild(s)
