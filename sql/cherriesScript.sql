-- CREACION DE TABLAS
CREATE TABLE fah_paises(
	id integer(2) PRIMARY KEY,
    nombre varchar(20) NOT NULL UNIQUE,
    continent varchar(7) NOT NULL,
    CONSTRAINT t_continent CHECK (continent in ("América", 'Europa', 'África', 'Asia', 'Oceanía'))
);

CREATE TABLE fah_ciudades(
	id_pais int(2) NOT NULL,
    id	int(2) NOT NULL,
    nombre varchar(20) NOT NULL,
	CONSTRAINT pk_cdad PRIMARY KEY (id_pais,id),
    CONSTRAINT fk_pais_cdad FOREIGN KEY (id_pais) REFERENCES fah_paises (id)
);

CREATE TABLE fah_regiones(
	id_pais int(2) NOT NULL,
    id int(2) NOT NULL,
    nombre varchar(40) NOT NULL,
    CONSTRAINT pk_reg PRIMARY KEY (id_pais,id),
    CONSTRAINT fk_pais_reg FOREIGN KEY (id_pais) REFERENCES fah_paises (id)
);

CREATE TABLE fah_variedadescrz (
	id int(2) PRIMARY KEY,
    nombre varchar(15) UNIQUE NOT NULL,
    especie varchar(14) NOT NULL,
    preco varchar(14) NOT NULL,
    id_pais int(2) NOT NULL,
    descrip varchar(200),
    CONSTRAINT fk_pais_crz FOREIGN KEY (id_pais) REFERENCES fah_paises(id),
    CONSTRAINT tipo_especie CHECK (especie in ('Prunus avium', 'Prunus cerasus')),
    CONSTRAINT tipo_preco CHECK (preco in ('Extra temprana', 'Temprana', 'Media estación', 'Tardía', 'Extra tardía'))
);

CREATE TABLE fah_precioscrzpais(
	id_pais int(2) NOT NULL,
    id_crz int(2) NOT NULL,
    id int(2) NOT NULL,
    precio dec(3,1) NOT NULL,
    calibre varchar(10) NOT NULL,
    fe_i date NOT NULL,
    fe_f date,
    CONSTRAINT pk_pais_crz PRIMARY KEY (id_pais, id_crz, id),
    CONSTRAINT fk_pais_pais_crz FOREIGN KEY (id_pais) REFERENCES fah_paises (id),
    CONSTRAINT fk_crz_pais_crz FOREIGN KEY (id_crz) REFERENCES fah_variedadescrz (id),
    CONSTRAINT tipo_calibre_precio CHECK (calibre in('Large', 'Extralarge', 'Jumbo', 'Extrajumbo', 'Giant'))
);

CREATE TABLE fah_asociacionesregionales (
	id int(2) PRIMARY KEY,
    nombre varchar(80) NOT NULL,
    id_pais int(2) NOT NULL,
    id_reg int(2) NOT NULL,
    CONSTRAINT fk_reg_asoc FOREIGN KEY (id_pais, id_reg) REFERENCES fah_regiones (id_pais, id)
);

CREATE TABLE fah_empresasproductoras(
	id int(2) PRIMARY KEY,
    nombre varchar(80) NOT NULL,
    tipo varchar(12) NOT NULL,
    direc varchar(60) NOT NULL,
    envase varchar(30) NOT NULL,
    id_pais int(2) NOT NULL,
    id_reg int(2) NOT NULL,
    id_asoc int(2),
    id_coop int(2),
    CONSTRAINT fk_region FOREIGN KEY (id_pais, id_reg) REFERENCES fah_regiones (id_pais, id),
    CONSTRAINT fk_asoc FOREIGN KEY (id_asoc) REFERENCES fah_asociacionesregionales(id),
    CONSTRAINT fk_coop FOREIGN KEY (id_coop) REFERENCES fah_empresasproductoras(id) ON DELETE CASCADE,
    CONSTRAINT tipo_productora CHECK (tipo in ('Productora', 'Cooperativa'))
);

CREATE TABLE fah_cultivos (
	id_prod int(2) NOT NULL,
    id_crz int(2) NOT NULL,
    id int(2) NOT NULL,
    calibre varchar(10) NOT NULL,
    disp_i date NOT NULL,
    disp_f date NOT NULL,
    prod_esp dec(8,2) NOT NULL,
    max_dist_exp dec(7,2) NOT NULL,
    CONSTRAINT pk_cultivos PRIMARY KEY (id_prod, id_crz, id),
    CONSTRAINT fk_crz FOREIGN KEY (id_crz) REFERENCES fah_variedadescrz(id),
    CONSTRAINT fk_prod FOREIGN KEY (id_prod) REFERENCES fah_empresasproductoras(id),
    CONSTRAINT tipo_calibre CHECK (calibre in('Large', 'Extralarge', 'Jumbo', 'Extrajumbo', 'Giant'))
);

CREATE TABLE fah_producanuales(
-- Atributo(s) de clave primaria
    id_prod int (2) NOT NULL,
    id_crz int (2) NOT NULL,
	id_cult int (2) NOT NULL,
    anio date NOT NULL,
-- Atributo(s) de tabla
	prod_log dec(8,2) NOT NULL,
-- Relación primaria
    CONSTRAINT pk_prod_anual PRIMARY KEY (id_prod, id_crz, id_cult, anio),
-- Relación foránea
	CONSTRAINT fk_cult_anual FOREIGN KEY (id_prod, id_crz, id_cult) REFERENCES fah_cultivos (id_prod, id_crz, id)
);

CREATE TABLE fah_empresascliente(
	id int(2) PRIMARY KEY,
    nombre varchar(60) NOT NULL,
    direc varchar(70) NOT NULL,
    t_negocio varchar(12) NOT NULL,
    rgo_inf int(2) NOT NULL,
    rgo_sup int(3) NOT NULL,
    prt_acep int(2) NOT NULL,
    id_pais int(2) NOT NULL,
    id_cdad int(2) NOT NULL,
    CONSTRAINT fk_cdad FOREIGN KEY (id_pais, id_cdad) REFERENCES fah_ciudades (id_pais,id),
    CONSTRAINT tipo_negocio CHECK (t_negocio in ('Distribuidor', 'Industria', 'Comercio'))
);

CREATE TABLE fah_formaspago (
	id_prod int(2) NOT NULL,
    id int(2) NOT NULL,
	tipo varchar(7) NOT NULL,
    conta_emi boolean,
    conta_env boolean,
    num_cuotas int(2),
    prt_cuota int(2),
    CONSTRAINT pk_formaspago PRIMARY KEY (id_prod, id),
    CONSTRAINT fk_prod_pago FOREIGN KEY (id_prod) REFERENCES fah_empresasproductoras (id),
    CONSTRAINT tipo_pago CHECK (tipo in ('Contado', 'Cuota'))
);

CREATE TABLE fah_contratos (
	id_prod int(2) NOT NULL,
    id_client int(2) NOT NULL,
    id int(3) NOT NULL,
    fe_emi date NOT NULL,
    monto dec(8,2) NOT NULL,
    transp varchar(9) NOT NULL,
    estatus varchar(9) NOT NULL,
    id_prod_pg int(2) NOT NULL,
    id_fr_pg int(2) NOT NULL,
    descuento int(2),
    rz_cancel varchar(400),
    fe_cancel date,
    CONSTRAINT pk_contrato PRIMARY KEY (id_prod, id_client, id),
    CONSTRAINT fk_forma_pago FOREIGN KEY (id_prod_pg, id_fr_pg) REFERENCES fah_formaspago (id_prod, id),
    CONSTRAINT fk_productora FOREIGN KEY (id_prod) REFERENCES fah_empresasproductoras (id),
    CONSTRAINT fk_cliente FOREIGN KEY (id_client) REFERENCES fah_empresascliente(id),
    CONSTRAINT tipo_transporte CHECK (transp in ('Aéreo', 'Terrestre')),
    CONSTRAINT tipo_estatus CHECK (estatus in ('Activo', 'Cancelado'))
);

CREATE TABLE fah_detallescontrato(
	id_prod_cont int(2) NOT NULL,
    id_client_cont int(2) NOT NULL,
    id_cont int(2) NOT NULL,
    id_prod_cult int(2) NOT NULL,
    id_crz_cult int(2) NOT NULL,
    id_cult int(2) NOT NULL,
    ctd dec(7,2) NOT NULL,
    fe_envio date,
	CONSTRAINT pk_detalles_cont	PRIMARY KEY (id_prod_cont, id_client_cont, id_cont, id_prod_cult, id_crz_cult, id_cult),
    CONSTRAINT fk_cont FOREIGN KEY (id_prod_cont, id_client_cont, id_cont) REFERENCES fah_contratos (id_prod, id_client, id),
    CONSTRAINT fk_cult FOREIGN KEY (id_prod_cult, id_crz_cult, id_cult) REFERENCES fah_cultivos (id_prod, id_crz, id)
);

CREATE TABLE fah_enviosreales(
	id_prod_cont int(2) NOT NULL,
    id_client_cont int(2) NOT NULL,
    id_cont int(3) NOT NULL,
    id_prod_cult int(2) NOT NULL,
    id_crz_cult int(2) NOT NULL,
    id_cult int(2) NOT NULL,
    id int(3) NOT NULL,
    fe_env date NOT NULL,
    fe_recolec date NOT NULL,
    cantidad dec(7,2) NOT NULL,
    CONSTRAINT pk_envios PRIMARY KEY (id_prod_cont, id_client_cont, id_cont, id_prod_cult, id_crz_cult, id_cult, id),
    CONSTRAINT fk_det_cont FOREIGN KEY (id_prod_cont, id_client_cont, id_cont, id_prod_cult, id_crz_cult, id_cult) REFERENCES fah_detallescontrato (id_prod_cont, id_client_cont, id_cont, id_prod_cult, id_crz_cult, id_cult)
);

CREATE TABLE fah_renovaciones (
	id_prod int(2) NOT NULL,
    id_client int(2) NOT NULL,
    id_cont int(3) NOT NULL,
    id int(2) NOT NULL,
    fe_renov date NOT NULL,
    monto dec(8,2) NOT NULL,
    CONSTRAINT pk_renovaciones PRIMARY KEY (id_prod, id_client, id_cont, id),
    CONSTRAINT fk_contrato FOREIGN KEY (id_prod, id_client, id_cont) REFERENCES fah_contratos (id_prod, id_client, id)
);

CREATE TABLE fah_personas (
-- Atributo(s) de la clave primaria
   doc_id int (8) PRIMARY KEY,
-- Atributo(s) de la tabla
   nombre1 varchar (25) NOT NULL,
   apellido1 varchar (25) NOT NULL,
   nombre2 varchar (25),
   apellido2 varchar (25)
);

CREATE TABLE fah_apadrinamientos (
-- Atributo(s) de clave primaria 
    id_per int (25) NOT NULL,
    id_crz int (2) NOT NULL,
    id_prod int (2) NOT NULL,
-- Atributo(s) de la tabla
    fe_i date NOT NULL,
    aporte dec(8,2),
    fe_fin date,
-- Relación primarias (PK)
    CONSTRAINT pk_apa PRIMARY KEY (id_per, id_crz, id_prod),
-- Relaciones foráneas (FK)
    CONSTRAINT fk_crz_apadr FOREIGN KEY (id_crz) REFERENCES fah_variedadescrz(id),
    CONSTRAINT fk_prod_apadr FOREIGN KEY (id_prod) REFERENCES fah_empresasproductoras(id),
    CONSTRAINT fk_pers FOREIGN KEY (id_per) REFERENCES fah_personas(doc_id)
);

CREATE TABLE fah_ramasnegocio (
-- Atributo(s) de clave primaria
	id int (2) PRIMARY KEY,
-- Atributo de tabla
    nombre varchar (50) UNIQUE NOT NULL
);

CREATE TABLE fah_proveedores (
-- Atributo(s) de clave primaria
	id int (2) PRIMARY KEY,
-- Atributo(s) de tabla
    rama_neg int (2) NOT NULL,
    id_cdad int (2) NOT NULL,
    id_pais int (2) NOT NULL,
	nombre varchar (40) NOT NULL,
    direc varchar(60) NOT NULL,
-- Relaciones foráneas
	CONSTRAINT fk_neg FOREIGN KEY (rama_neg) REFERENCES fah_ramasnegocio(id),
	CONSTRAINT fk_cdad_prov FOREIGN KEY (id_pais, id_cdad) REFERENCES fah_ciudades (id_pais,id)
);

CREATE TABLE fah_catalogoproveedores (
-- Atributos de clave primaria
	id_prod int (2) NOT NULL,
    id_prove int (2) NOT NULL,
-- Relación primaria
    CONSTRAINT pk_cat_prov PRIMARY KEY (id_prod, id_prove),
-- Relaciones foráneas
	CONSTRAINT fk_prov FOREIGN KEY (id_prove) REFERENCES fah_proveedores(id),
	CONSTRAINT fk_prod_cat FOREIGN KEY (id_prod) REFERENCES fah_empresasproductoras(id)
);

CREATE TABLE fah_convenios (
-- Atributo(s) de clave primaria
   id_prove int (2) NOT NULL,
   id int (2) NOT NULL,
-- Atributo(s) de tabla
   fe_emision date NOT NULL,
   vigencia varchar (9) NOT NULL,
   id_asoc int (2), 
   id_cat_prod int (2),
   id_cat_prove int (2),
-- Relación primaria
    CONSTRAINT pk_conv PRIMARY KEY (id_prove, id),
-- Relaciones foráneas
	CONSTRAINT fk_prov_conv FOREIGN KEY (id_prove) REFERENCES fah_proveedores(id),
    CONSTRAINT fk_reg_conv FOREIGN KEY (id_asoc) REFERENCES fah_asociacionesregionales(id),
    CONSTRAINT fk_cat_prov_conv FOREIGN KEY (id_cat_prod, id_cat_prove) REFERENCES fah_catalogoproveedores(id_prod, id_prove),
-- Checks
	CONSTRAINT tipo_vig CHECK (vigencia in ('Activo', 'Cancelado'))
);

CREATE TABLE fah_beneficios (
-- Atributo(s) de clave primaria
    id_prove int (2) NOT NULL,
    id_conv int (2) NOT NULL,
	id int (2) NOT NULL,
-- Atributo(s) de tabla 
    nombre varchar (80) NOT NULL,
    precio dec (7,2) NOT NULL,
    descrip varchar (2000),
-- Relación primaria
    CONSTRAINT pk_bnf PRIMARY KEY (id_prove, id_conv, id),
-- Relación foránea 
	CONSTRAINT fk_conv_bnf FOREIGN KEY (id_prove, id_conv) REFERENCES fah_convenios (id_prove, id)
);

CREATE TABLE fah_pagocuotas (
    id_prod_cont int(2) NOT NULL,
    id_client_cont int(2) NOT NULL,
    id_cont int(3) NOT NULL,
	id int(2) NOT NULL,
    monto dec(8,2) NOT NULL,
    CONSTRAINT pk_pagocuota PRIMARY KEY (id_prod_cont, id_client_cont, id_cont, id),
    CONSTRAINT fk_contrato_pg FOREIGN KEY (id_prod_cont, id_client_cont, id_cont) REFERENCES fah_contratos(id_prod, id_client, id)
);

CREATE TABLE fah_criterios (
	id int(2) PRIMARY KEY,
    nombre varchar(50) NOT NULL,
    tipo varchar(10) NOT NULL,
    descripcion varchar(550),
    CONSTRAINT t_criterio CHECK (tipo in ('Individual', 'Variedad'))
);

CREATE TABLE fah_valoraciones(
	id int(2) NOT NULL,
    id_client int(2) NOT NULL,
    interpretacion varchar(80) NOT NULL,
    CONSTRAINT pk_valoracion PRIMARY KEY (id_client, id),
    CONSTRAINT fk_client_val FOREIGN KEY (id_client) REFERENCES fah_empresascliente(id)
);

CREATE TABLE fah_formulas (
	id_client int(2) NOT NULL,
    id_crit int(2) NOT NULL,
	sabor_crz varchar(5) NOT NULL,
    tasa_import int(2) NOT NULL,
    CONSTRAINT pk_formula PRIMARY KEY (id_client, id_crit),
    CONSTRAINT fk_client_f FOREIGN KEY (id_client) REFERENCES fah_empresascliente(id),
    CONSTRAINT fk_criterio_f FOREIGN KEY (id_crit) REFERENCES fah_criterios(id),
    CONSTRAINT tipo_sabor_crz CHECK(sabor_crz in ('Dulce','Ácida'))
);

CREATE TABLE fah_evalanuales(
	id_prod	int(2)	NOT NULL,
    id_client int(2) NOT NULL,
	anio int(4) NOT NULL,
    result dec(3,2) NOT NULL,
    prt_result dec(4,1) NOT NULL,
    decision varchar(9) NOT NULL,
    CONSTRAINT pk_evaluacion PRIMARY KEY (id_prod, id_client, anio),
    CONSTRAINT fk_prod_e FOREIGN KEY (id_prod) REFERENCES fah_empresasproductoras(id),
	CONSTRAINT fk_client_e FOREIGN KEY (id_client) REFERENCES fah_empresascliente(id),
    CONSTRAINT decision CHECK (decision in ('Aprobado', 'Reprobado'))
);

CREATE TABLE fah_recetas (
-- Atributo(s) de clave primaria
	id int (2) PRIMARY KEY,
-- Atributo(s) de tabla
	nombre varchar (50) NOT NULL,
    tipo varchar (12) NOT NULL,
    descrip varchar (500) NOT NULL,
    tiempo_prep int (3) NOT NULL,
    racion int (2) NOT NULL,
    id_prod int (2),
    id_client int (2),
-- Relaciones foráneas
	CONSTRAINT fk_prod_rece FOREIGN KEY (id_prod) REFERENCES fah_empresasproductoras(id),
    CONSTRAINT fk_client_rece FOREIGN KEY (id_client) REFERENCES fah_empresascliente(id),
-- Check
    CONSTRAINT t_receta CHECK (tipo in ('Bebida', 'Postre','Plato salado'))
);

CREATE TABLE fah_crzrecetas(
    id_crz int (2) NOT NULL,
    id_rece int (2) NOT NULL,
    ctd dec (3,2) NOT NULL,
    CONSTRAINT pk_crz_rece PRIMARY KEY (id_crz,id_rece),
    CONSTRAINT fk_vcrz_rece FOREIGN KEY (id_crz) REFERENCES fah_variedadescrz(id),
	CONSTRAINT fk_rec_crz_rece FOREIGN KEY (id_rece) REFERENCES fah_recetas(id)
);

CREATE TABLE fah_ingredientes (
-- Atributo(s) de clave primaria
	id int (2) PRIMARY KEY,
-- Atributo(s) de tabla
    nombre varchar (30) NOT NULL UNIQUE,
    medicion varchar (7) NOT NULL,
    medicion_mix boolean NOT NULL,
	descrip varchar (50),
-- Check
    CONSTRAINT t_medicion CHECK (medicion in ('Sólido', 'Líquido'))
);

CREATE TABLE fah_instrucciones (
-- Atributo(s) de clave primaria
    id_rece int (2) NOT NULL,
	num int (2) NOT NULL,
-- Atributo(s) de tabla  
	descrip varchar (400) NOT NULL,
-- Relación primaria
    CONSTRAINT pk_inst PRIMARY KEY (id_rece, num),
-- Relaciones foráneas
	CONSTRAINT fk_rece FOREIGN KEY (id_rece) REFERENCES fah_recetas(id)
);

CREATE TABLE fah_unidadesmedida (
-- Atributo(s) de clave primaria
	id int (2) NOT NULL PRIMARY KEY,
-- Atributo(s) de tabla
    nombre varchar (20) NOT NULL UNIQUE,
    tipo varchar (7) NOT NULL,
    abrev varchar (4) UNIQUE,
    descrip varchar (50),
-- Check
    CONSTRAINT tipo_medicion CHECK (tipo in ('Sólido', 'Líquido', 'Mixto'))
);

CREATE TABLE fah_recetasingredientes (
-- Atributo(s) de clave primaria
    id_rece int (2) NOT NULL,
	id_ing int (2) NOT NULL,
-- Atributo(s) de tabla  
    ctd int (3),
    id_u_med int (2),
-- Relación primaria
    CONSTRAINT pk_rece_ing PRIMARY KEY (id_rece, id_ing),
-- Relaciones foráneas
	CONSTRAINT fk_rece_ing FOREIGN KEY (id_rece) REFERENCES fah_recetas(id),
	CONSTRAINT fk_ing FOREIGN KEY (id_ing) REFERENCES fah_ingredientes(id),
	CONSTRAINT fk_u_med FOREIGN KEY (id_u_med) REFERENCES fah_unidadesmedida(id)
);

-- INSERCIONES
-- MANTENIMIENTO DE PRODUCTORES

INSERT INTO fah_paises	( id, nombre, continent ) values
	( 1, 'Estados Unidos', 'America'),
	( 2, 'España', 'Europa'),
	( 3, 'Italia', 'Europa'),
	( 4, 'Chile', 'America'),
	( 5, 'Canada', 'America'),
	( 6, 'Francia', 'Europa'),
	( 7, 'Alemania', 'Europa'),
	( 8, 'Argentina', 'America'),
	( 9, 'Portugal', 'Europa'),
	( 10, 'Noruega', 'Europa'),
	( 11, 'Colombia', 'America'),
	( 12, 'India', 'Asia'),
	( 13, 'Austria', 'Europa'),
	( 14, 'Hungria', 'Europa');
    
INSERT INTO fah_ciudades ( id_pais, id, nombre ) values
	( 1, 	1, 'Washington DC' ),
	( 1, 	2,  'Tampa'	 ),
	( 2, 	1,  'Almeria'	 ),
	( 2, 	2,  'Pamplona'	 ),
	( 1, 	3,  'Opa-locka'	 ),
	( 7, 	1,  'Pommelsbrunn' ),
	( 7, 	2,  'Geesthacht'	 ),
	( 3, 	1,  'Milán'		 ),
	( 10, 1,  'Asker'		 ),
	( 12, 1, 'Dehli'  	 ),
	( 11, 1, 'Cundinamarca' ),
	( 2, 	3, 'Zaragoza'     ),
	( 2, 	4, 'Leganés'	 ),
    ( 2,	5,	'Madrid'),
	( 1, 	4, 'California'	 ),
	( 6	, 	1	,'Chevilly-Larue'	),
	( 7	,	3	,'Buxtehude'	),
	( 7	,	4	,'Munich'	);
        
INSERT INTO	fah_regiones (	id_pais	,	id	,	nombre	)	VALUES
(	2	,	1	,'Extremadura'	),
(	2	,	2	,'Castilla y León'	),
(	2	,	3	,'Comunidad de Madrid'	),
(	4	,	1	,'Región Metropolitana de Santiago'	),
(	4	,	2	,"Región del Libertador Bernardo O'Higgins"),
(	8	,	1	,'Pampeana'	),
(	1	,	1	,'Atlántico Medio'	),
(	5	,	1	,'Columbia Británica '	),
(	7	,	1	,'Baviera'	),
(	3	,	1	,'Piamonte'	),
(	3	,	2	,'Emilia-Romaña'	),
(	6	,	1	,'Provenza-Alpes-Costa Azul'	),
(	1	,	2	,'Noroeste del Pacífico'	),
(	6	,	2	,'Auvernia-Ródano-Alpes'	);

INSERT INTO fah_asociacionesregionales (	id	,	id_pais	,	id_reg	,	nombre	)	 VALUES 
(	1	,	2	,	1	,'Mesa Sectorial de la Cereza'	),
(	2	,	2	,	2	,'Asociación de Productores y Comerciantes Las Caderechas'	),
(	3	,	2	,	3	,'Federación Española de Asociaciones de Productores Exportadores - FEPEX'	),
(	4	,	4	,	1	,'Asociación de Exportadores de Frutas de Chile - ASOEX '	),
(	5	,	8	,	1	,'Asociación Argentina de Productores Integrados de Cerezas'	),
(	6	,	1	,	1	,'International Fresh Produce Association'	),
(	7	,	5	,	1	,'BC Cherry Association'	),
(	8	,   7	,	1	,'Gscheitgut'	),
(	9	,	3	,	1	,'Frutticoltori Associati Collina Torinese - FACOLT'	),
(	10	,	6	,	1	,'Cerises de France Associations d’Organisations de Producteurs - AOP'	);

INSERT INTO fah_empresasproductoras ( id, id_pais, id_reg, nombre, tipo, direc,	envase,	id_asoc, id_coop ) values
( 1,	1, 1,  'Monson Fruit Company',                         'Productora',      '252 N Rushmore Road',                                     'Caja de madera',	      null,	null	),
( 2,	1, 2, 'The Flavor Tree Fruit Company',                'Productora',      '15650 Excelsior Ave',                                          'Caja de madera',	      null,	null	),
( 3,	2, 2,  'Agrupación de Cooperativas Valle del Jerte',   'Cooperativa',  'Carretera Nacional 110 Km 381000',                                   'Caja de madera',	      1,	null	),
( 4,	2, 1,  'Cerima Cherries',                              'Productora',      'Carretera de la Serra s/n',                                        'Caja de poliestireno',	null,	3	),
( 5,	3, 1,  'Giacovelli',                                   'Productora',      'Via Carlo III di Borbone, 13',  'Malla',	                  null,	null	),
( 6,	3, 2,  'Salvi Vivai',                                  'Productora',      'Via Bologna, 714',                           'Bolsa de plástico',	      null,	null	),
( 7,	4, 1,  'Garces Fruit',                                 'Productora',      'Fundo Santa  Margarita s/n',        'Caja poliestileno',	      null,	null	),
( 8,	4, 2,  'La Viña',                                  'Productora',      'Fundo Santa Eugenia s/n',                                    'Malla',         	      null,	null	),
( 9,	5, 1,  'Canadian Cherry Producers',                'Cooperativa',  '51 Front Ave',                                  'Malla',	                  7,	null	),
( 10,	6, 2, 'Thomas Le Prince',                            'Productora',      '342 Rte du Robinson',                         'Caja de madera',	      null,	null	),
( 11,	7, 1,  'SALEM-Frucht',                      'Productora',      'Alte Neufracher Straße 100',                        'Malla',	                  null,	null	);

INSERT INTO fah_variedadescrz (	id	, 	nombre	, 	especie	,	preco,	    id_pais	) values
	( 1, 'Starking',         'Prunus avium',    'Media estación',	1	),
	( 2, 'Ambrunés',         'Prunus avium',    'Extra tardía',	2	),
	( 3, 'Sweet Early',      'Prunus avium',    'Extra temprana',	3	),
	( 4, 'Grace Star',       'Prunus avium',    'Media estación',	3	),
	( 5, 'Lapins',           'Prunus avium',    'Tardía',	      5	),
	( 6, 'Primulat',         'Prunus avium',    'Extra temprana',	6	),
	( 7, 'Burlat',           'Prunus avium',    'Temprana',	      6	),
	( 8, 'Skeena',           'Prunus avium',    'Tardía',	      7	),
	(	9, 'Regina',           'Prunus avium',    'Extra tardía',	7	),
	(	10	, 'Cristobalina',     'Prunus avium',    'Extra temprana',	2	),
	(	11	, 'Nimba',            'Prunus avium',    'Extra temprana',	1	),
	(	12	, 'Santina',          'Prunus avium',    'Temprana',  	5	),
	(	13	, 'Celeste',          'Prunus avium',    'Temprana',   	5	),
	(	14	, 'Black Pearl',      'Prunus avium',    'Temprana',  	1	),
	(	15	, 'Rocket',           'Prunus avium',    'Temprana',	      1	),
	(	16	, 'Cristalina',       'Prunus avium',    'Media estación',	5	),
	(	17	, 'New Star',         'Prunus avium',    'Media estación',	1	),
	(	18	, 'Garnet',           'Prunus avium',    'Media estación',	1	),
	(	19	, 'Napoleón',         'Prunus avium',    'Tardía',	      7	),
	(	20	, 'Vic',              'Prunus avium',    'Tardía',	      5	),
	(	21	, 'Sylvia',           'Prunus avium',    'Tardía',	      5	),
	(	22	, 'Big Lory',         'Prunus avium',    'Media estación',	1	),
	(	23	, 'Pico Negro',       'Prunus avium',    'Extra tardía',	2	),
	(	24	, 'Pico Colorado',    'Prunus avium',    'Extra tardía',	2	),
	(	25	, 'Morello',          'Prunus cerasus',  'Temprana',   	3	),
	(	26	, 'Richmond',         'Prunus cerasus',  'Temprana',	      1	),
	(	27	, 'Montmorency',      'Prunus cerasus',  'Temprana',   	6	),
	(	28	, 'Schattenmarelle',  'Prunus cerasus',  'Tardía',	      6	),
	(	29	, 'Sternsbaer',       'Prunus cerasus',  'Temprana',	      7	),
	(	30	, 'Prime Giant',      'Prunus cerasus',  'Temprana',   	1	),
	(	31	, 'Sweet Heart',      'Prunus avium',    'Extra tardía',	5	),
	(	32	, 'Early Bigi',      'Prunus avium',    'Extra temprana',	6	);
    
INSERT INTO fah_cultivos (id, id_prod, id_crz, calibre, disp_i, disp_f, prod_esp, max_dist_exp) values 
(	1	,	1	,	6	,'Large', STR_TO_DATE('	05/15	' ,'%m/%d'), STR_TO_DATE('	05/30	','%m/%d'),	17000	,	5100	),
(	1	,	4	,	16	,'Extralarge', STR_TO_DATE('	03/28	' ,'%m/%d'), STR_TO_DATE('	04/07	','%m/%d'),	25000	,	9250	),
(	1	,	2	,	5	,'Jumbo', STR_TO_DATE('	05/22	' ,'%m/%d'), STR_TO_DATE('	06/06	','%m/%d'),	103000,	32960	),
(	1	,	11	,	8	,'Extrajumbo', STR_TO_DATE('	03/31	' ,'%m/%d'), STR_TO_DATE('	04/12	','%m/%d'),	9000	,	4000	),
(	2	,	2	,	14	,'Extralarge', STR_TO_DATE('	05/05	' ,'%m/%d'), STR_TO_DATE('	05/29	','%m/%d'),	25000	,	3750	),
(	1	,	7	,	31	,'Giant', STR_TO_DATE('	03/24	' ,'%m/%d'), STR_TO_DATE('	04/03	','%m/%d'),	12700	,	3800	),
(	1	,	6	,	4	,'Large', STR_TO_DATE('	04/04	' ,'%m/%d'), STR_TO_DATE('	04/20	','%m/%d'),	30000	,	6600	),
(	1	,	5	,	15	,'Extralarge', STR_TO_DATE('	05/27	' ,'%m/%d'), STR_TO_DATE('	06/12	','%m/%d'),	43200	,	7344	),
(	1	,	3	,	10	,'Giant', STR_TO_DATE('	04/28	' ,'%m/%d'), STR_TO_DATE('	05/11	','%m/%d'),	5000	,	3300	),
(	2	,	7	,	9	,'Extrajumbo', STR_TO_DATE('	04/01	' ,'%m/%d'), STR_TO_DATE('	04/10	','%m/%d'),	7260	,	2900	),
(	1	,	8	,	22	,'Jumbo', STR_TO_DATE('	03/29	' ,'%m/%d'), STR_TO_DATE('	04/13	','%m/%d'),	3450	,	900	),
(	1	,	9	,	13	,'Large', STR_TO_DATE('	03/27	' ,'%m/%d'), STR_TO_DATE('	04/05	','%m/%d'),	8400	,	5700	),
(	2	,	1	,	21	,'Giant', STR_TO_DATE('	03/29	' ,'%m/%d'), STR_TO_DATE('	04/08	','%m/%d'),	5800	,	2000	),
(	1	,	10	,	7	,'Jumbo', STR_TO_DATE('	03/26	' ,'%m/%d'), STR_TO_DATE('	04/06	','%m/%d'),	22300	,	8000	),
(	3	,	7	,	11	,'Extrajumbo', STR_TO_DATE('	04/01	' ,'%m/%d'), STR_TO_DATE('	04/11	','%m/%d'),	16800	,	3350	);

INSERT INTO fah_ramasnegocio ( id,	nombre ) values
	( 1, 'Agrointeligencia'),
	( 2, 'Agroindustrial'),
	( 3, 'Envasado'),
	( 4, 'Fertilización'),
	( 5, 'Protección de cultivos con pulverizadores'),
	( 6, 'Servicio integral de logística y transporte'),
	( 7, 'Tecnologías de recolección y clasificación'),
    ( 8, 'Distribuidor de semillas'),
    ( 9, 'Fabricante de congeladores industriales');

INSERT INTO fah_proveedores	( id, rama_neg, id_cdad, id_pais, nombre, direc ) values
	( 1,	1, 1,	 2, 'Grupo Hispatec',	       'Avenida de la Innovación, 1'	      ),
	( 2,	1, 2,	 2, 'Timac Agro',	             'Polígono Arazuri-Orcoyen Calle C, 32'	),
	( 3,	3, 1,	 2, 'Induser',	             'Polígono Industrial la Redonda, Calle II Parc 28'	),
	( 4,	2, 3,	 1, 'Meelko',	             '3890 NW 132nd Street'	      ),
	( 5,	4, 2,	 1, 'Yara International',	 '100 North Tampa Street. Suite 3200'	      ),
	( 6,	4, 1,	 7, 'SeNaPro GmbH',	       'Hunaser Straße, 3'	                        ),
	( 7,	5, 2,	 7, 'Mantis ULV',	             'Vierlander Straße, 11A'	                  ),
	( 8,	4, 1,	 3, 'Farma Export',	       'Via Santa Maria Valle, 3 '	            ),
	( 9,	6, 1,	10, 'Tomra System', 	 'Street Drengsrudhagen, 2'                        ),
	( 10,	7, 4,   2, 'Transconcar',	       'Calle Ricardo Tormo, 18'	                  );

INSERT INTO fah_personas ( doc_id, nombre1, nombre2, apellido1, apellido2 ) values
	( 76812692, 'Hilario',	 NULL	,	'Calabuig',	  NULL	),
	( 65345935, 'Joan',	 NULL	,	'Hernandez',  NULL	),
	( 33921234, 'Richard',	 NULL	,	'Smith',	  NULL	),
	( 45354354, 'Santiago',	 NULL	,	'Gonzalez',	  NULL	),
	( 20249933, 'Fabio',	 NULL	,	'Coppola',	  NULL	),
	( 34851084, 'Alicia',	'Victoria',	'Oyarzabal', 'Jimenez'  ),
	( 84892482, 'Marta',	 NULL,	'Hidalgo',	  NULL	),
	( 34944234, 'Leonor',	 NULL,	'Gorrea',	 'Montull'  ),
	( 10840256, 'Anne',	'Juliette', 'Dubois',	  NULL	);

INSERT INTO fah_apadrinamientos (id_per, id_crz, id_prod, fe_i, aporte, fe_fin ) values
	( 76812692,	 16,	4,   '2022-07-17',  120000,	NULL	      ),
	( 65345935,	 5,	2,   '2021-01-20',  95000,    '2022-04-01'),
	( 34851084,	 9,	7,   '2018-09-30',  20000,	NULL	      ),
	( 45354354,	 22,	8,   '2018-05-15',  96800,	NULL	      ),
	( 33921234,	 13,	9,   '2019-11-14',  58000,    '2022-12-04'),
	( 34944234,	 10,	3,   '2022-06-06',  128000,	NULL	      ),
	( 20249933,	 4,	6,   '2021-01-05',  400000,   '2022-03-23'),
	( 10840256,	 7,	10,  '2020-05-03',  350000,	NULL	      ),
	( 34851084,	 14,	2,   '2021-02-05',  270400,	NULL	      );

INSERT INTO fah_precioscrzpais (id_pais, id_crz, id, precio, fe_i, calibre, fe_f) values 
(	1	,	6	,	1	,14,'2021-02-04','Large',	NULL	),
(	2	,	16	,	1	,	12	,'2017-04-10','Extralarge','2018-03-30'),
(	2	,	16	,	2	,	12.6	,'2018-03-30','Extralarge','2020-04-11'),
(	2	,	16	,	3	,	12.4	,'2020-04-11','Extralarge',	NULL	),
(	1	,	5	,	1	,	10	,'2021-03-02','Jumbo',	NULL	),
(	7	,	8	,	1	,	8	,'2021-01-13','Extrajumbo',	NULL	),
(	1	,	14	,	1	,	6	,'2020-02-22','Extralarge',	NULL	),
(	4	,	14	,	1	,	5.9	,'2017-03-19','Giant','2019-03-08'),
(	4	,	31	,	2	,	6.5	,'2019-03-08','Giant',	NULL	),
(	3	,	4	,	1	,	4.7	,'2019-04-19','Large',	NULL	),
(	3	,	15	,	1	,	15.9	,'2019-02-17','Extralarge',	NULL	),
(	2	,	10	,	1	,	9.6	,'2018-01-14','Giant','2020-01-01'),
(	2	,	10	,	2	,	10	,'2020-01-01','Giant',	NULL	),
(	4	,	9	,	1	,	16.9	,'2017-01-29','Extrajumbo','2018-01-29'),
(	4	,	9	,	2	,	15	,'2018-01-29','Extrajumbo',	NULL	),
(	4	,	22	,	1	,	11.7	,'2017-04-23','Jumbo',	NULL	),
(	5	,	13	,	1	, 9.78 ,'2019-03-10','Large',NULL),
(	1	,	21	,	1	, 9.78 ,'2022-02-01','Giant',NULL),
(	6	,	7	,	1	,	9	,'2022-03-05','Jumbo',NULL),
(	4	,	11	,	1	,	8.7	,'2022-04-22','Extrajumbo',	NULL);

INSERT INTO fah_empresascliente (id, nombre, direc, t_negocio, rgo_inf, rgo_sup, prt_acep, id_pais, id_cdad) VALUES
(	1	,'Fruta en casa Barceló','Mercado de Barceló Calle Barceló 6','Comercio',	1	,	3	,	70	, 2	,	5	),
(	2	,'LAZAYA','	Carretera Nuévalos Km 0,700	','Industria',	1	,	3	,	90,	2	,	3	),
(	3	,'Comestibles Alfa', "Avenida Troncal de Occidente 17-65 Km 19",'Industria',	1	,	3	,	80	,	11	,	1	),
(	4	,'Industrias La Coruña','Autopista Medellin Km 7, Celta Trade Park, Bodega 38','Industria',	1	,	3	,	80	,	11	,	1	),
(	5	,'Alpina','Vía Briceño Sopó Km 3, Edificio Administrativo Alpina ','Industria',	1	,	3	,	80	,	11	,	1	),
(	6	,'Amoretti','451 South Lombard Street','Industria',	1	,	3	,	75	,	1	,	4	),
(	7	,'AMS European','Calle de Angers, 61, Edificio B3 Fruileg','Comercio',	1	,	3	,	65	,	6	,	1	),
(	8	,'Global Fruit Point','Bahnhofstraße 45	','Comercio',	1	,	3	,	70	,	7	,	3	),
(	9	,'Rauch Deutschland','Fraunhoferstraße 9	','Industria',	1	,	3	,	95	,	7	,	4	),
(	10	,'NGK Trading Company','New Sabzi Mandi, Block A-340','Distribuidor',	1	,	3	,	60	,	12	,	1	);

INSERT INTO fah_catalogoproveedores (id_prod, id_prove) values
        (  3, 1 ),
        (  1, 4 ),
        (  10, 6 ),
        (  11, 7 ),
        (  9, 1  ),
        (  5, 2  ),
        (  10, 10 ),
        (  5, 8   ),
        (  1, 6   ),
        (  7, 2   );

INSERT INTO fah_convenios (	id_prove	,	id	,	fe_emision	,	vigencia	,	id_asoc	,	id_cat_prod	,	id_cat_prove	) values
    (	1,	1, '2018-08-07',  'Activo',	    NULL,	    3,	     1	    ),
    (	4,	1, '2017-01-12',  'Activo',	    NULL,	    1,       4	    ),
    (	6,	1, '2017-07-03',  'Activo',	    NULL,	    10,	     6	    ),
    (	7,	1, '2017-12-05',  'Cancelado',	    NULL,   	11, 	 7	    ),
    (	1,	2, '2019-11-02',  'Cancelado',	    NULL,	    9,	     1	    ),
    (	2,	1, '2019-03-25',  'Activo',	    NULL,	    5,	     2	    ),
    (	10,	1, '2020-04-17',  'Activo',	    NULL,	    10,	     10	    ),
    (	8,	1, '2021-09-08',  'Cancelado', 	NULL,	    5,	     8	    ),
    (	6,	2, '2015-01-30',  'Cancelado', 	NULL,	    1,  	 6	    ),
    (	2,	2, '2022-11-15',  'Activo',	    NULL,	    7,	     2	    ),
    (	3,	1, '2021-07-09',  'Activo',	    1	,	    NULL,	NULL	),
    (	3,	2, '2018-10-17',  'Activo',	    2	,	    NULL,	NULL	),
    (	5,	1, '2019-04-06',  'Activo',	    6	,	    NULL,	NULL	),
    (	10,	2, '2020-12-01',  'Activo',	    4	,	    NULL,	NULL	),
    (	1,	3, '2020-06-30',  'Activo',	    7	,	    NULL,	NULL	);

INSERT INTO fah_beneficios (id_prove, id_conv, id, nombre, precio, descrip) values
(       1, 1, 1, 'Control Tower', 9120.35, 'El software Control Tower facilita la gestión logística, con capacidad de respuesta ágil, asegurando el control de la calidad desde el almacén hasta el cliente en destino. Los módulos de Control Tower son independientes del medio de transporte (terrestre, aéreo o marítimo), mejoran los tiempos de tránsito y reducen el número de incidencias y reclamaciones.'),
(       4, 1, 1, 'Galpón estructural de acero zinc', 18230.20, 'Cada unidad tiene como dimensiones 10 x 15 m con ventanas y porton.'),
(       6, 1, 1, 'DOLOPHOS 15', 20.85, 'Fertilizante base granulado para mejorar la fertilidad del suelo. Para el suministro de fosfato, cal y magnesio en tierras de cultivo y pastizales. Bien probado para mezclar plantas. Cada unidad consta de 5kg.'),
(       7, 1, 1, 'Pulverizador MAFEX ULV', 80.74, 'Diseñados para el tratamiento con un bajo consumo de producto con medios líquidos para el aseguramiento y optimización de la calidad y conservabilidad de la cosecha.'),
(       1, 2, 1, 'ERPagro', 8568.37, 'RPagro es un software que monitoriza, gestiona y optimiza todos los procesos de la empresa agroalimentaria. Un único sistema modular que facilita la toma de decisiones basándose en un análisis integral y en tiempo real de las actividades del negocio.'),
(       2, 1, 1, 'Inductor antioxidante VitalFit', 20.92, 'Previene y cura el estrés oxidativo mediante la activación del sistema defensivo antioxidante de la planta. La dosis por aplicación varía en términos generales dependiendo del tipo de cultivo y estado fenológico. Cada unidad tiene un costo de 25.92 dólares americanos.'),
(       8, 1, 1, 'Fertilizante Bio & Especiale Suelo Fantastico', 35.25, 'Formulación de materia orgánica valiosa, nitrógeno orgánico, aminoácidos (ácido aspártico, ácido glutámico, tirosina, ácido c-aminobutírico, alanina, serina, isoleucina, leucina, valina, glicina, treonina, metionina, lisina, prolina, cisteína , histidina, arginina) y vitaminas: biotina (vitamina H), ácido fólico (vitamina B9), inositol, pantotenato de calcio (vitamina B5), piridoxina (vitamina B6), riboflavina (vitamina B2), tiamina y ácido nicotínico, que optimiza la la estructura, las propiedades fisicoquímicas y la actividad microbiana del suelo. El precio por cada 5kg es de 35.25 doláres americanos.'),
(       6, 2, 1, 'ÖKOPHOS-Plus', 25.91, 'Abono granulado para pastizales para aporte de fosfato, azufre, cal y magnesio. Contiene trazas de nutrientes. Cada paquete contiene 8kg.'),
(       2, 2, 1, 'Fertilizante Hidrosolubre Bioestimulante', 27.40, 'KSC PHYTACTYL, es un fertilizante hidrosoluble bioestimulante de la actividad metabólica de la planta frente a situaciones de estrés. El éxito de la Gama KSC PHYTACTYL reside en la combinación de materias primas de la más exigente calidad junto con la acción del complejo PHYTACTYL. La venta por cada 4 litros es 27.40 dólares americanos.'),
(       3, 1, 1, 'Análisis de control de la calidad en alimentos', 3000, 'Implementación de Sistemas y Normas de Calidad'),
(       3, 2, 1, 'Análisis de control de la calidad en alimentos', 2000, 'Implementación de Sistemas y Normas de Calidad'),
(       5, 1, 1, 'Fertilizante de nitrato', 28.23, 'Los fertilizantes nitrogenados YaraBela son fuentes rentables de nitrógeno y calcio para impulsar el crecimiento y la productividad. Cada unidad tiene un costo de 28.23 dólares americanos.'),
(       10, 2, 1, 'Servicio de logística para la distribucion de mercancia', 1350, NULL),
(       1, 3, 1, 'ERPagro', 8568.37, 'RPagro es un software que monitoriza, gestiona y optimiza todos los procesos de la empresa agroalimentaria. Un único sistema modular que facilita la toma de decisiones basándose en un análisis integral y en tiempo real de las actividades del negocio.');

INSERT INTO fah_producanuales (id_prod, id_crz, id_cult, anio, prod_log) values
(1, 6, 1, STR_TO_DATE('2022', '%Y'), 1765.25),
(4, 16,  1, STR_TO_DATE('2019', '%Y'), 24780),
(2, 5, 1, STR_TO_DATE('2021', '%Y'), 103012),
(2, 5, 1, STR_TO_DATE('2022', '%Y'), 102989.7),
(11, 8, 1, STR_TO_DATE('2022', '%Y'), 8990.6),
(2, 14, 2, STR_TO_DATE('2021', '%Y'), 25150),
(2, 14, 2, STR_TO_DATE('2022', '%Y'), 25133),
(7, 31, 1, STR_TO_DATE('2018', '%Y'), 12711),
(7, 31, 1, STR_TO_DATE('2019', '%Y'), 126989),
(7, 31, 1, STR_TO_DATE('2020', '%Y'), 12700.3),
(7, 31, 1, STR_TO_DATE('2021', '%Y'), 12690.6),
(6, 4, 1, STR_TO_DATE('2020', '%Y'), 30012),
(6, 4, 1, STR_TO_DATE('2021', '%Y'), 30058.8),
(6, 4, 1, STR_TO_DATE('2022', '%Y'), 2998.9),
(5, 15, 1, STR_TO_DATE('2020', '%Y'), 43200.4),
(5, 15, 1, STR_TO_DATE('2021', '%Y'), 43199.9),
(5, 15, 1, STR_TO_DATE('2022', '%Y'), 43200.1),
(3, 10, 1, STR_TO_DATE('2019', '%Y'), 5003.6),
(3, 10, 1, STR_TO_DATE('2020', '%Y'), 5105),
(7, 9, 2, STR_TO_DATE('2018', '%Y'), 7260.6),
(7, 9, 2, STR_TO_DATE('2019', '%Y'), 7261),
(7, 9, 2, STR_TO_DATE('2020', '%Y'), 7258.3),
(7, 9, 2, STR_TO_DATE('2021', '%Y'), 7259.1),
(8, 22, 1, STR_TO_DATE('2020', '%Y'), 3500),
(8, 22, 1, STR_TO_DATE('2021', '%Y'), 3450),
(8, 22, 1, STR_TO_DATE('2022', '%Y'), 3499),
(9, 13, 1, STR_TO_DATE('2021', '%Y'), 8401),
(9, 13,1, STR_TO_DATE('2022', '%Y'), 8400.6),
(1, 21, 2, STR_TO_DATE('2022', '%Y'), 5790.6),
(10, 7, 1, STR_TO_DATE('2019', '%Y'), 22290),
(10, 7, 1, STR_TO_DATE('2020', '%Y'), 22350),
(10, 7, 1, STR_TO_DATE('2021', '%Y'), 22301.7),
(10, 7, 1, STR_TO_DATE('2022', '%Y'), 22370),
(7, 11, 3, STR_TO_DATE('2018', '%Y'), 16810),
(7, 11, 3, STR_TO_DATE('2019', '%Y'), 16793.5),
(7, 11, 3, STR_TO_DATE('2020', '%Y'), 16800.6),
(7, 11, 3, STR_TO_DATE('2021', '%Y'), 16835);

-- CONTROL EXPORTACION/IMPORTACION

INSERT INTO fah_formaspago     (id_prod, id, tipo,	conta_emi,	conta_env,	num_cuotas, prt_cuota) VALUES
    (	1	,	1	,	'Contado' ,	TRUE,	FALSE,	NULL,	NULL ),
    (	2	,	1	,	'Cuota'	,	NULL,	NULL,	4,	    25	 ),
    (	2	,	2	,	'Contado'	,	TRUE,	FALSE,	2,	    50   ),
    (	3	,	1	,	'Contado' ,	TRUE,	FALSE,	NULL,	NULL ),
    (	4	,	1	,	'Cuota'	,	NULL,	NULL,	5,	    20	 ),
    (	5	,	1	,	'Contado' ,	TRUE,	FALSE,	NULL,	NULL ),
    (	6	,	1	,	'Contado' ,	TRUE,	FALSE,	NULL,	NULL ),
    (	7	,	1	,	'Contado' ,	TRUE,	FALSE,	NULL,	NULL ),
    (	8	,	1	,	'Cuota'	,	NULL,	NULL,	4,	    25	 ),
    (	9	,	1	,	'Cuota'	,	NULL,	NULL,	2,	    50   ),
    (	10	,	1	,	'Contado'	,	TRUE,	FALSE,	NULL,	NULL ),
    (	11	,	1	,	'Cuota'	,	NULL,	NULL,	4,	    25	 ),
    (	1	,	2	,	'Cuota'	,	NULL,	NULL,	2,	    50	 );

INSERT INTO fah_contratos (	id_prod, id_client, id,	fe_emi, monto, transp, estatus, id_prod_pg, id_fr_pg,	descuento, rz_cancel, fe_cancel	)  VALUES
(	1	,	2	,	1	,'2021-01-22',	67736	,'Aéreo','Activo',	1	,	1	,	NULL	,	NULL	,	NULL	),
(	4	,	7	,	1	,'2018-08-07',	65550	,'Terrestre','Cancelado',	4	,	1	,	5	,	"La productora no superó el porcentaje de aceptacion requerido en la evaluacion del 2019 realizada por el cliente, el envio de la mercancia fue muy tardio, las cerezas estaban descompuestas"	,'2019-08-07'),
(	2	,	3	,	1	,'2020-10-29',	239720	,'Aéreo','Activo',	2	,	2	,	NULL	,	NULL	,	NULL	),
(	11	,	4	,	1	,'2021-01-29',	19760	,'Aéreo','Activo',	11	,	1	,	5	,	NULL	,	NULL	),
(	2	,	5	,	2	,'2021-08-14',	112380	,'Aéreo','Activo',	2	,	1	,	NULL	,	NULL	,	NULL	),
(	7	,	6	,	1	,'2017-05-09',	53930	,'Aéreo','Cancelado',	7	,	1	,	NULL	,'El resultado final de la evaluación para la productora fue en lineas generales "Deficiente" para el 2021. La razón de ello se debe a que no se cumplió con el plazo de entrega de la mercancía y las cerezas transportadas no cumplieron con el tamañado pautado','2021-05-09'),
(	6	,	7	,	1	,'2019-10-02',	17108	,'Terrestre','Activo',	6	,	1	,	9	,	NULL	,	NULL	),
(	5	,	8	,	1	,'2019-12-23',	57395.03,'Terrestre','Activo',	5	,	1	,	25	,	NULL	,	NULL	),
(	3	,	9	,	1	,'2018-08-04',	31680	,'Aéreo','Cancelado',	3	,	1	,	NULL	,'De acuerdo al cliente, la productora tuvo un porcentaje de aceptación del 40% para el 2020. Las cerezas transportadas no eran enteras y el envío de las mismas fue en plazos no pautados en el contrato','2020-08-04'),
(	10	,	1	,	1	,'2018-11-30',	18900	,'Aéreo','Activo',	10	,	1	,	NULL	,	NULL	,	NULL	),
(	8	,	5	,	1	,'2016-09-16',	10530	,'Terrestre','Cancelado',	8	,	1	,	NULL	,'El cliente identificó explícitamente una "Violación de las pautas y/o normativas del contrato estipulado" para el año 2018 con respecto a la productora. Se transportaron cerezas no firmes, con sabores y olores extraños. Además, el envío de estas fue tardío','2018-09-16'),
(	9	,	6	,	1	,'2020-05-01',	47433	,'Terrestre','Activo',	9	,	1	,	NULL	,	NULL	,	NULL	);

INSERT INTO fah_renovaciones (id_prod, id_client, id_cont, id, fe_renov, monto) VALUES
(	1	,	2	,	1	,	1	,'2022-07-06',	67736	),
(	2	,	3	,	1	,	1	,'2021-10-21',	237920	),
(	2	,	3	,	1	,	2	,'2022-10-23',	237920	),
(	11	,	4	,	1	,	1	,'2022-11-11',	19760	),
(	2	,	5	,	2	,	1	,'2022-08-01',	112380	),
(	7	,	6	,	1	,	1	,'2018-10-02',	53930	),
(	7	,	6	,	1	,	2	,'2019-08-30',	50850	),
(	7	,	6	,	1	,	3	,'2020-07-29',	50850	),
(	6	,	7	,	1	,	1	,'2020-09-24',	17108	),
(	6	,	7	,	1	,	2	,'2021-09-29',	17108	),
(	6	,	7	,	1	,	3	,'2022-09-28',	17108	),
(	5	,	8	,	1	,	1	,'2020-12-17',	57395.03),
(	5	,	8	,	1	,	2	,'2021-12-05',	57395.03),
(	5	,	8	,	1	,	3	,'2022-11-29',	57395.03),
(	3	,	9	,	1	,	1	,'2019-08-02',	31680	),
(	10	,	1	,	1	,	1	,'2019-11-22',	18900	),
(	10	,	1	,	1	,	2	,'2020-11-19',	18900	),
(	10	,	1	,	1	,	3	,'2021-11-16',	18900	),
(	10	,	1	,	1	,	4	,'2022-11-10',	18900	),
(	8	,	5	,	1	,	1	,'2017-09-15',	10530	),
(	9	,	6	,	1	,	1	,'2021-12-28',	47433	),
(	9	,	6	,	1	,	2	,'2022-06-01',	47433	);

INSERT INTO fah_detallescontrato (id_prod_cont, id_client_cont, id_cont, id_prod_cult, id_crz_cult, id_cult, ctd, fe_envio	) VALUES    
    (	1	,	2	,	1	,	1	,	6	,	1	,	4000	, STR_TO_DATE('05/22','%m/%d') ),
    (	1	,	2	,	1	,	1	,	21	,	2	,	1200	, STR_TO_DATE('03/30','%m/%d') ),
    (	4	,	7	,	1	,	4	,	16	,	1	,	8000	, STR_TO_DATE('04/01','%m/%d') ),
    (	2	,	3	,	1	,	2	,	5	,	1	,	23072	, STR_TO_DATE('05/27','%m/%d') ),
    (	2	,	3	,	1	,	2	,	14	,	2	,	1500	, STR_TO_DATE('05/14','%m/%d') ),
    (	11	,	4	,	1	,	11	,	8	,	1	,	2600	, STR_TO_DATE('04/09','%m/%d') ),
    (	2	,	5	,	2	,	2	,	5	,	1	,	9888	, STR_TO_DATE('06/02','%m/%d') ),
    (	2	,	5	,	2	,	2	,	14	,	2	,	2250	, STR_TO_DATE('05/11','%m/%d') ),
    (	7	,	6	,	1	,	7	,	31	,	1	,	1200	, STR_TO_DATE('03/29','%m/%d') ),
    (	7	,	6	,	1	,	7	,	9	,	2	,	2000	, STR_TO_DATE('04/05','%m/%d') ),
    (	7	,	6	,	1	,	7	,	11	,	3	,	1500	, STR_TO_DATE('04/09','%m/%d') ),
    (	6	,	7	,	1	,	6	,	4	,	1	,	4000	, STR_TO_DATE('04/16','%m/%d') ),
    (	5	,	8	,	1	,	5	,	15	,	1	,	4813	, STR_TO_DATE('06/03','%m/%d') ),
    (	3	,	9	,	1	,	3	,	10	,	1	,	3300	, STR_TO_DATE('04/29','%m/%d') ),
    (	10	,	1	,	1	,	10	,	7	,	1	,	2100	, STR_TO_DATE('04/01','%m/%d') ),
    (	8	,	5	,	1	,	8	,	22	,	1	,	900   , STR_TO_DATE('04/06','%m/%d') ),
    (	9	,	6	,	1	,	9	,	13	,	1	,	4850	, STR_TO_DATE('03/30','%m/%d') );
    
INSERT INTO fah_enviosreales (id_prod_cont, id_client_cont, id_cont, id_prod_cult, id_crz_cult, id_cult, id, fe_env, fe_recolec, cantidad) VALUES
(	1	,	2	,	1	,	1	,	6	,	1	,	1	, STR_TO_DATE('2022/05/26','%Y/%m/%d'), STR_TO_DATE('2022/05/24','%Y/%m/%d'),	4005.3 ),
(	1	,	2	,	1	,	1	,	21	,	2	,	2	, STR_TO_DATE('2022/03/31','%Y/%m/%d'), STR_TO_DATE('2022/03/29','%Y/%m/%d'),	1202.3),
(	4	,	7	,	1	,	4	,	16	,	1	,	1	, STR_TO_DATE('2022/05/01','%Y/%m/%d'), STR_TO_DATE('2022/04/07','%Y/%m/%d'),	7998.9),
(	2	,	3	,	1	,	2	,	5	,	1	,	1	, STR_TO_DATE('2021/05/27','%Y/%m/%d'), STR_TO_DATE('2021/05/25','%Y/%m/%d'),	23072.3),
(	2	,	3	,	1	,	2	,	14	,	2	,	2	, STR_TO_DATE('2021/05/11','%Y/%m/%d'), STR_TO_DATE('2021/05/08','%Y/%m/%d'),	1500),
(	2	,	3	,	1	,	2	,	5	,	1	,	3	, STR_TO_DATE('2022/05/29','%Y/%m/%d'), STR_TO_DATE('2022/05/27','%Y/%m/%d'),	23071.97),
(	2	,	3	,	1	,	2	,	14	,	2	,	4	, STR_TO_DATE('2022/05/15','%Y/%m/%d'), STR_TO_DATE('2022/05/12','%Y/%m/%d'),	1502.3),
(	11	,	4	,	1	,	11	,	8	,	1	,	1	, STR_TO_DATE('2022/04/12','%Y/%m/%d'), STR_TO_DATE('2022/04/10','%Y/%m/%d'),	2600),
(	2	,	5	,	2	,	2	,	5	,	1	,	1	, STR_TO_DATE('2022/06/01','%Y/%m/%d'), STR_TO_DATE('2022/05/30','%Y/%m/%d'),	9885.6),
(	2	,	5	,	2	,	2	,	14	,	2	,	2	, STR_TO_DATE('2022/05/10','%Y/%m/%d'), STR_TO_DATE('2022/05/07','%Y/%m/%d'),	2247.6),
(	7	,	6	,	1	,	7	,	31	,	1	,	1	, STR_TO_DATE('2018/04/05','%Y/%m/%d'), STR_TO_DATE('2018/04/02','%Y/%m/%d'),	1200),
(	7	,	6	,	1	,	7	,	9	,	2	,	2	, STR_TO_DATE('2018/04/05','%Y/%m/%d'), STR_TO_DATE('2018/04/01','%Y/%m/%d'),	2000),
(	7	,	6	,	1	,	7	,	11	,	3	,	3	, STR_TO_DATE('2018/04/05','%Y/%m/%d'), STR_TO_DATE('2018/04/01','%Y/%m/%d'),	1500),
(	7	,	6	,	1	,	7	,	31	,	1	,	4	, STR_TO_DATE('2019/03/29','%Y/%m/%d'), STR_TO_DATE('2019/03/25','%Y/%m/%d'),	1199.9),
(	7	,	6	,	1	,	7	,	9	,	2	,	5	, STR_TO_DATE('2019/04/09','%Y/%m/%d'), STR_TO_DATE('2019/04/05','%Y/%m/%d'),	200.6),
(	7	,	6	,	1	,	7	,	11	,	3	,	6	, STR_TO_DATE('2019/04/09','%Y/%m/%d'), STR_TO_DATE('2019/04/05','%Y/%m/%d'),	1500),
(	6	,	7	,	1	,	6	,	4	,	1	,	1	, STR_TO_DATE('2020/04/18','%Y/%m/%d'), STR_TO_DATE('2020/04/13','%Y/%m/%d'),	3996.4),
(	6	,	7	,	1	,	6	,	4	,	1	,	2	, STR_TO_DATE('2021/04/16','%Y/%m/%d'), STR_TO_DATE('2021/04/12','%Y/%m/%d'),	4003.8),
(	6	,	7	,	1	,	6	,	4	,	1	,	3	, STR_TO_DATE('2022/04/16','%Y/%m/%d'), STR_TO_DATE('2022/04/11','%Y/%m/%d'),	4000),
(	5	,	8	,	1	,	5	,	15	,	1	,	1	, STR_TO_DATE('2020/06/05','%Y/%m/%d'), STR_TO_DATE('2020/05/29','%Y/%m/%d'),	4813.2),
(	5	,	8	,	1	,	5	,	15	,	1	,	2	, STR_TO_DATE('2021/06/05','%Y/%m/%d'), STR_TO_DATE('2022/05/30','%Y/%m/%d'),	4812.65),
(	5	,	8	,	1	,	5	,	15	,	1	,	3	, STR_TO_DATE('2022/06/03','%Y/%m/%d'), STR_TO_DATE('2022/05/30','%Y/%m/%d'),	4812.4),
(	3	,	9	,	1	,	3	,	10	,	1	,	1	, STR_TO_DATE('2019/05/03','%Y/%m/%d'), STR_TO_DATE('2019/04/28','%Y/%m/%d'),	3301),
(	3	,	9	,	1	,	3	,	10	,	1	,	2	, STR_TO_DATE('2020/05/15','%Y/%m/%d'), STR_TO_DATE('2020/05/11','%Y/%m/%d'),	3280),
(	10	,	1	,	1	,	10	,	7	,	1	,	1	, STR_TO_DATE('2019/04/02','%Y/%m/%d'), STR_TO_DATE('2019/03/29','%Y/%m/%d'),	2103),
(	10	,	1	,	1	,	10	,	7	,	1	,	2	, STR_TO_DATE('2020/03/31','%Y/%m/%d'), STR_TO_DATE('2020/03/26','%Y/%m/%d'),	2101.1),
(	10	,	1	,	1	,	10	,	7	,	1	,	3	, STR_TO_DATE('2021/04/03','%Y/%m/%d'), STR_TO_DATE('2021/03/29','%Y/%m/%d'),	2099.9),
(	10	,	1	,	1	,	10	,	7	,	1	,	4	, STR_TO_DATE('2022/03/31','%Y/%m/%d'), STR_TO_DATE('2022/03/28','%Y/%m/%d'),	2108),
(	8	,	5	,	1	,	8	,	22	,	1	,	1	, STR_TO_DATE('2017/04/08','%Y/%m/%d'), STR_TO_DATE('2017/04/03','%Y/%m/%d'),	896),
(	8	,	5	,	1	,	8	,	22	,	1	,	2	, STR_TO_DATE('2018/04/29','%Y/%m/%d'), STR_TO_DATE('2018/04/13','%Y/%m/%d'),	900.5),
(	9	,	6	,	1	,	9	,	13	,	1	,	1	, STR_TO_DATE('2022/04/01','%Y/%m/%d'), STR_TO_DATE('2022/03/28','%Y/%m/%d'),	4850.3);

INSERT INTO fah_pagocuotas (id_prod_cont, id_client_cont, id_cont, id, monto) VALUES
(1,	2, 1, 1, 67736),
(4,	7, 1, 1, 65550),
(2,	3, 1, 1, 237920),
(2,3,1,2,237920),
(11,4,1,1,4940),
(11,4,1,2,4940),
(11,4,1,3,4940),
(11,4,1,4,4940),
(2,5,2,1,28095),
(2,5,2,2,28095),
(2,5,2,3,28095),
(2,5,2,4,28095),
(7,6,1,1,53930),
(7,6,1,2,50850),
(7,6,1,3,50850),
(6,7,1,1,17108),
(6,7,1,2,18800),
(6,7,1,3,18800),
(5,8,1,1,57395.03),
(5,8,1,2,57395.03),
(5,8,1,3,57395.03),
(3,9,1,1,15840),
(3,9,1,2,15840),
(10,1,1,1,18900),
(10,1,1,2,18900),
(10,1,1,3,18900),
(10,1,1,4,18900),
(8,5,1,1,2632.5),
(8,5,1,2,2632.5),
(8,5,1,3,2632.5),
(8,5,1,4,2632.5),
(9,6,1,1,23716.5),
(9,6,1,2,23716.5),
(9,6,1,3,23716.5),
(9,6,1,4,23716.5);

-- GESTION DE RECETAS

INSERT INTO fah_ingredientes (id, nombre, medicion, medicion_mix, descrip) VALUES
(1, 'Tomate', 'Sólido', FALSE, NULL),	
(2, 'Cebolla', 'Sólido', FALSE, NULL),	
(3, 'Vinagre de manzana', 'Líquido', FALSE, NULL),
(4, 'Pimiento verde italiano', 'Sólido', FALSE, NULL),	
(5, 'Pan', 'Sólido', FALSE, NULL),	
(6,	'Aceite de oliva extra virgen', 'Líquido', FALSE, NULL),	
(7,	'Agua', 'Líquido', TRUE, NULL),	
(8,	'Sal', 'Sólido', TRUE, NULL),	
(9, 'Zumo de Limón', 'Sólido', TRUE, NULL),	
(10, 'Azúcar', 'Sólido', TRUE, NULL),	
(11, 'Hielo', 'Sólido',	FALSE, NULL),
(12, 'Huevo', 'Sólido', FALSE, NULL),	
(13, 'Ralladura de limón', 'Sólido', FALSE, NULL),	
(14, 'Leche de almendras', 'Líquido', TRUE, NULL),	
(15, 'Esencia de vainilla', 'Líquido', TRUE, NULL),	
(16, 'Harina de garbanzo', 'Sólido', TRUE, NULL),	
(17, 'Moras', 'Sólido', TRUE, NULL),	
(18, 'Azúcar glase', 'Sólido', FALSE, NULL),	
(19, 'Maicena',	'Sólido', TRUE, NULL),	
(20, 'Masa de hojaldre', 'Sólido', FALSE, NULL),	
(21, 'Lomo bajo de ternera', 'Sólido', FALSE, NULL),	
(22, 'Escarola', 'Sólido', FALSE, NULL),	
(23, 'Diente de ajo', 'Sólido', FALSE, NULL),	
(24, 'Nuez', 'Sólido', FALSE, NULL),	
(25, 'Queso rallado', 'Sólido', TRUE, NULL),	
(26, 'Vino dulce', 'Líquido', TRUE, NULL),	
(27, 'Romero', 'Sólido', FALSE, NULL),	
(28, 'Canela en rama', 'Sólido', FALSE, NULL),	
(29, 'Harina de trigo',	'Sólido', TRUE, NULL),	
(30, 'Mantequilla', 'Sólido', TRUE, NULL),	
(31, 'Leche entera', 'Líquido', TRUE, NULL),	
(32, 'Nata','Líquido', TRUE, NULL),	
(33, 'Aglutinante', 'Sólido', FALSE, NULL),	
(34, 'Polvo de hielo', 'Sólido', FALSE, NULL),	
(35, 'Variegato polvo', 'Sólido', FALSE, NULL),	
(36, 'Crema agria', 'Sólido', TRUE, NULL);	

INSERT INTO fah_unidadesmedida (id, nombre, tipo, abrev, descrip) VALUES
(1, 'Gramo', 'Sólido', 'g', 'Unidad de masa'),
(2, 'Kilogramo', 'Sólido', 'kg', 'Unidad de masa'),
(3, 'Miligramo', 'Sólido', 'mg', 'Unidad de masa'),
(4, 'Litro', 'Líquido', 'l', 'Unidad de volumen'),
(5,	'Militro', 'Líquido', 'ml', 'Unidad de volumen'),
(6, 'Centilitro', 'Líquido', 'cc', 'Unidad de volumen'),
(7,	'Taza', 'Mixto', NULL, 'Unidad de masa y volumen'),
(8, 'Cucharada', 'Mixto', 'cda', 'Unidad de masa y volumen'),
(9, 'Cucharadita', 'Mixto', 'cdta', 'Unidad de masa y volumen'),
(10, 'Pizca', 'Sólido', NULL, NULL),		
(11, 'Chorrito', 'Líquido', NULL, NULL),		
(12, 'Vaso', 'Líquido', NULL, NULL),		
(13, 'Lamina', 'Sólido', NULL, NULL);

INSERT INTO fah_recetas (id, nombre, tipo, descrip, tiempo_prep, racion, id_prod, id_client) VALUES
(1, 'Gazpacho de tomates y cerezas', 'Plato salado', 'Sopa fría a base de tomates y cerezas.', 10, 6, 1, NULL),
(2, 'Granizado de cereza', 'Postre', 'Postre elaborado a base de cerezas deshuesadas trituradasy zumo de limón.', 18, 4, 4, NULL),
(3,	'Limonada de cereza', 'Bebida', 'Bebida refrescante a base de jugo de limón y cerezas.', 15, 6, NULL, 1),
(4, 'Clafoutis de moras y cerezas blancas', 'Postre', 'Si te gusta el dulce, pero no quieres que tenga exceso de azúcar o harinas, esta receta es una de las más adecuadas para ti.', 45, 6, 5, NULL),
(5,	'Empanadilla de cereza', 'Postre', 'Cereza es sinónimo de verano, y empanadilla de cereza es sinónimo de dulzura y placer. Súper fáciles de elaborar, estas empanadillas son perfectas para merendar, para la sobremesa o para un desayuno de lujo.', 60, 4, NULL, 1),
(6,	'Ternera asada a las cerezas', 'Plato salado', 'La receta original es de lomo de ternera asado con Madeira y jarabe de cereza.', 70, 4, 4, NULL),
(7, 'Tarta de cerezas ácidas', 'Postre', 'Esta cherry pie o tarta de cerezas al estilo norteamericano es de esas que en las películas dejan enfriar en el alféizar de la ventana, de ciencia ficción.', 50, 10, NULL, 3),
(8, 'Helado de cereza agria', 'Postre', 'Helado de cereza ácida a base de leche, afrutado y muy cremoso.', 75, 10, NULL, 5),
(9, 'Mermelada de cerezas', 'Postre', 'No hay nada más rico y sano para desayunar que tomar una tostada de pan con mermelada casera acompañando el café, leche o café con leche.', 120, 8, NULL, 10);

INSERT INTO fah_crzrecetas (id_crz, id_rece, ctd) VALUES 
(6, 1, 0.25),
(16, 2, 0.53),
(7, 3, 0.2),
(15, 4, 0.2),
(7, 5, 0.5),
(16, 6, 0.75),
(30, 7, 0.8),
(26, 8, 0.25),
(31, 9, 0.5);

INSERT INTO fah_recetasingredientes (id_rece, id_ing, ctd, id_u_med) VALUES
(1,	1, 500, 1),
(1,	2, 50, 1),
(1,	3, 20, 5),
(1,	4, 50, 1),
(1,	5, 100,	1),
(1,	6, 100,	5),
(1,	7, 200,	5),
(1,	8, NULL, 3),
(2,	10,	75,	1),
(2,	7, 125,	5),
(2,	9, 1, NULL),
(3,	9, 2, NULL),
(3,	7, 6, 7),
(3, 10, 0.75, 7),
(3, 11, NULL, NULL),
(4, 12, 3, NULL),
(4,	10,	50,	1),
(4,	13,	1, NULL),
(4,	14,	150, 5),
(4,	15,	5, 5),
(4, 8, 2, 1),
(4,	16,	70,	1),
(4, 17, 125, 1),
(4,	18,	30,	1),
(5,	10,	200, 1),
(5,	9, 1, 11),
(5,	8, 1, 10),
(5, 19, 1, 8),
(5, 7, 1, 11),
(5, 15, 1, 11),
(5, 20, 2, 13),
(5, 12,	1, NULL),
(5, 18, 20, 1),
(6, 21, 1.5, 2),
(6, 22, 1, NULL),
(6, 23,	1, NULL),
(6,	24,	100, 1),
(6,	25,	100, 1),
(6,	26,	0.5, 12),
(6,	27,	NULL, NULL),
(6, 28, NULL, NULL),
(6, 10, NULL, NULL),
(7, 29, 400, 1),
(7,	30,	250, 1),
(7,	8, 0.5,	9),
(7, 7, 100, 5),
(7,	12,	1, NULL),
(7, 10, 190, 1),
(7, 15, 1, 8),
(7, 19, 3, 8),
(8,	34,	140, 1),
(8, 36, 410, 1),
(8,	31,	240, 1),
(8,	32,	85,	1),
(8,	10,	189, 1),
(8,	33,	15,	1),
(8,	9, 35, 5),
(8,	8, 1, 10),
(8,	35,	120, 1),
(9,	10,	250, 1), 
(9,	9, 20, 5);

INSERT INTO fah_instrucciones (id_rece, num , descrip) VALUES
(1, 1, 'Trocear el pan'),
(1,	2, 'Remojar el pan troceado en el agua, dejando que se hidrate'),
(1,	3, 'Retirar el hueso y rabito de las cerezas (en su caso)'),
(1, 4, 'Colocar todos los ingredientes troceados en licuadora y batir'),
(1,	5, 'Pasar el gazpacho por un colador fino'),
(1,	6, 'Rectificar (añadir agua y/o vinagre si es necesario)'),
(1,	7, 'Agregar sal al gusto'),
(2,	1, 'Lavar y deshuesar las cerezas'),
(2, 2, 'Introducir en el congelador hasta que estén congeladas y luego triturarlas'),
(2,	3, 'Hervir en una olla agua, azúcar y limón'),
(2,	4, 'Al alcanzar el punto de ebullición, contar 2 min y leugo retirar la olla'),
(2,	5, 'Colocar el almíbar frío y las cerezas congelas en una batidora'),
(2,	6, 'Triturar hasta conseguir un puré cremoso'),
(2,	7, 'Servir el granizado resultante'),
(3,	1, 'Poner en la licuadora las cerezas, limones y azúcar junto con 2 tazas de agua'),
(3,	2, 'Licuar bien los ingredientes'),
(3,	3, 'Colar la mezcla licuada'),
(3,	4, 'Agregar las tazas de agua restante'),
(3,	5, 'Añadir hielo al gusto'),
(4,	1, 'Precalentar el horno a 175ºC y engrasar ligeramente un molde de tarta redondo.'),
(4,	2, 'Lavar y secar bien las moras y cerezas.'),
(4,	3, 'Trocearlas en piezas no muy pequeñas, desechando el hueso de las cerezas'),
(4,	4, 'Distribuir encima del molde.'),
(4,	5, 'Colocar los huevos y el azúcar en un cuenco y batir con batidora de varillas.'),
(4,	6, 'Añadir un poco de ralladura de limón, la leche, la vainilla y la sal, y batir un poco más.'),
(4,	7, 'Agregar la harina de garbanzos y batir hasta tener una mezcla sin grumos.'),
(4,	8, 'Echar con cuidado la masa líquida sobre las frutas.'),
(4,	9, 'Hornear durante unos 30-35 minutos, hasta que se haya dorado y al pinchar con un palillo salga limpio.'),
(4,	10, 'Esperar a que se enfríe antes de decorar con azúcar glasé.'),
(5,	1, 'Calienta en un cazo el azúcar, las cerezas, el zumo de limón y la sal. Cocina a fuego lento unos 5 minutos hasta que las cerezas se empiecen a mezclar con su jugo.'),
(5,	2, 'A continuación, incorpora la maicena previamente disuelta con el agua. Es importante que mezcles estos dos ingredientes primero para evitar que se formen grumitos.'),
(5,	3, 'Lleva a ebullición y cocina hasta obtener la textura deseada. Debes conseguir una pasta de fruta, similar a una compota con tropezones de cereza.'),
(5,	4, 'Una vez listo, retira del fuego, incorpora el extracto de vainilla e integra todos los elementos. Resérvalo para luego.'),
(5,	5, 'Precalienta el horno a 190ºC.'),
(5,	6, 'Estira las láminas de hojaldre y corta cuadrados del mismo tamaño, agrupándolos por parejas. Cada par formaran la parte superior y la parte inferior de cada empanadilla.'),
(5,	7, 'Rellena los cuadrados con un par o tres de cucharadas de compota de cerezas en el centro, dejando los laterales libres.'),
(5,	8, 'Con la ayuda de un pincel, unta los laterales con un poco de huevo batido, que actuará a modo de pegamento.'),
(5,	9, 'Cubre cada una de las piezas con las láminas superiores, formando un paquetito, y ciérralos presionando los laterales con la ayuda de un tenedor.'),
(5,	10, 'Pinta las empanadillas con un poco de huevo para obtener un color dorado brillante.'),
(5,	11,	'Hornéalas en una bandeja forrada con papel de horno durante 25 minutos a 190ºC.'),
(5,	12,	'Una vez saques las empanadillas del horno déjalas enfriar a temperatura ambiente. '),
(6,	1, 'Limpiar la carne de grasas, bridar, frotar con romero y ajo, salpimentar y dorar al fuego.'),
(6,	2, 'Disponerla sobre una rejilla de horno y hornear 35 minutos a 200º C.'),
(6,	3, 'Para la salsa de cerezas, disponer en la sartén donde hemos dorado la carne, 400 gr. de cerezas deshuesadas, 50 gr. de azúcar, ½ vaso de agua, ½ vaso de vino dulce y 1 rama de canela. Dejar hervir suave 15 minutos.'),
(6,	4, 'Sacar la carne del horno y dejar enfriar cubierta con aluminio.'),
(6,	5, 'Añadir el jugo de asar la carne a la salsa, introducir en una jarra, triturar y reservar.'),
(6,	6, 'Disponer la escarola en un bol, añadir nueces, queso rallado, cerezas y aliñar.'),
(6,	7, 'Cortar la carne fría en finas rodajas.'),
(7,	1, 'Deshuesar las cerezas y ponerlas en una ensaladera con todo el azúcar y las semillas de la vaina de vainilla. Se mezcla todo bien y se dejan macerar toda la noche para que suelten su jugo.'),
(7,	2, 'Se prepara la masa quebrada, y se deja reposar al menos 12 horas.'),
(7,	3, 'Se divide la masa en dos partes, una un poco mayor que la otra, y se estira la porción mayor para colocarla en el molde untado de mantequilla y enharinado, de 23-24 cm'),
(7,	4, 'Coloco también en el fondo del molde un círculo de papel de hornear, para asegurarme de que luego la tarta no se pega.'),
(7,	5, 'Metemos la base en el congelador a reposar por lo menos un cuarto de hora. La otra porción, la que usaremos para el enrejado, se aplana un poco en forma de rectángulo, se envuelve en plástico y se deja reposar también.'),
(7,	6, 'Mientras las masas reposan se pone el horno a calentar a 205 ºC (aire)/220 ºC (sin aire).'),
(7,	7, 'Cuando la masa para el enrejado haya reposado, se aplana con el rodillo en forma más o menos rectangular, hasta un grosor de unos 2 mm. Deben salir 16-18 tiras de masa, la mitad para cada sentido.'),
(7,	8, 'Se añade la maizena a las cerezas y se remueve bien.'),
(7,	9, 'Se saca la base del congelador y se distribuye por encima la mezcla de cerezas. Se forma el enrejado colocando las tiras de masa encima de las cerezas'),
(7,	10,	'Se bate el huevo y se pinta el enrejado.'),
(7,	11, 'Se mete la tarta al horno en la parte inferior, con calor por debajo, y se cuece 15 minutos, al cabo de los cuales se baja la temperatura a 180 ºC (aire)/200 ºC (sin aire)'),
(7,	12,	'Se acaba de cocer otros 35-40 minutos, según como se vea de dorada. El relleno debe verse burbujeante.'),
(7,	13,	'Se saca y se deja enfriar en una rejilla, sin desmoldar porque es demasiado frágil.'),
(8,	1, 'Mezcle los ingredientes secos, la leche, el jugo de limón y la crema agria durante dos minutos en la posición más alta.'),
(8,	2, 'Agregue la crema y mezcle por otros 20 segundos a fuego medio.'),
(8,	3, 'Dejar madurar en la nevera durante al menos tres horas.'),
(8,	4, 'Mezclar nuevamente la base de hielo y congelar con la heladera o el método manual'),
(8,	5, 'El helado terminado en capas con la guinda Variegato Vierta en el recipiente del congelador.'),
(8,	6, 'Dejar congelar en el congelador a -24 grados durante 18 horas.'),
(8,	7, 'Mezcle los ingredientes secos, el puré de guindas y el jugo de limón en una cacerola.'),
(8,	8, 'Cocine todo por dos minutos'),
(8,	9, 'Verter inmediatamente en frascos enjuagados con agua caliente y dejar reposar 24 horas.'),
(9,	1, 'Lo primero que hay que hacer para elaborar esta mermelada de cerezas casera es deshuesar las cerezas sobre un bol para recoger el jugo que sueltan.'),
(9, 2, 'Pon las cerezas en el bol y añade el zumo de limón, mezcla y añade todo el azúcar, remueve para que se mezclen bien todos los ingredientes.'),
(9,	3, 'Deja que repose todo junto una hora más o menos.'),
(9 ,4, 'Pon la mezcla de cerezas y azúcar en un cazo al fuego fuerte hasta que rompa a hervir, baja a fuego medio-bajo y sigue cociendo durante una media hora, y remueve de vez en cuando con una espátula de silicona para que no se pegue el azúcar.'),
(9 ,5, 'Tritura la mermelada de cerezas con una batidora hasta el punto que te guste'),
(9 ,6, 'Comprueba que la mermelada casera de cerezas está en su punto echando un poco en un plato y cogiéndola con los dedos, debe formar un hilo entre ellos al separarlos.'),
(9,	7, 'Si vas a utilizar la mermelada de cerezas casera en pocos meses, una vez los tarros esterilizados estén llenos y tapados, ponlos boca abajo para que hagan el vacío hasta que estén fríos por completo. Si los quieres guardar por más tiempo tienes que hervir los tarros llenos durante 15 minutos. Luego apaga el fuego y deja que se enfríen dentro del agua.');

-- EVALUACION EMPRESAS CLIENTE A PRODUCTORAS

INSERT INTO fah_criterios ( id, nombre, descripcion, tipo ) values
    ( 1, 'Frescura', NULL, 'Variedad' ),
    ( 2, 'Cerezas enteras', NULL,  'Variedad' ),
    ( 3, 'Sanidad', 'Se excluyen en todos los casos los frutos atacados de pobredumbre o de alteraciones tales que las hagan impropios para el consumo', 'Variedad' ),
    ( 4, 'Firmeza', NULL, 'Variedad'),
    ( 5, 'Limpieza y sanitización', 'Exención de materias extrañas visibles', 'Variedad' ),
    ( 6, 'Exención de humedad exterior anormal', NULL, 'Variedad' ),
    ( 7, 'Exención de olores y/o sabores extraños', NULL, 'Variedad' ),
    ( 8, 'Maduración', 'Las cerezas presentarán un desarrollo suficiente y un grado de madurez queles permita soportar la manipulación y el transporte', 'Variedad'),
    ( 9, 'Calidad del envasado', NULL, 'Variedad' ),
    ( 10, 'Registro fenológico', 'Indicación para el cálculo de posibles fechas de cosecha', 'Variedad'),
    ( 11, 'Control de temperatura de ingreso de la fruta', NULL, 'Variedad' ),
    ( 12, 'Tamañado', 'El calibre es determinado por el sistema de tamañado, que de acuerdo con el sistema utilizado, puede ser tipo mecánica; ello al segregar los frutos por su diámetro, al pasar por distintos elementos de separación, como cintas divergentes, alveolos, entre otros o electrónica por procesamiento de imagen', 'Variedad'),
    ( 13, 'Tratamientos poscosecha', 'Los hongos patógenos son una de las principales causas de pérdida durante la poscosecha de cereza. El manejo de las enfermedades de poscosecha se debe realizar utilizando un enfoque sistémico, que contemple el manejo del cultivo y las condiciones del fruto desde la etapa de producción en el campo, las prácticas de cosecha, la sanitización de las instalaciones, los equipos y el agua, el manejo del frío durante el almacenamiento y la utilización de productos fitosanitarios', 'Individual' ),
    ( 14, 'Pardeamiento del pedunculo', NULL, 'Variedad' ),
    ( 15, 'Composición en Vitaminas y carotenoides', NULL, 'Variedad' ),
    ( 16, 'Clasificación del color', 'Carta de colores, cosecha y tonalidad general de las cerezas', 'Variedad' );
    
INSERT INTO fah_formulas (id_crit, id_client, sabor_crz, tasa_import) values
    (	7	,	2	,'Dulce',	25	),
    (	2	,	1	,'Dulce',	7	),
    (	5	,	3	,'Dulce',	8	),
    (	6	,	4	,'Dulce',	11	),
    (	3	,	5	,'Dulce',	22	),
    (	5	,	6	,'Dulce',	13	),
    (	1	,	7	,'Dulce',	12	),
    (	1	,	8	,'Dulce',	33	),
    (	4	,	9	,'Dulce',	25	),
    (	4	,	10	,'Dulce',	19	),
    (	8	,	6	,'Dulce',	6	),
    (	8	,	3	,'Dulce',	45	),
    (	2	,	7	,'Dulce',	32	),
    (	6	,	1	,'Dulce',	28	),
    (	4	,	1	,'Dulce',	39	);
    
INSERT INTO fah_valoraciones (id_client, id, interpretacion) values 
( 1, 1, 'Reprobado'),
( 1, 2, 'Regular'),
( 1, 3, 'Excelente'),
( 2, 1, 'Las condiciones de calidad no fueron logradas'),
( 2, 2, 'Medianana parte de las condiciones de calidad fueron logradas'),
( 2, 3, 'Condiciones de calidad cumplidas satisfactoriamente'),
( 3, 1, 'Bajo desempeño'),
( 3, 2, 'Mediano desempeño'),
( 3, 3, 'Alto desempeño'),
( 4, 1, 'Deficiente, puede mejorar'),
( 4, 2, 'Aceptable'),
( 4, 3, 'Máximos estándares de calidad alcanzados'),
( 5, 1, 'Violación de las pautas y/o normativas del contrato estipulado'),
( 5, 2, 'Cumplimiento de la gran mayoría de las directrices del contrato'),
( 5, 3, 'Cumplimiento en su totalidad de las directrices del contrato'),
( 6, 1, 'Deficiente'),
( 6, 2, 'Regular'),
( 6, 3, 'Excelente'),
( 7, 1, 'Deficiente'),
( 7, 2, 'Aceptable'),
( 7, 3, 'Sobresaliente'),
( 8, 1, 'Ausencia en la satisfacción de requisitos'),
( 8, 2, 'Requisitos medianamente alcanzados con éxitos'),
( 8, 3, 'Requisitos alcanzados por completo y de forma satisfactoria'),
( 9, 1, 'Las condiciones de calidad no fueron logradas'),
( 9, 2, 'Medianana parte de las condiciones de calidad fueron logradas'),
( 9, 3, 'Condiciones de calidad cumplidas satisfactoriamente'),
( 10, 1, 'Bajo desempeño'),
( 10, 2, 'Mediano desempeño'),
( 10, 3, 'Alto desempeño');
    
INSERT INTO fah_evalanuales ( id_prod, id_client, anio, result, prt_result, decision) values 
    (1, 2, STR_TO_DATE ('2022', '%Y'), 2.75, 91.67, 'Aprobado' ),
    (4, 7, STR_TO_DATE ('2019', '%Y'), 1.4, 46.67, 'Reprobado' ),
    (2, 3, STR_TO_DATE ('2021', '%Y'), 2.5, 83.33, 'Aprobado' ),    
    (2, 3, STR_TO_DATE ('2022', '%Y'), 2.45, 81.67, 'Aprobado' ),
    (11, 4, STR_TO_DATE ('2022', '%Y'), 2.67, 89, 'Aprobado' ),
    (2, 5,  STR_TO_DATE ('2022', '%Y'), 2.95, 98.33, 'Aprobado' ),
    (7, 6,  STR_TO_DATE ('2018', '%Y'), 2.25, 75, 'Aprobado' ),
    (7, 6, STR_TO_DATE ('2019', '%Y'), 2.78, 92.67, 'Aprobado' ),
    (7, 6, STR_TO_DATE ('2020', '%Y'), 2.8,  93.33, 'Aprobado' ),
    (7, 6, STR_TO_DATE ('2021', '%Y'), 1.32, 44, 'Reprobado' ),
    (6, 7, STR_TO_DATE ('2020', '%Y'), 2.07, 69, 'Aprobado' ),
    (6, 7, STR_TO_DATE ('2021', '%Y'), 2.38, 79.33, 'Aprobado' ),
    (6, 7, STR_TO_DATE ('2022', '%Y'), 3,  100, 'Aprobado'),
    (5, 8, STR_TO_DATE ('2020', '%Y'), 2.11,  70.33, 'Aprobado' ),
    (5, 8, STR_TO_DATE ('2021', '%Y'), 2.17, 72.33, 'Aprobado' ),
    (5, 8, STR_TO_DATE ('2022', '%Y'), 2.78, 92.67, 'Aprobado' ),
    (3, 9, STR_TO_DATE ('2019', '%Y'), 2.8, 93.33, 'Aprobado'),
    (3, 9, STR_TO_DATE ('2020', '%Y'), 1.2, 40, 'Reprobado' ),
    (10, 1, STR_TO_DATE ('2019', '%Y'), 2.21, 73.67, 'Aprobado' ),
    (10, 1, STR_TO_DATE ('2020', '%Y'), 2.3, 76.67, 'Aprobado' ),
    (10, 1, STR_TO_DATE ('2021', '%Y'), 2.06, 68.67, 'Aprobado' ),
    (10, 1, STR_TO_DATE ('2022', '%Y'), 2.89, 96.33, 'Aprobado' ),
    (8, 5, STR_TO_DATE ('2017', '%Y'), 2.6, 86.67, 'Aprobado' ),
    (8, 5,  STR_TO_DATE ('2018', '%Y'), 1.08, 36, 'Reprobado' ),
    (9, 6, STR_TO_DATE ('2021', '%Y'), 2.64, 88, 'Aprobado' ),
    (9, 6, STR_TO_DATE ('2022', '%Y'), 2.77, 92.33, 'Aprobado' );