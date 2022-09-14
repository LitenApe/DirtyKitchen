import { DescendantManager } from '../DescendantManager';

describe('DescendantManager', () => {
  test('successfully register a node', () => {
    const manager = new DescendantManager();

    document.body.innerHTML = '<div id="node"></div>';
    const node = document.querySelector('#node');

    const position = manager.register(node);
    expect(position).toBe(0);
  });

  test('elements are sorted correctly', () => {
    const manager = new DescendantManager();

    document.body.innerHTML = `
      <div id="node_1"></div>
      <div id="node_2"></div>
      <div id="node_3"></div>
    `;

    const nodeOne = document.querySelector('#node_1');
    const nodeTwo = document.querySelector('#node_2');
    const nodeThree = document.querySelector('#node_3');

    const firstEntry = manager.register(nodeThree);
    expect(firstEntry).toBe(0);

    const secondEntry = manager.register(nodeOne);
    expect(secondEntry).toBe(0);
    expect(manager.getIndex(nodeThree)).toBe(1);

    const thirdEntry = manager.register(nodeTwo);
    expect(thirdEntry).toBe(1);
    expect(manager.getIndex(nodeOne)).toBe(0);
    expect(manager.getIndex(nodeThree)).toBe(2);
  });

  test('elements are sorted after each unregistration', () => {
    const manager = new DescendantManager();

    document.body.innerHTML = `
      <div id="node_1"></div>
      <div id="node_2"></div>
      <div id="node_3"></div>
    `;

    const nodeOne = document.querySelector('#node_1');
    const nodeTwo = document.querySelector('#node_2');
    const nodeThree = document.querySelector('#node_3');

    manager.register(nodeOne);
    manager.register(nodeTwo);
    manager.register(nodeThree);

    expect(manager.getIndex(nodeOne)).toBe(0);
    expect(manager.getIndex(nodeTwo)).toBe(1);
    expect(manager.getIndex(nodeThree)).toBe(2);

    manager.unregister(nodeTwo);

    expect(manager.getIndex(nodeOne)).toBe(0);
    expect(manager.getIndex(nodeThree)).toBe(1);
    expect(manager.getIndex(nodeTwo)).toBe(-1);

    manager.unregister(nodeOne);

    expect(manager.getIndex(nodeThree)).toBe(0);
    expect(manager.getIndex(nodeOne)).toBe(-1);
  });

  test('nested node has higher position then parent', () => {
    const manager = new DescendantManager();

    document.body.innerHTML = `
      <div id="node_1"><div id="node_2"><div id="node_3"></div></div></div>
    `;

    const nodeOne = document.querySelector('#node_1');
    const nodeTwo = document.querySelector('#node_2');
    const nodeThree = document.querySelector('#node_3');

    manager.register(nodeOne);
    manager.register(nodeTwo);
    manager.register(nodeThree);

    expect(manager.getIndex(nodeOne)).toBe(0);
    expect(manager.getIndex(nodeTwo)).toBe(1);
    expect(manager.getIndex(nodeThree)).toBe(2);
  });

  test('returns next node in descendant list order', () => {
    const manager = new DescendantManager();

    document.body.innerHTML = `
      <div id="node_1"></div>
      <div id="node_2"></div>
    `;

    const nodeOne = document.querySelector('#node_1');
    const nodeTwo = document.querySelector('#node_2');

    manager.register(nodeOne);
    manager.register(nodeTwo);

    expect(manager.getNext(nodeOne)).toBe(nodeTwo);
  });

  test('returns previous node in descendant list order', () => {
    const manager = new DescendantManager();

    document.body.innerHTML = `
      <div id="node_1"></div>
      <div id="node_2"></div>
    `;

    const nodeOne = document.querySelector('#node_1');
    const nodeTwo = document.querySelector('#node_2');

    manager.register(nodeOne);
    manager.register(nodeTwo);

    expect(manager.getPrevious(nodeTwo)).toBe(nodeOne);
  });

  test('should not loop by default', () => {
    const manager = new DescendantManager();

    document.body.innerHTML = `
      <div id="node_1"></div>
      <div id="node_2"></div>
    `;

    const nodeOne = document.querySelector('#node_1');
    const nodeTwo = document.querySelector('#node_2');

    manager.register(nodeOne);
    manager.register(nodeTwo);

    expect(manager.getPrevious(nodeOne)).toBeUndefined();
    expect(manager.getNext(nodeTwo)).toBeUndefined();
  });

  test('should loop when specified', () => {
    const manager = new DescendantManager();

    document.body.innerHTML = `
      <div id="node_1"></div>
      <div id="node_2"></div>
    `;

    const nodeOne = document.querySelector('#node_1');
    const nodeTwo = document.querySelector('#node_2');

    manager.register(nodeOne);
    manager.register(nodeTwo);

    expect(manager.getPrevious(nodeOne, true)).toBe(nodeTwo);
    expect(manager.getNext(nodeTwo, true)).toBe(nodeOne);
  });
});
