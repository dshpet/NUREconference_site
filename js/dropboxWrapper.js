// needs Dropbox SDK
// https://github.com/dropbox/dropbox-sdk-js
// <script src="https://unpkg.com/dropbox/dist/Dropbox-sdk.min.js"></script>

function DropboxWrapper() {
	this.dbx = new Dropbox({ 
	    accessToken: 'SdpQ9VQetwAAAAAAAAAADGoitoKomn34rv1Jg00gjfMJsLLCvO6emOzEELNBwcf_'
    });
}

DropboxWrapper.prototype.forEachMaterialFile = function(callback) {
	this.forEachFile('/Materials', callback);
};

DropboxWrapper.prototype.forEachImageFile = function(callback) {
	this.forEachFile('/Images', callback);
};

// ignoring errors for now
DropboxWrapper.prototype.forEachFile = function(path, callback) {
	var wrapper = this;
	this.dbx.filesListFolder({path: path})
	  .then(function(response) {
	  	for (var i = 0; i < response.entries.length; ++i) {
	  		wrapper.getRichEntry(response.entries[i], callback);
	  	}
	  });
};

DropboxWrapper.prototype.uploadImage = function(file, callback) {
	this.uploadFile('/Images', file, callback);
}

DropboxWrapper.prototype.uploadMaterial = function(file, callback) {
	this.uploadFile('/Materials', file, callback);
}

DropboxWrapper.prototype.uploadFile = function(path, file, callback) {
	var wrapper = this;
	this.dbx.filesUpload({path: path + "/" + file.name, contents: file})
		.then(function(response) {
			console.log(response);
	    	wrapper.getRichEntry(response, callback);
	  	})
		.catch(function(e) {
			console.log(e);
		})
}

DropboxWrapper.prototype.deleteImage = function(name, callback) {
	this.deleteFile('/Images/' + name, callback);
}

DropboxWrapper.prototype.deleteMaterial = function(name, callback) {
	this.deleteFile('/Materials/' + name, callback);
}

DropboxWrapper.prototype.deleteFile = function(path, callback) {
	this.dbx.filesDelete({path: path})
		.then(function(response) {
			callback();
		})
		.catch(function(e) {
			callback({error: e});
			console.log(e);
		});
}

DropboxWrapper.prototype.getRichEntry = function(entry, callback) {
  this.dbx.sharingCreateSharedLink({path: entry.path_display, short_url: false})
		.then(function(data) {
			var link = data.url;
			// https://milanaryal.com/hosting-images-with-dropbox-on-your-website/
			data.staticLink = link.substring(0, link.length-5) + "?raw=1";
			data.name       = link.substring(link.lastIndexOf('/') + 1, link.length-5);
			callback(data);
		})
		.catch(function(e) {
			console.log(e);
		});
}