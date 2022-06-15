import camelcase from 'camelcase';
import decamelize from 'decamelize';

const convertToCamelCase = (obj) => {
  const objCopy = {...obj};
  for (const [key, value] of Object.entries(objCopy)) {
    if (key !== camelcase(key)) {
      objCopy[camelcase(key)] = (typeof value === 'object' && value !== null) ? {...value} : value;
      delete objCopy[key];
    }
  }
};

const convertToSnakeCase = (obj) => {
  const objCopy = {...obj};
  for (const [key, value] of Object.entries(objCopy)) {
    if (key !== decamelize(key)) {
      objCopy[decamelize(key)] = (typeof value === 'object' && value !== null) ? {...value} : value;
      delete objCopy[key];
    }
  }
};

export {convertToCamelCase, convertToSnakeCase};
