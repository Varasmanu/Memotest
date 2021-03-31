const URL = "127.0.0.1:5500";
const NUMERO_CUADROS = 12;

context("Memotest", () => {
  before(() => {
    cy.visit(URL);
  });

  describe("Juega al simon dice", () => {
    it("Asegura que haya un tablero con cuadros", () => {
      cy.get("#tablero").find(".cuadro").should("have.length", NUMERO_CUADROS);
    });

    it("Asegura que los cuadros se ordenen de manera aleatoria", () => {
      cy.get(".cuadro").then((cuadros) => {
        let clasesOriginales = [];
        cuadros.each(function (i, cuadro) {
          clasesOriginales.push(cuadro.className);
        });

        cy.visit(URL);

        let clasesNuevas = [];
        cy.get(".cuadro").then((nuevosCuadros) => {
          nuevosCuadros.each(function (i, cuadro) {
            clasesNuevas.push(cuadro.className);
          });

          cy.wrap(clasesOriginales).should("not.deep.equal", clasesNuevas);
        });
      });
    });
  });

  describe("Resuelve el juego", () => {
    let mapaDePares, listaDePares;
    it("elige una combinacion errónea", () => {
      cy.get(".cuadro").then((cuadros) => {
        mapaDePares = obtenerParesDeCuadros(cuadros);
        listaDePares = Object.values(mapaDePares);
        listaDePares[0][1].click();
        listaDePares[1][0].click();

        cy.get(".cuadro").should("have.length", NUMERO_CUADROS);
      });
    });

    it("resuelve el juego", () => {
      cy.get(".cuadro").should("have.length", NUMERO_CUADROS);

      listaDePares.forEach((par) => {
        cy.get(par[0]).click();
        cy.get(par[1]).click();
      });
      cy.get(".cuadro").should("have.length", 0);

      cy.get("#tablero").should("be.not.visible");
      const num_turnos = NUMERO_CUADROS / 2 + 1;
      cy.get(".display-1")
        .should("be.visible")
        .contains(`Fin del juego! Tardaste ${num_turnos} turnos en terminar.`);
    });
  });
});

function obtenerParesDeCuadros(cuadros) {
  const pares = {};
  cuadros.each((i, cuadro) => {
    const claseColor = cuadro.className.replace("cuadro ", "");

    if (pares[claseColor]) {
      pares[claseColor].push(cuadro);
    } else {
      pares[claseColor] = [cuadro];
    }
  });

  console.log(pares);
  return pares;
}
