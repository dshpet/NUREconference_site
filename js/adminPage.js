var db = new DropboxWrapper();

$(document).on('click', '.menuLink', function () {
  var ele = $(this);
  var hash = ele.prop('hash');

  $('.containerData').hide();
  $(hash).show();
  $('.menuLink').closest('li').removeClass('active');
  ele.closest('li').addClass('active');
});

$(document).on('click', '.addNewFile', function () {
  $('#input-material').trigger('click');
});

function addFile(name, link) {
	var tr   = $('<tr>');
	var td   = $('<td>');
	var span = $('<span class="glyphicon glyphicon-remove">');
	span.click(function() {
		removeFile(tr, name);
	});
	
	tr.append($('<td>' + name + '</td>'));
	td.append(span);
	tr.append(td);

  $('#file-table-body').append(tr);
}

function removeFile(tr, name) {
	db.deleteMaterial(name, function(err) {
		if (err)
			return; // maybe some flashy red animation?

		$(tr).remove();
	})
}

$(document).ready(function() {
	$('#input-material').change(function() {
		var files = $(this).context.files;
		
		for (var i = 0; i < files.length; ++i) {
			db.uploadMaterial(files[i], function(file) {
				addFile(file.name, file.staticLink);
			})
		}
	});

	db.forEachMaterialFile(function(file) {
		addFile(file.name, file.staticLink);		
	})
});

