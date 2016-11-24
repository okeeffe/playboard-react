const createEncodedFormBody = formDetails => {
  let formBody = [];

  for (const property in formDetails) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(formDetails[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }

  return formBody.join("&");
}

export { createEncodedFormBody };