// $(document).ready(function() {

articles()

function articles(){
    $.ajax({
        method: "GET",
        url: "/getArticles"
    }).then(function(data){
        $(".articleName").append(data[0].title);
    })


}



$.getJSON("/getArticles", function(data){
    // for(i=0; i<data.length; i++){
    // $(".articleName").append("<p data-id='" + data[i]._id + "'>" 
    // + data[i].title + "<br />" + data[i].url + "<br />" 
    // + data[i].summary + "</p>")
    // }
    // console.log("Data length:" +  data.length + "data title:" + data[i].title)
    console.log(data);
    console.log("hadi burpee");

    });

// });