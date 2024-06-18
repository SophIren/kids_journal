import React from "react";
import { Header } from "../../components/header/Header";
import { useParams } from "react-router-dom";
import {EditEmployee} from "../../components/editEmployee/EditEmployee";

type CreateEmployeesPageProps = {};

function EditEmployeePage({}: CreateEmployeesPageProps): JSX.Element {
  const { organization } = useParams();
  return (
    <div>
      <Header />
      <EditEmployee organization={organization}/>
    </div>
  );
}

export default EditEmployeePage;
