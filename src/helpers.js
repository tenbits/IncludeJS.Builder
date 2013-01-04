(function() {
    
    global.urlhelper = {
        resolveAppUri: function(url, current) {
            if (url[0] == '/') {
                return url;
            }
            if (!current || url.substring(0, 4) == 'file') {
                return '/';
            }

            var index = current.lastIndexOf('/');
            return (index == -1 ? '/' : (current.substring(index + 1, -index))) + url;
        },
        resolveUri: function(url, parentLocation) {
            if (solution == null) {
                return new net.URI('');
            }
            
            if (url[0] == '/'){
                parentLocation = solution.directory;
                url = url.substring(1);
            }
            
            var uri = new net.URI(url);
            
            return uri.isRelative() ? (new net.URI(parentLocation)).combine(uri) : uri;            
        },
        getDir: function(url) {
            if (!url) {
                return '/';
            }
            var index = url.lastIndexOf('/');
            return index == -1 ? '' : url.substring(index + 1, -index);
        },
        isSubDir: function(basepath, path){
            var basedir = this.getDir(basepath),
                dir = this.getDir(path);
            
            return dir.toLowerCase().indexOf(basedir.toLowerCase()) == 0;
        }
    }
    
}());