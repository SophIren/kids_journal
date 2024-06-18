import React, { useEffect, useState } from "react";
import { ButtonMain } from "../button/ButtonMain";
import {
  ApiRoute,
  AppRoute,
  infoEmployees,
  testOrganization,
} from "../../const";

import "./Employees.css";
import { useNavigate, useParams } from "react-router-dom";

export type EmployeesProps = {
  organization: string | undefined;
};

export const employeeInfo = [
  {
    user_id: "",
    organization_id: "",
    name: "",
    phone_number: "",
  },
];

export const Employees = ({ organization }: EmployeesProps) => {
  const [employees, setEmployees] = useState(employeeInfo);
  useEffect(() => {
    fetch(`${ApiRoute}/organizations/${testOrganization}/employee`, {
      method: "GET",
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          return response;
        }
        throw new Error();
      })
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
      });
  }, []);

  const handleDelete = async (user_id: string) => {
    await fetch(`${ApiRoute}/employee/${user_id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  const navigate = useNavigate();
  const handleEdit = async (user_id: string) => {
    navigate(`/${testOrganization}${AppRoute.EditEmployee}/${user_id}`);
  };

  return (
    <>
      <div className="employees_title">
        <div className="employees_label">Сотрудники</div>
        <div>
          <ButtonMain
            height="44px"
            width="211px"
            linkButton={`/${organization}${AppRoute.CreateEmployees}`}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 7L13 7"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7 1L7 13"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Добавить сотрудника
          </ButtonMain>
        </div>
      </div>

      <div className="employees">
        <table className="employees__table">
          <thead className="employees-title">
            <tr>
              <td className="employees-title_name">Имя</td>
              <td className="employees-title_role_id">Роль</td>
              <td className="employees-phone_number">Контакт</td>
              <td className="employees-item_icon"></td>
              <td className="employees-item_icon"></td>
              <td className="employees-item_icon"></td>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr className="employees-item">
                <td className="employees-item_name">{employee.name}</td>
                <td className="employees-item_role_id">Воспитатель</td>
                <td className="employees-item_phone_number">
                  {employee.phone_number}
                </td>
                <td className="employees-item_icon">
                  <button
                    className="employees-item_icon-edit"
                    onClick={() => handleEdit(employee.user_id)}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.32352 14.3551C3.36817 14.3551 3.41281 14.3506 3.45745 14.3439L7.21192 13.6854C7.25656 13.6765 7.29897 13.6564 7.33022 13.6229L16.7923 4.16085C16.813 4.1402 16.8294 4.11568 16.8406 4.08867C16.8518 4.06167 16.8576 4.03272 16.8576 4.00349C16.8576 3.97425 16.8518 3.94531 16.8406 3.9183C16.8294 3.8913 16.813 3.86677 16.7923 3.84612L13.0825 0.134068C13.04 0.0916574 12.9842 0.0693359 12.924 0.0693359C12.8637 0.0693359 12.8079 0.0916574 12.7655 0.134068L3.30343 9.59612C3.26995 9.62961 3.24986 9.66978 3.24093 9.71443L2.58245 13.4689C2.56074 13.5885 2.56849 13.7115 2.60506 13.8274C2.64162 13.9433 2.70588 14.0486 2.79227 14.1341C2.93959 14.2769 3.12486 14.3551 3.32352 14.3551V14.3551ZM4.82799 10.4622L12.924 2.36844L14.5601 4.0046L6.46415 12.0984L4.47977 12.4488L4.82799 10.4622V10.4622ZM17.2142 16.2301H0.785575C0.390486 16.2301 0.0712891 16.5493 0.0712891 16.9443V17.7479C0.0712891 17.8461 0.151646 17.9265 0.249861 17.9265H17.7499C17.8481 17.9265 17.9284 17.8461 17.9284 17.7479V16.9443C17.9284 16.5493 17.6092 16.2301 17.2142 16.2301Z"
                        fill="black"
                        fill-opacity="0.85"
                      />
                    </svg>
                  </button>
                </td>
                <td className="employees-item_icon">
                  <button
                    className="employees-item_icon-delete"
                    onClick={() => handleDelete(employee.user_id)}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.60679 1.67648H5.42822C5.52644 1.67648 5.60679 1.59612 5.60679 1.49791V1.67648H12.3925V1.49791C12.3925 1.59612 12.4729 1.67648 12.5711 1.67648H12.3925V3.28362H13.9997V1.49791C13.9997 0.709961 13.359 0.0693359 12.5711 0.0693359H5.42822C4.64028 0.0693359 3.99965 0.709961 3.99965 1.49791V3.28362H5.60679V1.67648ZM16.8568 3.28362H1.14251C0.747419 3.28362 0.428223 3.60282 0.428223 3.99791V4.71219C0.428223 4.81041 0.50858 4.89077 0.606794 4.89077H1.95501L2.50635 16.5649C2.54206 17.326 3.17153 17.9265 3.93269 17.9265H14.0666C14.83 17.9265 15.4572 17.3283 15.493 16.5649L16.0443 4.89077H17.3925C17.4907 4.89077 17.5711 4.81041 17.5711 4.71219V3.99791C17.5711 3.60282 17.2519 3.28362 16.8568 3.28362ZM13.8947 16.3193H4.10456L3.56438 4.89077H14.4349L13.8947 16.3193Z"
                        fill="black"
                        fill-opacity="0.85"
                      />
                    </svg>
                  </button>
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
