module.exports = [
	{
		match: [ './build/assets/*.{js,css}' ],
		fn: function (event, file) {
			this.reload();
		}
	}
];
