function dft(x) {
    const X = [];
    const len = x.length;

    for (let k = 0; k < len; k++) {
        let sum = new Complex(0, 0);
        for (let n = 0; n < len; n++) {
            const angle = TWO_PI * k * n / len;
            let cur = new Complex(cos(angle), -sin(angle));
            sum.add(x[n].mult(cur));
        }

        sum.re /= len;
        sum.im /= len;

        let amplitude = sqrt(sum.re * sum.re + sum.im * sum.im);
        let freq = k;
        // tan (phase) = sum.im / sum.re
        let phase = atan2(sum.im, sum.re);
        X[k] = { re: sum.re, im: sum.im, freq, amplitude, phase };
    }

    return X;
}