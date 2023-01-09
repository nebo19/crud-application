import { useState, useRef } from "react";
import { deletePerson, StateType } from "./people-list-slice";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Button } from "../button/button";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import "./people-list.scss";

export const PeopleList = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { peopleListData, loading } = useAppSelector(
    ({ people }: { people: StateType }) => people
  );
  const userToDeleteId = useRef(null);

  const handlePersonDelete = (id: number | null) => {
    if (!id) {
      return;
    }

    axios
      .delete(`http://localhost:3001/people/${id}`)
      .then(() => {
        dispatch(deletePerson(id));
      })
      .catch(() => console.log("err"));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <DataTable
        value={peopleListData}
        emptyMessage={
          <>
            There are no persons to show.{" "}
            <Link to="/new-user">Create one?</Link>
          </>
        }
      >
        <Column field="id" header="Id" />
        <Column field="name" header="Name" />
        <Column field="surname" header="Surname" />
        <Column
          field="createdDate"
          header="Created Date"
          body={({ createdDate }) => (
            <div>{new Date(createdDate).toLocaleString()}</div>
          )}
        />
        <Column field="city" header="City" />
        <Column field="address" header="Address" />
        <Column field="phone" header="Phone" />
        <Column
          header={
            <Button onClick={() => navigate("/new-user")}>
              <i className="pi pi-user-plus" />
            </Button>
          }
          body={({ _id }) => (
            <div className="action-buttons--wrapper">
              <Button>
                <i className="pi pi-user-edit" />
              </Button>
              <Button
                className="p-button-danger"
                onClick={() => {
                  userToDeleteId.current = _id;
                  setIsDialogOpen(true);
                }}
              >
                <i className="pi pi-trash" />
              </Button>
            </div>
          )}
        />
      </DataTable>
      <Dialog
        visible={isDialogOpen}
        onHide={() => setIsDialogOpen(false)}
        header="Confirmation"
        dismissableMask
        footer={
          <div>
            <Button
              className="p-button-primary"
              onClick={() => {
                handlePersonDelete(userToDeleteId.current);
                setIsDialogOpen(false);
              }}
            >
              Yes
            </Button>
            <Button
              className="p-button-secondary"
              onClick={() => setIsDialogOpen(false)}
            >
              No
            </Button>
          </div>
        }
      >
        Are you sure you want to delete person:{" "}
        {
          peopleListData.find((person) => person._id === userToDeleteId.current)
            ?.name
        }
        ?
      </Dialog>
    </>
  );
};
