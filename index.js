function download() {
	let oContent = document.getElementById("content");

	domtoimage.toBlob(oContent).then((blob) => {
		saveAs(blob, "download.png");
	});
}