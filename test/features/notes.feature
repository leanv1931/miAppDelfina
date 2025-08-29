Feature: Gestión de Notas
  Como usuario
  Quiero gestionar notas sobre Delfina
  Para recordar información importante

  Scenario: Agregar una nueva nota
    Given que estoy en la página de notas
    When escribo "ir al pediatra" en el campo de nueva nota
    And hago clic en el botón guardar
    Then debo ver la nota "ir al pediatra" en la lista de notas guardadas
