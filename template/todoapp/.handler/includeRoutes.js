(function() {

    var fs = require('fs');

    io
		.File
		.getFactory()
		.registerHandler(/include\.routes\.js$/g, Class({
			Base: io.File,
			copyTo: function(uri){
				var source = this.read(),
					appConfig = app.config,
					referenceDir = uri.combine('.reference/');
	
				if (!appConfig || !appConfig.projects) {
					logger.warn('globals.txt errored - include.routes wont be copied');
					return;
				}
					
				var projects = appConfig.projects,
					key;
	
				for(key in projects){
					if (key === 'atma.toolkit') 
						continue;
					
					var folder = referenceDir.toLocalDir();
					if (fs.existsSync(folder) == false) {
						fs.mkdirSync(folder);
					}
	
					var target = referenceDir.combine(key + '/').toLocalDir();
					if (fs.existsSync(target)) {
						logger.warn('Warn - Dir exists -', target);
						continue;
					}
	
					io
						.Directory
						.symlink(new net.Uri(projects[key].path).toLocalDir(), target);
				}
	
				new io
					.File(uri)
					.write(source.replace('%ROUTES%', JSON.stringify(appConfig.defaultRoutes, null, 5)));
			}
		}));
}());
