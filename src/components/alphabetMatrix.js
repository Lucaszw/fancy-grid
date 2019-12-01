let mA = `
    010
    101
    101
    111
    101
`;

let mB = `
    110,
    101,
    111,
    101,
    110
`;

let mC = `
    111
    101
    100
    101
    111
`;

let mD = `
    110
    101
    101
    101
    110
`;

let mE = `
    111
    100
    110
    100
    111
`;

let mF = `
    111
    100
    110
    100
    100
`;

let mG = `
    0110
    1000
    1011
    1001
    0110
`;

let mH = `
    101
    101
    111
    101
    101
`;

let mI = `
    111
    010
    010
    010
    111
`;

let mJ = `
    011
    001
    001
    101
    011
`;

let mK = `
    1001
    1010
    1100
    1010
    1001
`;

let mL = `
    100
    100
    100
    101
    111
`;

let mM = `
    10001
    11011
    10101
    10001
    10001
`;

let mN = `
    1001
    1001
    1101
    1011
    1001
`;

let mO = `
    0110
    1001
    1001
    1001
    0110
`;

let mP = `
    111
    101
    111
    100
    100
`;

let mQ = `
    01100
    10010
    10010
    10010
    01111
`;

let mR = `
    1110
    1010
    1100
    1010
    1001
`;

let mS = `
    111
    100
    110
    001
    111
`;

let mT = `
    111
    010
    010
    010
    010
`;

let mU = `
    1001
    1001
    1001
    1001
    0110
`;

let mV = `
    10001
    10001
    01010
    01010
    00100
`;

let mW = `
    10101
    10101
    10101
    10101
    01110
`;

let mX = `
    101
    101
    010
    101
    101
`;

let mY = `
    101
    101
    111
    010
    010
`;

let mZ = `
    1111
    0010
    0100
    1000
    1111
`;

let mSPACE = `
    000
    000
    000
    000
    000
`;

let mEXPLANATION = `
    1
    1
    1
    0
    1
`;

let mQUESTION = `
    01100
    10010
    00100
    00000
    00100
`;

let alphabet = {
    A: mA, B: mB, C: mC, D: mD, E: mE, F: mF, G: mG, H: mH, 
    I: mI, J: mJ, K: mK, L: mL, M: mM, N: mN, O: mO, P: mP, 
    Q: mQ, R: mR, S: mS, T: mT, U: mU, V: mV, W: mW, X: mX, 
    Y: mY, Z: mZ, " ": mSPACE, "!": mEXPLANATION, "?": mQUESTION
};

export default alphabet;