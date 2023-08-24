def sum_up_diagonals(matrix):
    """Given a matrix [square list of lists], return sum of diagonals.

    Sum of TL-to-BR diagonal along with BL-to-TR diagonal:

        >>> m1 = [
        ...     [1,   2],
        ...     [30, 40],
        ... ]
        >>> sum_up_diagonals(m1)
        73

        >>> m2 = [
        ...    [1, 2, 3],
        ...    [4, 5, 6],
        ...    [7, 8, 9],
        ... ]
        >>> sum_up_diagonals(m2)
        30
    """

    diagonals_left = []
    diagonals_right = []

    i = 0
    j = len(matrix) - 1
    for row in matrix:
        diagonals_left.append(row[i])
        diagonals_right.append(row[j])

        i += 1
        j -= 1

    return sum(diagonals_left) + sum(diagonals_right)