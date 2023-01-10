import { useNavigate } from "react-router-dom";
import { addPerson } from "../people-list/people-list-slice";
import axios from "axios";
import { useAppDispatch } from "../../hooks";
import { FormDialog } from "../form-dialog/form-dialog";
import { showToast } from "../toast/toast-slice";

interface CreatePersonProps {
  isDialogOpen?: boolean;
  setIsDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreatePerson = ({
  isDialogOpen,
  setIsDialogOpen,
}: CreatePersonProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (values: any) => {
    axios
      .post("http://localhost:3001/people", values)
      .then((response) => {
        const { __v, ...person } = response.data.person;

        dispatch(addPerson(person));
        navigate("/");
        dispatch(
          showToast({
            summary: "Success!",
            content: "You successfully created person!",
            severity: "success",
          })
        );
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
      header="Create Person"
      onSubmit={onSubmit}
      isDialogOpen={isDialogOpen}
      setIsDialogOpen={setIsDialogOpen}
      onHide={() => setIsDialogOpen && setIsDialogOpen(false)}
    />
  );
};
