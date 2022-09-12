import { getNextIndex, getPreviousIndex, sortNodes } from './utils';
import { isNull, isUndefined } from '../type_checks';

/**
 * Keep track of where HTML nodes are in the DOM Tree in
 * relation to each other by registering and sorting nodes
 * of interest.
 */
export class DescendantManager {
    private _descendants = new Map<Element, number>();

    /**
   * Add a node to the list of descendant, to find out
   * it's position in relation to other nodes in the vicinity
   * @param node node we wish to know the position of
   * @returns returns the nodes position in correlation to other registered nodes
   */
    register(node: Element | null): number {
        if (isNull(node)) {
            return -1;
        }

        this._descendants.set(node, -1);
        this.sort();
        return this.getIndex(node);
    }

    /**
   * Remove node from list of descendants
   * @param node node we wish to remove
   * @returns
   */
    unregister(node: Element | null): void {
        if (isNull(node)) {
            return;
        }

        this._descendants.delete(node);
        this.sort();
    }

    /**
   * sorts all registered descendants and keep positions up to date
   */
    private sort() {
        const keys = Array.from(this._descendants.keys());
        const sorted = sortNodes(keys);
        sorted.forEach((node, index) => this._descendants.set(node, index));
    }

    /**
   * Get the index of the respective node
   * @param node the node we wish to know the position of
   * @returns number representing the position, -1 if node is not registered
   */
    getIndex(node: Element | null): number {
        if (isNull(node)) {
            return -1;
        }

        const position = this._descendants.get(node);

        if (isUndefined(position)) {
            return -1;
        }

        return position;
    }

    /**
   * get next node
   * @param node the current node
   * @returns returns the next node in the list, undefined if we are at the last element and loop is set to false
   */
    getNext(node: Element | null, loop = false): Element | undefined {
        if (isNull(node)) {
            return undefined;
        }

        const current = this.getIndex(node);

        if (current === -1) {
            return undefined;
        }

        const values = Array.from(this._descendants.entries());
        const nextIndex = getNextIndex(current, values.length, loop);
        const next = values.find(([_, position]) => nextIndex === position);
        return isUndefined(next) ? undefined : next[0];
    }

    getPrevious(node: Element | null, loop = false): Element | undefined {
        if (isNull(node)) {
            return undefined;
        }

        const current = this.getIndex(node);

        if (current === -1) {
            return undefined;
        }

        const values = Array.from(this._descendants.entries());
        const previousIndex = getPreviousIndex(current, values.length, loop);
        const previous = values.find(([_, position]) => previousIndex === position);
        return isUndefined(previous) ? undefined : previous[0];
    }
}