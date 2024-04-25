const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const fs = require('fs').promises;

app.listen(3000, () => {
console.log("El servidor está inicializado en el puerto 3000");
});

app.set("view engine", "handlebars");
app.engine(
    "handlebars",
    exphbs.engine({
    layoutsDir: __dirname + "/views",
    })
);

app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use(express.static('assets'))

let carrito = []

app.get("/", async(req, res) =>{
    const ruta =( __dirname + "/assets/database/productos.json")
    let data = await fs.readFile(ruta, 'utf8')
    data = JSON.parse(data)
    let productos = data.productos
    res.render("main",{
        productos,
        carrito
    })
    
})

app.get("/carrito", async(req, res) =>{
    res.send(
        carrito
    )
    
})

    

    app.post("/agregar/:id", async(req, res) =>{
        let id = req.params.id
        const ruta =( __dirname + "/assets/database/productos.json")
        let data = await fs.readFile(ruta, 'utf8')
        data = JSON.parse(data)
        let productos = data.productos
        
        productos.map((producto) =>{
            if(producto.id == id){
                carrito.push(producto)
            }
        })
        
    })

    