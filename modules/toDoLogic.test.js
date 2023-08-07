/* eslint-disable import/no-unresolved */
import { ToDo } from './ToDoLogic.js';

// Importar el paquete jsdom-global
// eslint-disable-next-line import/no-extraneous-dependencies
import 'jsdom-global';

// Mock manual del módulo que contiene la clase ToDo
jest.mock('./ToDoLogic.js', () => ({
  ToDo: jest.fn().mockImplementation(() => ({
    handleKeyPress: jest.fn(),
    eliminateTask: jest.fn(),
    updateIndex: jest.fn(),
    saveLocalStorage: jest.fn(),
    showLocal: jest.fn(),
    executeInputFunctioning: jest.fn(),
    resetTasks: jest.fn(),
    changeState: jest.fn(),
    handlerClearAll: jest.fn(),
    clearAllButton: jest.fn(),
  })),
}));

describe('Testing ToDo class behavior', () => {
  // Helper para limpiar el DOM después de cada prueba
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should create a new li element when pressing Enter', () => {
    // Arrange
    const $input = document.createElement('input');
    $input.setAttribute('id', 'input'); // Asignar id para facilitar la identificación
    document.body.appendChild($input);

    const todoInstance = new ToDo(); // Instancia de la clase ToDo

    // Act
    $input.value = 'New task'; // Establecer valor en el input
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' }); // Utilizar window.KeyboardEvent
    $input.dispatchEvent(enterEvent); // Disparar evento de tecla Enter

    // Assert
    // Asegurarse de que la función handleKeyPress se haya llamado una vez
    expect(todoInstance.handleKeyPress).toHaveBeenCalledTimes(1);

    // Asegurarse de que un nuevo elemento li haya sido agregado al HTML
    const $listTasks = document.querySelector('#list-tasks');
    expect($listTasks.children.length).toBe(1);
    expect($listTasks.children[0].tagName).toBe('LI');

    // Asegurarse de que los métodos relevantes para actualizar la lista se hayan llamado
    expect(todoInstance.updateIndex).toHaveBeenCalledTimes(1);
  });
});
