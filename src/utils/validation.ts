import { useDispatch } from "react-redux";
import { Dispatch } from "react";
import {
  resetValidation,
  setValidation,
} from "@/state/RTK/validation/validationSlice";

// let array_validation_input: { [key: string]: string } = {};
let validationParam: { [key: string]: string } = {};
validationParam["numeric"] = "Kolom ini harus berupa nilai numerik";
validationParam["required"] = "Kolom ini tidak boleh kosong";
validationParam["noSpace"] = "Kolom ini tidak boleh mengandung spasi";
validationParam["moreThanSpace"] =
  "Kolom ini membutuhkan lebih dari satu spasi";
validationParam["alphaNum"] = "Kolom ini hanya menerima alfabet dan numerik";
validationParam["alphaNumStrip"] = "Tidak boleh mengandung karakter khusus";
validationParam["alphaNumMinus"] =
  "Kolom ini hanya menerima Huruf, Numerik, dan Minus '-'";
validationParam["ip"] = "Format input harus hanya berisi numerik dan '.'";
validationParam["arrRequired"] = "Kolom ini tidak boleh kosong";
validationParam["email"] = "Email tidak valid";
validationParam["confirmation"] = "Kolom ini tidak cocok dengan ___ ";
validationParam["must"] = "Value Kolom ini harus  ___ ";

let array_validation_input: { [key: string]: string[] } = {};
let validate_type: string, input_value: string, input_name: string;

interface functionPropsType {
  objInputValue: object;
  objValidationRule: { [key: string]: string };
  dispatch: Dispatch<any>;
}
export const validateInput = ({
  objInputValue,
  objValidationRule,
  dispatch,
}: functionPropsType) => {
  dispatch(resetValidation());
  array_validation_input = {};
  Object.entries(objInputValue).forEach(([keyInput, valueInput]) => {
    array_validation_input[keyInput] = [];
    const validationKey = objValidationRule[keyInput];
    if (validationKey != undefined && validationKey.includes("|")) {
      validationKey.split("|").forEach((vValidationKey, index) => {
        validationRun({
          argValValidate: vValidationKey,
          argValInput: valueInput,
          argKeyInput: keyInput,
        });
      });
    } else {
      validationRun({
        argValValidate: validationKey,
        argValInput: valueInput,
        argKeyInput: keyInput,
      });
    }
  });

  let newObj: { [key: string]: string[] } = {};
  Object.entries(array_validation_input).filter(([key, obj]) => {
    if (obj.length > 0) newObj[key] = obj;
  });

  
  if (Object.keys(newObj).length > 0) {
    dispatch(setValidation(newObj));
    throw "Validation Input Error";
  }
};

type ValidationParams = {
  argValValidate: string;
  argValInput: string;
  argKeyInput: string;
};
const validationRun = (params: ValidationParams) => {
  validate_type = params.argValValidate;
  input_value = params.argValInput;
  input_name = params.argKeyInput;

  _requiredValidation();
  _noSpace();
};

const _requiredValidation = () => {
  if (validate_type == "required") {
    if (
      input_value == undefined ||
      input_value === "" ||
      input_value.length == 0
    ) {
      array_validation_input[input_name].push(validationParam[validate_type]);
    }
  }
};

const _noSpace = () => {
  if (validate_type == "noSpace") {
    const regex = /\s/;
    if (regex.test(input_value)) {
      array_validation_input[input_name].push(validationParam[validate_type]);
    }
  }
};
