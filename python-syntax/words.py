def print_upper_words(words):
    """Given a list of words, print each word in uppercase on separate line.

    For example:
      print_upper_words(["potato", "Tomato", "carrot"])

    Should return (not print):
      POTATO
      TOMATO
      CARROT
    """

    for word in words:
        print(word.upper())
    return


# print_upper_words(["potato", "Tomato", "carrot"])


def print_upper_words2(words):
    """Given a list of words, print each word that starts with e in uppercase on separate line.

    For example:
      print_upper_words2(["potato", "Egg", "eggplant"])

    Should return (not print):
      EGG
      EGGPLANT
    """

    for word in words:
        if word[0].lower() == "e":
            print(word.upper())

# print_upper_words2(["potato", "Egg", "eggplant"])

def print_upper_words3(words, must_start_with):
    """Given a list of words and set of letters, 
    print each word that starts with one of those letters.

    For example:
      print_upper_words3(["potato", "Tomato", "carrot"], must_start_with={"P", "c"})

    Should return (not print):
      POTATO
      CARROT
    """

    for word in words:
        for letter in must_start_with:
            if word[0].lower() == letter.lower():
                print(word.upper())

print_upper_words3(["potato", "Tomato", "carrot"], must_start_with={"P", "c"})