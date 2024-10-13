document.getElementById('photoUpload').addEventListener('change', function(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
        document.getElementById('profilePhoto').src = event.target.result;
    }
    reader.readAsDataURL(file);
});