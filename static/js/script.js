$("select").on("change", (event) => {
    var filters = {};

    if($("#processor").val() !== "*")
        filters.processor = $("#processor").val();
    if($("#screen-size").val() !== "*")
        filters.screenSize = $("#screen-size").val();
    if($("#price").val() !== "*")
        filters.price = $("#price").val();    

    $.ajax({
        url: "/api/filter",
        method: "POST",
        data: filters,
        success: (data) => {
            // create the string for the data
            var str = "";
            // append the data to the string
            data.forEach(element => {
                str += createString(element);
            });

            //output the string
            $("#product-row").html(str);
        }
    });
});

$(".details-btn").on("click", (event) => {
    var id = $(event.target).attr("id").split("-")[1];
    displayModal(id);
});

function displayModal(id){

    $.ajax({
        url: "/api/get",
        method: "POST",
        data: {
            itemID: id
        },
        success: (res) => {
            //set all the correct data for modal
            $("#titleModal").html(res.manufacturer + " " + res.model);
            $("#descriptionModal").html(res.description);
            $("#manufacturerModal").html(res.manufacturer);
            $("#modelModal").html(res.model);
            $("#processorModal").html(res.processor);
            $("#graphics-cardModal").html(res.graphics);
            $("#screen-sizeModal").html(res.screensize);
            $("#storageModal").html(res.storage);

            //display the modal with details
            $("#details-modal").modal("show");
        }
    });
}

function createString(data){
    var str = '';
    str += `<div class="col">`;
        str += `<div class="card" style="width: 18rem;">`;
            str += `<img class="card-img-top" src="/images/${data.images[0]}" alt="Computer image">`;
            str += `<div class="card-body>"`;
                str += `<h5 class="card-title">${data.manufacturer} ${data.model}</h5>`;
                str += `<p class="card-text">${data.processor} | ${data.screensize} | ${data.price} DKK</p>`;
                str += `<button class="btn btn-primary details-btn" onclick="displayModal(${data.id})" id="details-${data.id}">View details</button>`;
                str += `<button class="btn btn-success addToCart" id="add-${data.id}">Add to cart</button>`;
            str += `</div>`;//end card-body
        str += `</div>`;//end col
    str += `</div>`;//end card
    return str;
}