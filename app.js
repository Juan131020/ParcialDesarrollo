var express = require('express');
var app = express();
var baseJuegos=[];

var bodyParser = require("body-parser");
const { response } = require('express');
const { report } = require('process');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
   
    res.sendFile('vista.html', { root: __dirname });
});
app.get('/mostrar-videojuegos', function (req, res) {
    var html='<table><tr><th> id </th><th>     titulo     </th> <th>   estudio   </th> <th>    fecha    </th><th>    edad    </th><th>   descripcion   <th></tr>';
    for(let i=0;i<baseJuegos.length;i++){
        html=html+'<tr>'+'<th>'+baseJuegos[i].id+'</th>'+'<th>'+baseJuegos[i].titulo+'</th>'+'<th>'+baseJuegos[i].estudio+'</th>'+'<th>'+baseJuegos[i].fecha+'</th>'+'<th>'+baseJuegos[i].edad+'</th>'+'<th>'+baseJuegos[i].descripcion+'</th>'+'</tr>';
        
    }
    html=html+'</table>'+ '<br><br><a class="navi2" href="/">Volver</a>';
    res.send(html);
   

});
app.post('/mostrar-juegos', function (req, res) {
    var titulo=req.body.titulo;
    var estudio=req.body.estudio;
    var fecha=req.body.lanzamiento;
    var edad= req.body.edad;
    var descripcion=req.body.descripcion;
  
    var videojuego= new Videojuego(baseJuegos.length+1,titulo,estudio,fecha,edad,descripcion);
    baseJuegos.push(videojuego);
    console.log(baseJuegos);
    res.send('videojuego guardado corrrectamente');

}
);
app.get('/eliminar',function(req,res){
    res.sendFile('eliminarVideojuegos.html',{root:__dirname});
});
app.post('/eliminar',function(req,res){
    var nuevaBase=[];
   for(let i=0;i<baseJuegos.length;i++){
        if(baseJuegos[i].id==(req.body.id)){
           console.log('si compara');
        }
        else{
           nuevaBase.push(baseJuegos[i]);
        }
    }
    baseJuegos=nuevaBase;
    res.send('<p>Videojuego eliminado correctamente</p> <br><a class="navi2" href="/eliminar">volver</a>');
}
);
app.get('/buscar-juego1',function(req,res){
  res.sendFile('buscarId.html',{root:__dirname});
}
);
app.post('/buscar-id',function(req,res){
    var j=0;
    
    var id= req.body.id;
    for(let i=0;i<baseJuegos.length;i++){
        if(baseJuegos[i].id==id){
            j=i+1;
            console.log(j);
        }
    }
    if(j==0){
        res.send('<p>El juego que busca no existe</p><br><a class="navi2" href="/buscar-juego1">volver</a>')
    }
    else{
        
        res.send('<div>El nombre del juego es:'+baseJuegos[j-1].titulo+'</div><br>'+'<div>Este fue lanzado en el año: '+baseJuegos[j-1].fecha+'</div><br>'+'<div>Fue creado por:'+baseJuegos[j-1].estudio+'</div>');
    }
}
);
app.get('/buscar-juego2',function(req,res){
    res.sendFile('buscarId.html',{root:__dirname});
  }
  );
  app.post('/buscar-id2',function(req,res){
    var j=0;
    
    var nombre= req.body.nombre;
    for(let i=0;i<baseJuegos.length;i++){
        if(baseJuegos[i].titulo==nombre){
            j=i+1;
            console.log(j);
        }
    }
    if(j==0){
        res.send('<p>El juego que busca no existe</p><br><a class="navi2" href="/buscar-juego2">volver</a>')
    }
    else{
        
        res.send('<div>El nombre del juego es:'+baseJuegos[j-1].titulo+'</div><br>'+'<div>Este fue lanzado en el año: '+baseJuegos[j-1].fecha+'</div><br>'+'<div>Fue creado por:'+baseJuegos[j-1].estudio+'</div>');
    }
}
);
  app.get('/buscar-juego2',function(req,res){
    res.sendFile('buscarNomb.html',{root:__dirname});
  }
  );
var server = app.listen(5000, function () {
    console.log('App corriendo en puerto 5000');
});
function Videojuego(id,titulo,estudio,fecha, edad, descripcion){
    this.id=id;
    this.titulo=titulo;
    this.estudio=estudio;
    this.descripcion=descripcion;
    this.fecha=fecha;
    this.edad=edad;

}