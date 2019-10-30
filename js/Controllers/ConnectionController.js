class ConnectionController {
    url = 'http://tapreck.com:8000';
    api_key = null;

    getData(slug, data) {
        console.log(this.url + slug);
        $.ajax({
            url: this.url + slug ,
            dataType: 'html',
            type: 'post',
            contentType: 'application/x-www-form-urlencoded',
            data: data,
            success: function(result){
                return result
            }
        });
    }
}