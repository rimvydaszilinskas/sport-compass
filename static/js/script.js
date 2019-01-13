$("select").on("change", (event) => {
    var obj = {
        target: $(event.target).closest("select").attr("id"),
        value: $(event.target).val()
    }
    console.log(obj);
});

$(".details-btn").on("click", () => {
    $("#details-modal").modal("show");
});