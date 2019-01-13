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
            $("#result-count").html(data.length)
        }
    });
});

$(".details-btn").on("click", (event) => {
    var id = $(event.target).attr("id").split("-")[1];
    displayModal(id);
});

$(".addToCart").on("click", (event) => {
    var id = $(event.target).attr("id").split("-")[1];
    addToCart(id);
});

$(".checkout").on("click", () => {
    $.ajax({
        url: "/checkout",
        method: "POST",
        success: (res) => {
            alert(res.response);
            window.location.replace("/");
        }
    });
});

$(".delete-cart-item").on("click", (event) => {
    console.log("click");
    var id = $(event.target).attr("id").split("-")[1];
    // make a call to the server to remove it from session variables
    $.ajax({
        url: "/cart/remove",
        method: "POST",
        data: {
            itemID: id,
        },
        success: (res) => {
            var itemCount = res.count;
            if(itemCount == 0)
                window.location.replace("/cart");

            $($(event.target).parent().parent()).remove();
            
            $("#item-count-cart").html(`${itemCount} items in the cart`);
            $("#item-count").html(`(${itemCount})`);
            $("#totalAmmount").html(`${res.total} DKK`)
        }
    })
})

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
            //assign appropriate images
            $("#product-images").html(createImageString(res.images));
            $("#addToCartModal").attr("id", `add-${res.id}`);
            //display the modal with details
            $("#details-modal").modal("show");
        }
    });
}

function addToCart(id){
    $.ajax({    
        url: "/cart/add",
        method: "POST",
        data: {
            itemID: id,
        },
        success: (res) => {
            $("#item-count").html(`(${res.size})`);
        },
        error: (err) => {
            alert(err);
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
                str += `<button class="btn btn-success addToCart" onclick="addToCart(${data.id})" id="add-${data.id}">Add to cart</button>`;
            str += `</div>`;//end card-body
        str += `</div>`;//end col
    str += `</div>`;//end card
    return str;
}

function createImageString(images){
    var str = "";
    var first = true;
    images.forEach(elem => {
        if(first == true)
            str += `<div class="carousel-item active">`;
        else 
            str += `<div class="carousel-item">`;
        str += `<img class="d-block w-100" src="/images/${elem}" alt="Laptop img">`;
        str += `</div>`;
        first = false;
    });
    return str;
}