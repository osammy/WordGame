const baseUrl = "http://localhost:5000/api/v1";
const word_validate_url = `${baseUrl}/dictionary/valid`;
const valid_word_in_dictionary = `${baseUrl}/dictionary/word`;

export const getUrl = name => {
  switch (name) {
    case "word_validate_url":
      return word_validate_url;

    case "valid_word_in_dictionary":
      return valid_word_in_dictionary;
  }
};
