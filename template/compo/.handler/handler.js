
include.exports = Class({
    process: function(config, done){

        var name = config.args[1];

        if (!name){
            logger.error('Compo-name undefined. Usage > atma template compo %NAME%');
            return;
        };

        config.name = name;

        ruqq.arr.each(config.sourceDir.readFiles().files, function(file){

            var content = String.format(file.read(), config),
                path = file
                    .uri
                    .toRelativeString(config.sourceDir.uri),
                
                url = config
                    .targetDir
                    .uri
                    .combine(name + '/')
                    .combine(String.format(path, config));

            new io.File(url).write(content);
        });

        done();
    }
});
