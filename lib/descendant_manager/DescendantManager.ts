import { isNull, isUndefined } from '../type_checks';

import { sortNodes } from './utils';

export class DescendantManager {
    private _descendants = new Map<HTMLElement, number>();

    register(node: HTMLElement | null): void {
        if (isNull(node)) {
            return;
        }

        this._descendants.set(node, -1);
        this.sort();
    }

    unregister(node: HTMLElement | null): void {
        if (isNull(node)) {
            return;
        }

        this._descendants.delete(node);
        this.sort();
    }

    private sort() {
        const sorted = sortNodes(this._descendants.keys());
        sorted.forEach((node, index) => this._descendants.set(node, index));
    }

    getIndex(node: HTMLElement | null): number {
        if (isNull(node)) {
            return -1;
        }

        const position = this._descendants.get(node);

        if (isUndefined(position)) {
            return -1;
        }

        return position;
    }
}
