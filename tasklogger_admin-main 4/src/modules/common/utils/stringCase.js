const stringCase = (text, caseType) => {
  switch (caseType) {
    case "upper":
      return text.toUpperCase();
    case "lower":
      return text.toLowerCase();
    case "capitalize":
      const words = text.toLowerCase().split(" ");
      // console.log("see this is words now --- > ", words);
      const capitalizedTextArray = words.map((w, i) => w.charAt(0).toUpperCase() + w.substr(1));
      return capitalizedTextArray.join(" ");
    default:
      return text;
  }
};

const formatCamelcase = (text) => {
  let result = text.replace(/([A-Z])/g, " $1");
  return result.toLowerCase();
};

export { stringCase, formatCamelcase };
