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
  this.dbx.filesUpload(
    {
      path:       transliterate(path + "/" + file.name),
      contents:   file,
      autorename: true
    })
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
      data.extension  = data.name.substring(data.name.lastIndexOf('.') + 1);
      callback(data);
    })
    .catch(function(e) {
      console.log(e);
    });
}

function transliterate(str) {
  var cyrillicToLatin = [
      ['а', 'a'],
      ['б', 'b'],
      ['в', 'v'],
      ['г', 'g'],
      ['д', 'd'],
      ['е', 'e'],
      ['ё', 'yo'],
      ['ж', 'zh'],
      ['з', 'z'],
      ['и', 'i'],
      ['й', 'y'],
      ['к', 'k'],
      ['л', 'l'],
      ['м', 'm'],
      ['н', 'n'],
      ['о', 'o'],
      ['п', 'p'],
      ['р', 'r'],
      ['с', 's'],
      ['т', 't'],
      ['у', 'u'],
      ['ф', 'f'],
      ['х', 'h'],
      ['ц', 'c'],
      ['ч', 'ch'],
      ['ш', 'sh'],
      ['щ', 'shch'],
      ['ъ', ''],
      ['ы', 'y'],
      ['ь', ''],
      ['э', 'e'],
      ['ю', 'yu'],
      ['я', 'ya'],
      ['А', 'A'],
      ['Б', 'B'],
      ['В', 'V'],
      ['Г', 'G'],
      ['Д', 'D'],
      ['Е', 'E'],
      ['Ё', 'YO'],
      ['Ж', 'ZH'],
      ['З', 'Z'],
      ['И', 'I'],
      ['Й', 'Y'],
      ['К', 'K'],
      ['Л', 'L'],
      ['М', 'M'],
      ['Н', 'N'],
      ['О', 'O'],
      ['П', 'P'],
      ['Р', 'R'],
      ['С', 'S'],
      ['Т', 'T'],
      ['У', 'U'],
      ['Ф', 'F'],
      ['Х', 'H'],
      ['Ц', 'C'],
      ['Ч', 'CH'],
      ['Ш', 'SH'],
      ['Щ', 'SHCH'],
      ['Ъ', ''],
      ['Ы', 'Y'],
      ['Ь', ''],
      ['Э', 'E'],
      ['Ю', 'YU'],
      ['Я', 'YA'],
      ['і', 'i'],
      ['ї', 'yi'],
      ['є', 'ye'],
      ['І', 'I'],
      ['Ї', 'YI'],
      ['Є', 'YE']
    ];

  for (var i = 0; i < str.length; ++i) {
    for (var j = 0; j < cyrillicToLatin.length; ++j) {
      str = str.replace(cyrillicToLatin[j][0], cyrillicToLatin[j][1]);
    }
  }

  return str;
}