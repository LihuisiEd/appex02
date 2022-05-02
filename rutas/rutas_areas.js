var mongojs = require('mongojs');
var uri = 'mongodb://localhost:27017/Lab02';
var db = mongojs(uri,["Areas"]);

function Areas_listado(req, res){
	db.Areas.find().sort({nombre:1}, function(err,records)
	{
		if (err) {
			console.log("Error al acceder a la base de datos.");
			return;
		}
		res.render('m_areas_listado',{records:records});
	});

}


function grabar_nuevo(req, res) {
	var xnom = req.body.xnom;
	var xab = req.body.xab;
    var xest = req.body.xest;
	db.Areas.find().sort({_id:-1}, function(err, records)
	{
		if(err) {
			console.log('Error al acceder a la base de Datos.');
			res.end();
			return;
		}
		var xid = records [0]._id + 1;
		db.Areas.insertOne({_id:xid, nombre:xnom, abreviatura:xab, estado:xest}, function(){
			res.redirect('/m_areas_listado');
		})
	});
}

function editar(req, res){
	var xid = req.params.xid*1;
	db.Areas.find({_id:xid}).sort({_id:1},function(err,records)
	{
		if(err){
			console.log('Error al acceder a la base de datos.');
			res.end();
			return;
		}
		res.render('m_areas_editar',{area: records[0]});
	});
}

function grabar_editar(req, res){
	var xid = req.body.xid*1;
	var xnom = req.body.xnom;
    var xab = req.body.xab;
	var xest = req.body.xest;
	db.Areas.update({_id:xid}, {$set:{nombre:xnom, abreviatura:xab, estado:xest}}, function(){
		res.redirect('/m_areas_listado');
	});
}



module.exports = {
	listado: function(req,res){
		Areas_listado(req,res);
	},
	
	nuevo: function(req,res){
		res.render('m_areas_nuevo',{})
	},

	grabarnuevo: function(req,res){
		grabar_nuevo(req,res);
	},

    editar: function(req, res){
        editar(req, res);
    },

    grabareditar: function(req, res){
		grabar_editar(req, res);
	},

    eliminar: function(req, res){
        var xid = req.params.xid*1;
        db.Areas.remove({_id:xid}, function(){
            res.redirect('/m_areas_listado');
        });
    },

};