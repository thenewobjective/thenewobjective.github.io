/*
type Values<T> = T[keyof T];
type VerticalProperties = 'left' | 'center' | 'right';
type HorizontalProperties = 'top' | 'middle' | 'bottom';
type Directions = Values<Values<{[V in VerticalProperties]: {[H in HorizontalProperties]: {[K in V | H]: boolean}}}>>;
 */

// A 9x9 Grid
type Grid = {[K in Digit]: {[K in Digit]: Digit[] | Blank}}
type Digit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type Blank = 0


type Digits = Digit[]

// If blank, all digits are possible
type Choice<D> = D extends Blank ? Digit : D


type Not<P extends boolean> = P extends false ? true : false
type And<P extends boolean, Q extends boolean> = P extends true ? Q : false
type Or<P extends boolean, Q extends boolean> =  P extends false ? Q : true
type Equals<A, B> = A extends B ? (B extends A ? true : false) : false

type IfThenElse<P extends boolean,Q,R> = P extends true ? Q : R

type Head<XS extends unknown[]> = XS extends [] ? never : XS[0]

type Tail<XS extends unknown[]> = 
    XS extends [infer Head, ...infer Tail] ? Tail : never

type Catenate<XS extends unknown[],YS extends unknown[]> = 
    XS extends [] ? YS :
    XS extends [infer Head, ...infer Tail] ? [Head, ...Catenate<Tail,YS>]:
    never

/*
type Compose<F extends (args: unknown[]) => unknown, G extends (args: unknown[]) => unknown> = 
    ReturnType<G> extends Parameters<F> ? (args: Parameters<G>) => ReturnType<F> : never
*/

/*
type family Fold (f :: b -> a -> b) (x :: b) (as :: [a]) :: b where
  Fold f x '[] = x
  Fold f x (a ': as) = Fold f (f x a) as
*/

interface Monoid<T> {
    Unit: T;
    Combine<L extends T, R extends T>(u: L, v: R): T
}

type Fold<M extends Monoid<unknown>, XS extends M[]> =
    XS extends [] ? M['Unit'] :
    XS extends [infer Head, ...infer Tail] ? Fold<M>;

interface All<T extends boolean> extends Monoid<T> {
    Unit: true
    Combine<L extends T, R extends T>(u: L, v: R): And<L,R>
}

/****** Tests ******/
type TestNot1 = Not<false> // true
type TestNot2 = Not<true> // false

type TestAnd1 = And<true,true> // true
type TestAnd2 = And<true, false> // false
type TestAnd3 = And<false, true> // false
type TestAnd4 = And<false, false> // false

type TestOr1 = Or<true, false> // true
type TestOr2 = Or<true, true> // true
type TestOr3 = Or<false, true> // true
type TestOr4 = Or<false, false> // false

type TestEquals1 = Equals<string, string> // true
type TestEquals2 = Equals<string, boolean> // false

type TestIfThenElse1 = IfThenElse<false, string, number> // number
type TestIfThenElse2 = IfThenElse<true, string, number> // string

type TestHead = Head<[1,2,3]> // 1
type TestTail = Tail<[1,2,3]> // [2, 3]

type TestCatenate1 = Catenate<[1,2,3], [false,true]> // [1, 2, 3, false, true]
type TestCatenate2 = Catenate<[1,2,3], ['a','b','c']> // [1, 2, 3, "a", "b", "c"]

type TestCompose1 = Compose<typeof String, typeof Boolean>

==========
https://christof-schramm.net/posts/2019-10-14-type-level-programming-part2.html