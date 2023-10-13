class Complex {
    constructor(a, b) {
        this.re = a;
        this.im = b;
    }

    add(newComplex) {
        this.re += newComplex.re;
        this.im += newComplex.im;
    }

    mult(newComplex) {
        return new Complex(this.re * newComplex.re - this.im * newComplex.im, this.re * newComplex.im + this.im * newComplex.re);
    }
}