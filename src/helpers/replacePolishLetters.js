const replacePolishLetters = (string) => {
    return string
        .replace('ą', 'a')
        .replace('Ą', 'A')
        .replace('ć', 'c')
        .replace('Ć', 'C')
        .replace('ę', 'e')
        .replace('Ę', 'E')
        .replace('ł', 'l')
        .replace('Ł', 'L')
        .replace('ń', 'n')
        .replace('Ń', 'N')
        .replace('ó', 'o')
        .replace('Ó', 'O')
        .replace('ś', 's')
        .replace('Ś', 'S')
        .replace('ż', 'z')
        .replace('Ż', 'Z')
        .replace('ź', 'z')
        .replace('Ź', 'Z');
};

export default replacePolishLetters;
