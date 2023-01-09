import { Form, Field } from "react-final-form";
import { Button } from "../button/button";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useNavigate } from "react-router-dom";
import { addPerson } from "../people-list/people-list-slice";
import axios from "axios";
import "./create-person.scss";
import { useAppDispatch } from "../../hooks";

interface ErrorsType {
  name?: string;
  surname?: string;
}

export const CreatePerson = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const validate = (data: any) => {
    let errors: ErrorsType = {
      name: undefined,
      surname: undefined,
    };

    if (!data.name) {
      errors.name = "Name is required!";
    }
    if (!data.surname) {
      errors.surname = "Surname is required!";
    }

    return errors;
  };

  const isFormFieldValid = (meta: any) => !!(meta.touched && meta.error);

  const getFormErrorMessage = (meta: any) =>
    isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;

  const onSubmit = (values: any) => {
    axios
      .post("http://localhost:3001/people", values)
      .then((response) => {
        const { __v, ...person } = response.data.person;

        dispatch(addPerson(person));
        navigate("/");
      })
      .catch(() => console.log("err"));
  };

  return (
    <div className="form--wrapper">
      <Form
        onSubmit={onSubmit}
        initialValues={{
          name: "",
          surname: "",
          city: "",
          address: "",
          phone: "",
        }}
        validate={validate}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <h1>Create Person</h1>
            <Field
              name="name"
              render={({ input, meta }) => (
                <div className="field form-field--wrapper">
                  <span className="p-float-label">
                    <InputText
                      id="name"
                      {...input}
                      className={classNames({
                        "p-invalid": isFormFieldValid(meta),
                      })}
                    />
                    <label
                      htmlFor="name"
                      className={classNames({
                        "p-error": isFormFieldValid(meta),
                      })}
                    >
                      Name*
                    </label>
                  </span>
                  {getFormErrorMessage(meta)}
                </div>
              )}
            />
            <Field
              name="surname"
              render={({ input, meta }) => (
                <div className="field form-field--wrapper">
                  <span className="p-float-label">
                    <InputText
                      id="surname"
                      {...input}
                      className={classNames({
                        "p-invalid": isFormFieldValid(meta),
                      })}
                    />
                    <label
                      htmlFor="surname"
                      className={classNames({
                        "p-error": isFormFieldValid(meta),
                      })}
                    >
                      Surname*
                    </label>
                  </span>
                  {getFormErrorMessage(meta)}
                </div>
              )}
            />
            <Field
              name="city"
              render={({ input }) => (
                <div className="field form-field--wrapper">
                  <span className="p-float-label">
                    <InputText id="city" {...input} />
                    <label htmlFor="city">City</label>
                  </span>
                </div>
              )}
            />
            <Field
              name="address"
              render={({ input }) => (
                <div className="field form-field--wrapper">
                  <span className="p-float-label">
                    <InputText id="address" {...input} />
                    <label htmlFor="address">Address</label>
                  </span>
                </div>
              )}
            />
            <Field
              name="phone"
              render={({ input }) => (
                <div className="field form-field--wrapper">
                  <span className="p-float-label">
                    <InputText id="phone" {...input} />
                    <label htmlFor="phone">Phone</label>
                  </span>
                </div>
              )}
            />
            <Button
              type="submit"
              label="Submit"
              className="create-person__button"
              disabled={submitting}
            />
            <Button
              onClick={() => navigate("/")}
              className="p-button-secondary create-person__button"
              label="Cancel"
              disabled={submitting}
            />
          </form>
        )}
      />
    </div>
  );
};
