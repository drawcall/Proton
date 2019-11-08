const Mat3 = {
  create(mat3) {
    const mat = new Float32Array(9);
    if (mat3) this.set(mat3, mat);

    return mat;
  },

  set(mat1, mat2) {
    for (let i = 0; i < 9; i++) mat2[i] = mat1[i];

    return mat2;
  },

  multiply(mat, mat2, mat3) {
    let a00 = mat[0],
      a01 = mat[1],
      a02 = mat[2],
      a10 = mat[3],
      a11 = mat[4],
      a20 = mat[6],
      a21 = mat[7],
      b00 = mat2[0],
      b01 = mat2[1],
      b02 = mat2[2],
      b10 = mat2[3],
      b11 = mat2[4],
      b20 = mat2[6],
      b21 = mat2[7];

    mat3[0] = b00 * a00 + b01 * a10;
    mat3[1] = b00 * a01 + b01 * a11;
    mat3[2] = a02 * b02;
    mat3[3] = b10 * a00 + b11 * a10;
    mat3[4] = b10 * a01 + b11 * a11;
    mat3[6] = b20 * a00 + b21 * a10 + a20;
    mat3[7] = b20 * a01 + b21 * a11 + a21;

    return mat3;
  },

  inverse(mat, mat3) {
    let a00 = mat[0],
      a01 = mat[1],
      a10 = mat[3],
      a11 = mat[4],
      a20 = mat[6],
      a21 = mat[7],
      b01 = a11,
      b11 = -a10,
      b21 = a21 * a10 - a11 * a20,
      d = a00 * b01 + a01 * b11,
      id;

    id = 1 / d;
    mat3[0] = b01 * id;
    mat3[1] = -a01 * id;
    mat3[3] = b11 * id;
    mat3[4] = a00 * id;
    mat3[6] = b21 * id;
    mat3[7] = (-a21 * a00 + a01 * a20) * id;

    return mat3;
  },

  multiplyVec2(m, vec, mat3) {
    let x = vec[0],
      y = vec[1];

    mat3[0] = x * m[0] + y * m[3] + m[6];
    mat3[1] = x * m[1] + y * m[4] + m[7];

    return mat3;
  }
};

export default Mat3;
