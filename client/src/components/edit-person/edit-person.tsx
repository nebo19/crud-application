import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  editPerson,
  PersonType,
  StateType,
} from "../people-list/people-list-slice";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { FormDialog } from "../form-dialog/form-dialog";
import { showToast } from "../toast/toast-slice";

export const EditPerson = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id") || "";
  const dispatch = useAppDispatch();
  const { peopleListData } = useAppSelector(
    ({ people }: { people: StateType }) => people
  );

  const { _id, name, surname, address, city, phone } = useMemo(
    () =>
      peopleListData.find((person) => person.id === parseInt(id)) ||
      ({} as PersonType),
    [peopleListData, id]
  );

  const onHide = () => {
    if (id) {
      searchParams.delete("id");
      setSearchParams(searchParams);
    }
  };

  const onSubmit = (values: any) => {
    axios
      .patch(`http://localhost:3001/people/${_id}`, values)
      .then((response) => {
        const { __v, ...person } = response.data.person;

        dispatch(editPerson(person));
        dispatch(
          showToast({
            summary: "Success!",
            content: "You successfully edited person!",
            severity: "success",
          })
        );
        onHide();
      })
      .catch(() =>
        dispatch(
          showToast({
            summary: "Error!",
            content: "Error occured. Please try again.",
            severity: "error",
          })
        )
      );
  };

  return (
    <FormDialog
      header="Edit Person"
      onSubmit={onSubmit}
      queryParam={id}
      initialValues={{
        name,
        surname,
        city,
        address,
        phone,
      }}
      onHide={onHide}
    />
  );
};
