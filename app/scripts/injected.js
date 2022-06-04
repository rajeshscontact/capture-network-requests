// You CANNOT use `browser`/`chrome` here and you CANNOT interact with extension stuff like storage and tabs.

const XHR = XMLHttpRequest.prototype

const open = XHR.open
const send = XHR.send
const setRequestHeader = XHR.setRequestHeader

XHR.open = function () {
	this._requestHeaders = {}

	return open.apply(this, arguments)
}

XHR.setRequestHeader = function (header, value) {
	this._requestHeaders[header] = value
	return setRequestHeader.apply(this, arguments)
}

XHR.send = function () {

	this.addEventListener('load', function () {
		const url = this.responseURL
		const responseHeaders = this.getAllResponseHeaders()
		const requestBody = this.requestBody
		const requestHeaders = this._requestHeaders

		if (url === 'https://apac.presence.teams.microsoft.com/v1/presence/getpresence/') {
			console.log("1212121121211.", this);
			console.log("1212121121211.XHR", XHR);
		}

		try {
			if (this.responseType != 'blob') {
				let responseBody
				if (this.responseType === '' || this.responseType === 'text') {
					responseBody = JSON.parse(this.responseText)
				} else /* if (this.responseType === 'json') */ {
					responseBody = this.response
				}
				// Do your stuff HERE.
				console.log("++++++++++++++++++++++++++++++++++++++++", {url, responseBody, responseHeaders, requestBody, requestHeaders});
			}
		} catch (err) {
			console.debug("Error reading or processing response.", err)
		}
	})

	return send.apply(this, arguments)
}
