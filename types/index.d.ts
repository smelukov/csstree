declare module 'css-tree' {
    export interface ListItem<T> {
        prev: ListItem<T> | null,
        next: ListItem<T> | null,
        data: T
    }

    export interface List<T> {
        createItem(): ListItem<T>;

        head: ListItem<T> | null,
        tail: ListItem<T> | null,
        cursor: ListItem<T> | null,

        updateCursors(prevOld: ListItem<T> | null, prevNew: ListItem<T> | null, nextOld: ListItem<T> | null, nextNew: ListItem<T> | null): void;

        getSize(): number;

        fromArray(array: T[]): this;

        toArray(): T[];

        toJSON: T[];

        isEmpty(): boolean;

        first(): ListItem<T> | null;

        last(): ListItem<T> | null;

        each(fn: (this: typeof context, data: T, item: ListItem<T>, list: List<T>) => void, context?: object): void;

        forEach(fn: (this: typeof context, data: T, item: ListItem<T>, list: List<T>) => void, context?: object): void;

        eachRight(fn: (this: typeof context, data: T, item: ListItem<T>, list: List<T>) => void, context?: object): void;

        forEachRight(fn: (this: typeof context, data: T, item: ListItem<T>, list: List<T>) => void, context?: object): void;

        nextUntil(start: ListItem<T> | null, fn: (this: typeof context, data: T, item: ListItem<T>, list: List<T>) => void, context?: object): void;

        prevUntil(start: ListItem<T> | null, fn: (this: typeof context, data: T, item: ListItem<T>, list: List<T>) => void, context?: object): void;

        some(fn: (this: typeof context, data: T, item: ListItem<T>, list: List<T>) => void, context?: object): boolean;

        map<K>(fn: (this: typeof context, data: T, item: ListItem<T>, list: List<T>) => K, context?: object): List<K>;

        filter(fn: (this: typeof context, data: T, item: ListItem<T>, list: List<T>) => boolean, context?: object): List<T>;

        clear(): void;

        copy(): List<T>;

        prepend(item: ListItem<T>): this;

        prependData(data: T): this;

        append(item: ListItem<T>): this;

        appendData(data: T): this;

        insert(item: ListItem<T>, before?: ListItem<T>): this;

        insertData(data: T, before?: ListItem<T>): this;

        remove(item: ListItem<T>): ListItem<T>;

        push(data: T): void;

        pop(): ListItem<T> | undefined;

        unshift(data: T): void;

        shift(): ListItem<T> | undefined;

        prependList(list: List<T>): this;

        appendList(list: List<T>): this;

        insertList(list: List<T>, before: ListItem<T>): this;

        replace(oldItem: ListItem<T>, newItemOrList: ListItem<T> | List<T>);
    }

    export interface Node {
        type: string;
        loc: {
            source: string,
            start: {
                offset: number,
                line: number,
                column: number
            },
            end: {
                offset: number,
                line: number,
                column: number
            }
        } | null;
        children?: List<Node>
    }

    export interface ParsingError {
        name: string;
        message: string;
        stack: string;
        source: string;
        offset: number;
        line: number;
        column: number;
        formattedMessage: string;
        parseError: {
            offset: number,
            line: number,
            column: number
        };

        sourceFragment(extraLines: number): string[]
    }

    export interface ParserOptions {
        context?: 'stylesheet' | 'atrule' | 'atrulePrelude' | 'mediaQueryList' | 'mediaQuery' | 'rule' | 'selectorList' | 'selector' | 'block' | 'declarationList' | 'declaration' | 'value';
        atrule?: string | null;
        positions?: boolean;
        onParseError?: (error: ParsingError, fallbackNode: any) => void | null;
        filename?: string;
        offset?: number;
        line?: number;
        column?: number;
        parseAtrulePrelude?: boolean;
        parseRulePrelude?: boolean;
        parseValue?: boolean;
        parseCustomProperty?: boolean;
    }

    export interface GeneratorDecoratorHandler {
        children(node: Node, delimiter?: (prev: Node) => void);

        node(node: Node): void;

        chunk(chunk: string);

        result(): string;
    }

    export interface GeneratorOptions {
        sourceMap?: boolean;
        decorator?: (handlers: GeneratorDecoratorHandler) => GeneratorDecoratorHandler;
    }

    export interface WalkerContext {
        root: Node;
        stylesheet: Node; // todo: StyleSheetNode
        atrule?: Node; // todo: AtruleNode
        atrulePrelude?: Node; // todo: AtrulePreludeNode
        rule?: Node; // todo: RuleNode
        selector?: Node; // todo: SelectorListNode
        block?: Node; // todo: BlockNode
        declaration?: Node; // todo: DeclarationNode
        function?: Node; // todo: FunctionNode | PseudoClassSelectorNode | PseudoElementSelectorNode
    }

    export type WalkerCallback = (this: WalkerContext, node: Node, item: ListItem<Node>, list: List<Node>) => void;

    export interface WalkerOptions {
        enter?: WalkerCallback;
        leave?: WalkerCallback;
        visit?: WalkerCallback;
        reverse?: WalkerCallback;
    }

    export function parse(source: string, options?: ParserOptions): Node;

    export function walk(ast: Node, options: WalkerCallback | WalkerOptions): void;

    // todo: map to SourceMapGenerator
    export function generate(ast: Node, options?: GeneratorOptions): string | { css: string, map: any };
}
