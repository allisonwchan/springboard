def titleize(phrase):
    """Return phrase in title case (each word capitalized).

        >>> titleize('this is awesome')
        'This Is Awesome'

        >>> titleize('oNLy cAPITALIZe fIRSt')
        'Only Capitalize First'
    """

    split_phrase_lst = phrase.split(" ")
    words_capitalized = []

    new_phrase = ''

    for word in split_phrase_lst:
        words_capitalized.append(word[0].upper() + word[1:].lower())

    new_phrase = " ".join(words_capitalized)

    return new_phrase