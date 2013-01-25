
global.config = [{
	file: "index.dev.html",
	outputMain: "index.html",
	outputSources: "index.build",
	action: "build",
	minify: true,
	uglify: {
		global_defs: {
			DEBUG: false
		}
	},
	jshint: {
		options: {
			"curly": true,
			"eqeqeq": false,
			"immed": true,
			"latedef": true,
			"newcap": false,
			"noarg": true,
			"sub": true,
			"undef": true,
			"boss": false,
			"eqnull": true,
			"node": true,
			"es5": true,
			"strict": false,
			"smarttabs": true,
			"expr": true,
			"evil": true
		},

		"globals": {
			"window": false,
			"document": false,
			"XMLHttpRequest": false,
			"IncludeRewrites": false,
			"Class": false,
			"Compo": false,
			"CompoUtils": false,
			"mask": false,
			"ruqq": false,
			"include": false,
			"$": false
		},

		ignore: {
			"iscroll-full.js": 1,
			"mobiscroll.js": 1,
			"prism.lib.js": 1,
			"jquery.js": 1
		}
	}
}];