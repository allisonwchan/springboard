import random

class WordFinder:
    """Find random words from dictionary."""

    def __init__(self, filename):
        """Initialize with list of words and print number of words read."""

        self.filename = filename
        self.lst = WordFinder.make_lst_words(self)
        self.length = len(self.lst)
        print(f"{self.length} words read")
  
    def make_lst_words(self):
        """Make list of words from file."""

        file = open(self.filename)
        lst_words = [line.strip() for line in file]
        file.close()

        return lst_words
    
    def random(self):
        """Return random word from list of words.s"""

        return random.choice(self.lst)