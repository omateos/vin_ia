function uploadfilex(url, filename)
{
	var xhr = new XMLHttpRequest();
	alert(filename);
	xhr.open('GET', filename, true);
	xhr.responseType = 'blob';
	xhr.onreadystatechange = function() {
	  if (this.readyState == 4)
	  {
		if (this.status == 200)
		{
			document.getElementById("txtBastidor").value = "Datos obtenidos del fichero.";
			var blob = this.response;
			var file = new File([blob], filename);
			var xhr = new XMLHttpRequest();
			var fd = new FormData();
			xhr.open("POST", url, true);
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4)
				{
					if (xhr.status == 200)
						document.getElementById("txtBastidor").value = xhr.response;
					else
						document.getElementById("txtBastidor").value = "Error al enviar el fichero al servidor.";
				}
			};
			fd.append('upload_file', file);
			fd.append('name', filename);
			xhr.send(fd);
		}
		else
			document.getElementById("txtBastidor").value = "Error obteniendo los datos del fichero.";
	  }
	};
	xhr.send();
}

function fileUriToPath (uri) {
  if ('string' != typeof uri ||
      uri.length <= 7 ||
      'file://' != uri.substring(0, 7)) {
    throw new TypeError('must pass in a file:// URI to convert to a file path');
  }

  var rest = decodeURI(uri.substring(7));
  var firstSlash = rest.indexOf('/');
  var host = rest.substring(0, firstSlash);
  var path = rest.substring(firstSlash + 1);

  // 2.  Scheme Definition
  // As a special case, <host> can be the string "localhost" or the empty
  // string; this is interpreted as "the machine from which the URL is
  // being interpreted".
  if ('localhost' == host) host = '';

  if (host) {
    host = sep + sep + host;
  }

  // 3.2  Drives, drive letters, mount points, file system root
  // Drive letters are mapped into the top of a file URI in various ways,
  // depending on the implementation; some applications substitute
  // vertical bar ("|") for the colon after the drive letter, yielding
  // "file:///c|/tmp/test.txt".  In some cases, the colon is left
  // unchanged, as in "file:///c:/tmp/test.txt".  In other cases, the
  // colon is simply omitted, as in "file:///c/tmp/test.txt".
  path = path.replace(/^(.+)\|/, '$1:');

	sep='\\';

  // for Windows, we need to invert the path separators from what a URI uses
  if (sep == '\\') {
    path = path.replace(/\//g, '\\');
  }

  if (/^.+\:/.test(path)) {
    // has Windows drive at beginning of path
  } else {
    // unix path…
    path = sep + path;
  }

  return host + path;
}