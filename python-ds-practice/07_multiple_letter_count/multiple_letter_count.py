def multiple_letter_count(phrase):
    """Return dict of {ltr: frequency} from phrase.

        >>> multiple_letter_count('yay')
        {'y': 2, 'a': 1}

        >>> multiple_letter_count('Yay')
        {'Y': 1, 'a': 1, 'y': 1}
    """

    new_dict = {}

    for letter in phrase:
        if letter in new_dict:
            new_dict[letter] += 1
        else:
            new_dict[letter] = 1
    
    return new_dict