$(function() {

     
    
    $(".agregar").click(function(e){
        e.preventDefault()
        let elemento = e.target
        let id = $(elemento).data("id");
        

        $.ajax({
            type: "POST",
            url: `http://localhost:3000/agregar/${id}`,
            error: function (error) {
              alert("Hubo un error, intente más tarde");
            },
          });
    })

    $("#carrito").click(function(){
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/carrito",
            dataType: "json",
            success: function (carrito) {
                
                let contenidoHTML = carrito.map(function(carro) {
                    return `<div style= "display: inline";>
                                <img src="${carro.img}" alt="" style="width: 60px; height: 60px;">
                                
                            </div>`;
                }).join(""); 
    
                
                $("#imagenCarrito").html(contenidoHTML);
            },
            error: function (error) {
                alert("Hubo un error, intente más tarde");
            }
        });
        $("#modalCarrito").modal("show");
    });
    
});

