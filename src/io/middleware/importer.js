(function() {

	/**
	 Import any file into processed file

	 //import filepath

	 */

	include.exports = function(file) {
		var code = file.content,
			defines;

		if (typeof code !== 'string') {
			code = code.toString();
		}

		file.content = process(file.uri, code);

	};

	var importStatement = /^[\t ]*\/\/[ ]+import[ ]+?(([^\n\r'" ]+)|('|"([^'"]+)))/gm;

	function process(currentUri, code) {

		return code.replace(importStatement, function(full, full1, match1, full2, match2) {

			var path = match1 || match2,
				uri;

			if (!path) {
				console.error('Path can not be extracted', full);
				return full;
			}

			if (path[0] === '/') {
				uri = io.env.currentDir.combine(path);
			} else {
				uri = currentUri.combine(path);
			}

			var file = new io.File(uri);
			if (file.exists() === false) {
				console.error('File Importer: File does not exists', file.uri.toLocalFile());
				return full;
			}

			var indent = full.substring(0, full.indexOf('//')),
				content = file.read().toString();

			if (indent) {
				var newLineMatch = /(\r\n)|(\r)|(\n)/.exec(content),
					newLine = newLineMatch && newLineMatch[0];

				content = content.split(newLine).map(function(line) {
					return indent + line;
				}).join(newLine);
				}


				console.log(color(String.format('green{File Import %1 into %2}', uri.file, currentUri.file)));

				return full.replace('import', 'source') + io.env.newLine + content;
			});
		}

	}());
