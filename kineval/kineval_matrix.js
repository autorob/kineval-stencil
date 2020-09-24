//////////////////////////////////////////////////
/////     MATRIX ALGEBRA AND GEOMETRIC TRANSFORMS 
//////////////////////////////////////////////////

function matrix_copy(m1) {
    // returns 2D array that is a copy of m1

    var mat = [];
    var i,j;

    for (i=0;i<m1.length;i++) { // for each row of m1
        mat[i] = [];
        for (j=0;j<m1[0].length;j++) { // for each column of m1
            mat[i][j] = m1[i][j];
        }
    }
    return mat;
}


// STENCIL: reference matrix code has the following functions:
//   matrix_multiply
//   matrix_transpose
//   matrix_pseudoinverse
//   matrix_invert_affine
//   vector_normalize
//   vector_cross
//   generate_identity
//   generate_translation_matrix
//   generate_rotation_matrix_X
//   generate_rotation_matrix_Y
//   generate_rotation_matrix_Z



// **** Function stencils are provided below, please uncomment and implement them ****//



// function matrix_multiply(m1,m2) {
//     // returns 2D array that is the result of m1*m2

// }

// function matrix_transpose(m) {
//     // returns 2D array that is the result of m1*m2

// }

// function matrix_pseudoinverse(m) {
//     // returns pseudoinverse of matrix m

// }

// function matrix_invert_affine(m) {
//     // returns 2D array that is the invert affine of 4-by-4 matrix m

// }

// function vector_normalize(v) {
//     // returns normalized vector for v
    
// }

// function vector_cross(a,b) {
//     // return cross product of vector a and b with both has 3 dimensions
    
// }

// function generate_identity() {
//     // returns 4-by-4 2D array of identity matrix
    
// }

// function generate_translation_matrix(tx, ty, tz) {
//     // returns 4-by-4 matrix as a 2D array
    
// }

// function generate_rotation_matrix_X(angle) {
//     // returns 4-by-4 matrix as a 2D array, angle is in radians
    
// }

// function generate_rotation_matrix_Y(angle) {
//     // returns 4-by-4 matrix as a 2D array, angle is in radians
    
// }

// function generate_rotation_matrix_Z(angle) {
//     // returns 4-by-4 matrix as a 2D array, angle is in radians
    
// }