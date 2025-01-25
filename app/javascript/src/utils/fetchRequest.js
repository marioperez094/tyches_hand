//Functions
import { safeCredentials, handleErrors } from "@utils/fetchHelper";

export function getRequest(link) {
  return fetch(link)
    .then(handleErrors)
    .catch(error => { throw error });
};

export function postRequest(link, body) {
  return fetch(link, safeCredentials({
    method: "POST",
    body: JSON.stringify(body)
  }))
    .then(handleErrors)
    .catch(error => { throw error });
};

export function putRequest(link, body) {
  return fetch(link, safeCredentials({
    method: "PUT",
    body: JSON.stringify(body)
  }))
    .then(handleErrors)
    .catch(error => { throw error });
};

export function deleteRequest(link) {
  return fetch(link, safeCredentials({
    method: "DELETE",
  }))
    .then(handleErrors)
    .catch(error => { throw error});
};