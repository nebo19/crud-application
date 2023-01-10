import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Form, Field } from "react-final-form";
import { Button } from "../button/button";
import "./form-dialog.scss";

interface ErrorsType {
  name?: string;
  surname?: string;
}

interface EditableFieldsType {
  name: string;
  surname: string;
  city?: string;
  address?: string;
  phone?: string;
}

interface FormDialogProps {
  onSubmit: (values: EditableFieldsType) => void;
  initialValues?: EditableFieldsType;
  header: string;
  isDialogOpen?: boolean;
  setIsDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  queryParam?: string;
  onHide: () => void;
}

export const FormDialog = ({
  onSubmit,
  initialValues,
  header,
  isDialogOpen,
  setIsDialogOpen,
  queryParam = "",
  onHide,
}: FormDialogProps) => {
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

  return (
    <Dialog
      onHide={() => onHide()}
      visible={isDialogOpen || !!queryParam}
      dismissableMask
      className="form-dialog__dialog"
    >
      <div className="form--wrapper">
        <Form
          onSubmit={(e) => {
            onSubmit(e);
            setIsDialogOpen && setIsDialogOpen(false);
          }}
          initialValues={initialValues}
          validate={validate}
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <h1>{header}</h1>
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
                className="form-dialog__button"
                disabled={submitting}
              />
              <Button
                onClick={() => onHide()}
                className="p-button-secondary form-dialog__button"
                label="Cancel"
                disabled={submitting}
              />
            </form>
          )}
        />
      </div>
    </Dialog>
  );
};
