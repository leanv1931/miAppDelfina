Feature: Página Principal
  Como usuario
  Quiero ver la página principal de Delfina
  Para navegar por la aplicación

  Scenario: Mostrar información de la página principal
    Given que estoy en la página principal
    When la página se carga completamente
    Then debo ver el título "Delfina"
    And debo ver el encabezado "Bienvenida Delfina"
    And debo ver la foto de Delfina
    And debo ver el botón para navegar a notas
