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

    it("Testeá la función buscarRestaurante(1,2)", function(){
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
    it("Testeá la función obtenerRestaurantes()", function() {
        
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
     it("Test la función  precioReservaBase()", function(){
         let fechaHora = new Date(2019, 11, 11, 20, 55); // te estan faltando parametros
         let reserva = (fechaHora, 6, 500,"DES15");

     })

});