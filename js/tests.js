var expect = chai.expect;

describe('Test de la función reservarHorario', function() {
    it("Cuando se reserva un horario de un restaurant, el horario correspondiente se elimina del arreglo", function(){
        // Inicializar variables que contienen los metodos a testear
        let restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]) 

        // Ejecutar metodos que se quieren testear
        restaurant.reservarHorario("13:00");

        // Verificar que el resultado devuelto por la funcion coincida con el resultado esperado
        expect(undefined).to.equal(restaurant.horarios.find(x => x == "13:00"));
        expect(2).to.equal(restaurant.horarios.length);
    });

    it("Cuando se reserva un horario que el restaurant no posee, el arreglo se mantiene igual", function(){
        
        let horarios = ["15:00", "14:30", "12:30"]
        let restaurant = new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", horarios.slice(), "../img/asiatica2.jpg", [7, 7, 3, 9, 7])
        
        restaurant.reservarHorario("25:00");
        
        
        expect(3).to.equal(restaurant.horarios.length);
        expect(horarios).to.have.ordered.members(restaurant.horarios);
    });

    it("Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, el arreglo se mantiene igual.", function(){
        
        let horarios = ["15:00", "14:30", "12:30"]
        let restaurant = new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", horarios, "../img/asiatica2.jpg", [7, 7, 3, 9, 7])
        
        restaurant.reservarHorario();
        
        expect(3).to.equal(restaurant.horarios.length);
        expect(horarios).to.have.ordered.members(restaurant.horarios);
    });
});


describe("Test de la función obtenerPuntuación", function(){
    it("Cuando el restaurante no tiene calificaciones el promedio debe ser zero.", function(){
        let calificaciones = [];
        let restaurant = new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", [], "../img/asiatica2.jpg", calificaciones)
        
        let resultado = restaurant.obtenerPuntuacion();

        expect(0).to.equal(resultado);
    })

    it("Cuando el restaurante tiene calificaciones de 10, 5, 5, 0, el promedio debe ser 5.", function(){
        let calificaciones = [10, 5, 5, 0];
        let restaurant = new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", [], "../img/asiatica2.jpg", calificaciones)
        
        let resultado = restaurant.obtenerPuntuacion();

        expect(5).to.equal(resultado);
    })
});

describe("Test de la función calificar", function(){
    it("Agrega una nueva calificación al arreglo de calificaciones.", function(){
        let calificaciones = [];
        let restaurant = new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", [], "../img/asiatica2.jpg", calificaciones)
        restaurant.calificar(8);

        expect(1).to.equal(restaurant.calificaciones.length);
    })

    it("cuando se califica con un valor no esperado como string ", function(){
        let calificaciones = [];
        let restaurant = new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", [], "../img/asiatica2.jpg", calificaciones)
        restaurant.calificar("g")

        expect(0).to.equal(restaurant.calificaciones.length)
    })

    it("cuando se califica con un valor no esperado como el  zero", function(){
        let calificaciones = [];
        let restaurant = new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", [], "../img/asiatica2.jpg", calificaciones)
        restaurant.calificar(0)

        expect(0).to.equal(restaurant.calificaciones.length)
    })

    it("cuando se califica con un valor no esperado como el  11", function(){
        let calificaciones = [];
        let restaurant = new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", [], "../img/asiatica2.jpg", calificaciones)
        restaurant.calificar(11)

        expect(0).to.equal(restaurant.calificaciones.length)
    })
});


describe("Testeá la función buscarRestaurante(id)", function(){

    it("Testeá busca el restaurnate con el id correspondiente ", function(){
        let restaurantes = [new Restaurant(1), new Restaurant(2)]
        let listado = new Listado(restaurantes)
        let restaurante = listado.buscarRestaurante(2)

        expect(restaurante).to.equal(restaurantes[1])

    })
    
    it("Test de la función buscarRestaurant cuando le paso un id que no existe", function(){
        let restaurantes = [new Restaurant(1), new Restaurant(2)]
        let listado = new Listado(restaurantes)
        let restaurante = listado.buscarRestaurante(7)

        expect(typeof restaurante).to.equal('string')

    })
});

describe("Testeá la función obtenerRestaurantes()", function() {
    it("Test cuando se le pasan los filtros Asiática, Nueva York, 15:30 ", function() {
        
        let restaurant1 = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"]);
        let restaurant2 = new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"]);
    
        let restaurantes = [restaurant1, restaurant2];
        let listado = new Listado(restaurantes);   

        let result = listado.obtenerRestaurantes("Asiática", "Nueva York", "15:30");

        expect(1).to.equal(result.length);
        expect(restaurant1).to.equal(result[0]);

    })

    it("Ningun restaurante cumple con los filtros ", function() {
        
        let restaurant1 = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"]);
        let restaurant2 = new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"]);
    
        let restaurantes = [restaurant1, restaurant2];
        let listado = new Listado(restaurantes);   

        let result = listado.obtenerRestaurantes("pizza", "Berlin", "20:00");

        expect(0).to.equal(result.length);
        
    })
});

//testing de reserva 

describe("Test la función precioReservaBase ()", function(){
     it("Test la funcion y devuelve el precio base de acuerdo a los datos: fechaHora, 4, 500 ", function(){
        let fechaHora = new Date(2019, 11, 11, 20, 55);
        let reserva = new Reserva(fechaHora, 4, 500);
        let resut = reserva.precioReservaBase();
        
        expect(2000).to.equal(resut);
     })
});

describe("test la funcion descuentosPorGruposGrandes()", function(){
    it("test la funcion cuando son 6 personas tiene un descuento del 5%", function(){
        let fechaHora = new Date(2019, 11, 11, 20, 55); 
        let reserva = new Reserva(fechaHora, 6, 500);
        let resut = reserva.descuentosPorGruposGrandes();
        
        expect(150).to.equal(resut);

    })

    it("test la funcion cuando con 8 personas tienen un descuento del 10%", function(){
        let fechaHora = new Date(2019, 11, 11, 20, 55); 
        let reserva = new Reserva(fechaHora, 8, 400);
        let resut = reserva.descuentosPorGruposGrandes();

        expect(320).to.equal(resut);

    })

    it("test la funcion cuando son mas de 10 personas tienen un descuento del 15%", function(){
        let fechaHora = new Date(2019, 11, 11, 20, 55); 
        let reserva = new Reserva(fechaHora, 10, 550);
        let resut = reserva.descuentosPorGruposGrandes();
        
        expect(825).to.equal(resut);

    })

 })

describe("test la funcion descuentosPorCodigos()", function(){
    it("test cuando el codigo descuento es DES15 ", function(){
        let fechaHora = new Date(2019, 11, 13, 18, 35); 
        let reserva = new Reserva(fechaHora, 5, 450, "DES15");
        let resut = reserva.descuentosPorCodigos();
        
        expect(337.5).to.equal(resut);

    })

    it("test cuando el codigo descuento es DES200 ", function(){
        let fechaHora = new Date(2019, 11, 13, 18, 35); 
        let reserva = new Reserva(fechaHora, 5, 450, "DES200");
        let resut = reserva.descuentosPorCodigos();
        
        expect(200).to.equal(resut);

    })

    it("test cuando el codigo descuento es DES1", function(){
        let fechaHora = new Date(2019, 11, 13, 18, 35); 
        let reserva = new Reserva(fechaHora, 7, 450, "DES1");
        let resut = reserva.descuentosPorCodigos();
        
        expect(450).to.equal(resut);

    })

    it("test cuando no hay descuentos por codigo devuelve zero ", function(){
        let fechaHora = new Date(2019, 11, 13, 18, 35); 
        let reserva = new Reserva(fechaHora, 7, 450,);
        let resut = reserva.descuentosPorCodigos();
        
        expect(0).to.equal(resut);
    })
})

describe("test la funcion adicionalesPorSemana()", function(){
    it("test cuando se seleciona un adicional por ser el dia viernes, sabado, domingo ", function(){
        let fechaHora = new Date(2019, 11, 13, 18, 35);
        let reserva = new Reserva(fechaHora, 9, 450,)
        let resut = reserva.adicionalesPorSemana();
        
        expect(405).to.equal(resut);
    })

    it("test cuando no se seleciona ningun dia con adicionales ", function(){
        let fechaHora = new Date(2019, 11, 11, 18, 35);
        let reserva = new Reserva(fechaHora, 9, 450,)
        let resut = reserva.adicionalesPorSemana();
        
        expect(0).to.equal(resut);
    })
})

describe("test la funcion adicionalesPorHorarios()", function(){
    it("test cuando la reserva esta en horarios 13, 14 o 20, 21 horas un adicional de 5%",function(){
        let fechaHora = new Date(2019, 11, 13, 13, 35);
        let reserva = new Reserva(fechaHora, 9, 500,)
        let resut = reserva.adicionalesPorHorarios();
    
        expect(225).to.equal(resut);
    
    })

    it("test cuando no se seleciona una hora con adicionales ", function(){
        let fechaHora = new Date(2019, 11, 11, 15, 35);
        let reserva = new Reserva(fechaHora, 9, 450,)
        let resut = reserva.adicionalesPorSemana();
        
        expect(0).to.equal(resut);

    })

})

describe("test la funcion precioTotalReserva()",function(){
    it("test que la funcion cumple con los descuentos y adicinales requeridos", function(){
        let fechaHora = new Date (2019, 11, 14, 20, 30);
        let reserva = new Reserva(fechaHora, 9, 650, "DES15")
        let result = reserva.precioTotalReserva();

        expect(4972.5).to.equal(result);

    })

})