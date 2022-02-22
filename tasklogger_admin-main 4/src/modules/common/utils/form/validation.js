// // import reduceWhile from "ramda/src/reduceWhile";

// export const required = (value) => (value ? undefined : "Required");

// export const requiredWysiwyg = (value) => {
//   if (value) {
//     if (value === "<p>&nbsp;</p>") return "Required";

//     return undefined;
//   } else {
//     return "Required";
//   }
// };

// export const booleanRequired = (value) =>
//   typeof value === "boolean" ? undefined : "Required";

// export const maxLength = (max) => (value) =>
//   value && value.length > max ? `Must be ${max} characters or less` : undefined;

// export const minLength = (min) => (value) =>
//   value && value.length < min ? `Must be ${min} characters or more` : undefined;

// export const number = (value) =>
//   value && isNaN(Number(value)) ? "Must be a number" : undefined;

// export const hasLength = (length, additionalMessage) => (value) => {
//   return value && value.length !== length
//     ? `Must have ${length} length. ${additionalMessage}`
//     : undefined;
// };

// export const minValue = (min) => (value) =>
//   value && value < min ? `Must be at least ${min}` : undefined;

// export const email = (value) =>
//   value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
//     ? "Invalid email address"
//     : undefined;

// export const requiredEmail = (value) =>
//   !value
//     ? "Required"
//     : value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
//     ? "Invalid email address"
//     : undefined;

// export const alphaNumeric = (value) => {
//   value && /[^a-zA-Z0-9 ]/i.test(value)
//     ? "Only alphanumeric characters"
//     : undefined;
// };

// export const phoneNumber = (value) =>
//   value && !/^(0|[1-9][0-9]{9})$/i.test(value)
//     ? "Invalid phone number, must be 10 digits"
//     : undefined;

// export default (...rules) => (value) =>
//   reduceWhile(
//     (acc) => acc === undefined,
//     (acc, func) => func(value),
//     undefined,
//     rules
//   );
